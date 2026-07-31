use crate::{error::PowerError,instruction::PowerPayInstruction,state::{Merchant,Payment}};
use borsh::{BorshDeserialize,BorshSerialize};
use solana_program::{
 account_info::{next_account_info,AccountInfo},clock::Clock,entrypoint::ProgramResult,
 instruction::{AccountMeta,Instruction},program::{invoke,invoke_signed},
 program_error::ProgramError,pubkey::Pubkey,rent::Rent,system_instruction,sysvar::Sysvar
};

pub fn process(pid:&Pubkey,a:&[AccountInfo],d:&[u8])->ProgramResult{
 match PowerPayInstruction::unpack(d)?{
  PowerPayInstruction::InitializeMerchant{fee_bps}=>init(pid,a,fee_bps),
  PowerPayInstruction::UpdateMerchant{fee_bps,paused}=>update(pid,a,fee_bps,paused),
  PowerPayInstruction::CreatePayment{reference,amount,expires_at}=>create_sol(pid,a,reference,amount,expires_at),
  PowerPayInstruction::SettlePayment=>settle_sol(pid,a),
  PowerPayInstruction::RefundPayment=>refund_sol(pid,a),
  PowerPayInstruction::CreateTokenPayment{reference,amount,expires_at,decimals}=>create_token(pid,a,reference,amount,expires_at,decimals),
  PowerPayInstruction::SettleTokenPayment=>settle_token(pid,a),
  PowerPayInstruction::RefundTokenPayment=>refund_token(pid,a),
 }
}
fn checked_fee(amount:u64,bps:u16)->Result<u64,ProgramError>{
 amount.checked_mul(bps as u64).ok_or(PowerError::ArithmeticOverflow.into())?
  .checked_div(10_000).ok_or(PowerError::ArithmeticOverflow.into())
}
fn init(pid:&Pubkey,a:&[AccountInfo],fee_bps:u16)->ProgramResult{
 if fee_bps>10_000{return Err(PowerError::InvalidAmount.into())}
 let i=&mut a.iter();let auth=next_account_info(i)?;let treasury=next_account_info(i)?;
 let fee_treasury=next_account_info(i)?;let merchant=next_account_info(i)?;let system=next_account_info(i)?;
 if !auth.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 let (pda,bump)=Pubkey::find_program_address(&[b"merchant",auth.key.as_ref()],pid);
 if pda!=*merchant.key{return Err(PowerError::AccountMismatch.into())}
 let rent=Rent::get()?;
 invoke_signed(&system_instruction::create_account(auth.key,merchant.key,rent.minimum_balance(Merchant::LEN),Merchant::LEN as u64,pid),
 &[auth.clone(),merchant.clone(),system.clone()],&[&[b"merchant",auth.key.as_ref(),&[bump]]])?;
 Merchant{version:Merchant::VERSION,authority:*auth.key,treasury:*treasury.key,fee_treasury:*fee_treasury.key,fee_bps,paused:false,bump}
  .serialize(&mut &mut merchant.data.borrow_mut()[..])?;Ok(())
}
fn update(pid:&Pubkey,a:&[AccountInfo],fee_bps:u16,paused:bool)->ProgramResult{
 if fee_bps>10_000{return Err(PowerError::InvalidAmount.into())}
 let i=&mut a.iter();let auth=next_account_info(i)?;let merchant_acc=next_account_info(i)?;
 if !auth.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 if merchant_acc.owner!=pid{return Err(PowerError::InvalidOwner.into())}
 let mut m=Merchant::try_from_slice(&merchant_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 if m.authority!=*auth.key{return Err(PowerError::Unauthorized.into())}
 m.fee_bps=fee_bps;m.paused=paused;m.serialize(&mut &mut merchant_acc.data.borrow_mut()[..])?;Ok(())
}
fn merchant_and_time(pid:&Pubkey,merchant_acc:&AccountInfo,expires_at:i64)->Result<(Merchant,i64),ProgramError>{
 if merchant_acc.owner!=pid{return Err(PowerError::InvalidOwner.into())}
 let m=Merchant::try_from_slice(&merchant_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 if m.paused{return Err(PowerError::MerchantPaused.into())}
 let now=Clock::get()?.unix_timestamp;
 if expires_at<=now{return Err(PowerError::PaymentExpired.into())}
 Ok((m,now))
}
fn create_payment_account<'a>(pid:&Pubkey,payer:&AccountInfo<'a>,merchant_acc:&AccountInfo<'a>,payment:&AccountInfo<'a>,system:&AccountInfo<'a>,reference:&[u8;32],lamports:u64)->Result<u8,ProgramError>{
 let (pda,bump)=Pubkey::find_program_address(&[b"payment",merchant_acc.key.as_ref(),reference],pid);
 if pda!=*payment.key{return Err(PowerError::AccountMismatch.into())}
 let rent=Rent::get()?;
 invoke_signed(&system_instruction::create_account(payer.key,payment.key,rent.minimum_balance(Payment::LEN).checked_add(lamports).ok_or(PowerError::ArithmeticOverflow)?,Payment::LEN as u64,pid),
 &[payer.clone(),payment.clone(),system.clone()],&[&[b"payment",merchant_acc.key.as_ref(),reference,&[bump]]])?;
 Ok(bump)
}
fn create_sol(pid:&Pubkey,a:&[AccountInfo],reference:[u8;32],amount:u64,expires_at:i64)->ProgramResult{
 let i=&mut a.iter();let payer=next_account_info(i)?;let merchant_acc=next_account_info(i)?;
 let payment=next_account_info(i)?;let system=next_account_info(i)?;
 if !payer.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 let (m,now)=merchant_and_time(pid,merchant_acc,expires_at)?;
 let bump=create_payment_account(pid,payer,merchant_acc,payment,system,&reference,amount)?;
 Payment{version:Payment::VERSION,reference,payer:*payer.key,merchant:*merchant_acc.key,gross_amount:amount,
 fee_amount:checked_fee(amount,m.fee_bps)?,created_at:now,expires_at,status:Payment::PENDING,asset_kind:Payment::ASSET_SOL,
 mint:Pubkey::default(),token_program:Pubkey::default(),decimals:9,bump}.serialize(&mut &mut payment.data.borrow_mut()[..])?;Ok(())
}
fn transfer_checked_ix(program:Pubkey,source:Pubkey,mint:Pubkey,destination:Pubkey,authority:Pubkey,amount:u64,decimals:u8)->Instruction{
 let mut data=Vec::with_capacity(10);data.push(12);data.extend_from_slice(&amount.to_le_bytes());data.push(decimals);
 Instruction{program_id:program,accounts:vec![AccountMeta::new(source,false),AccountMeta::new_readonly(mint,false),AccountMeta::new(destination,false),AccountMeta::new_readonly(authority,true)],data}
}
fn create_token(pid:&Pubkey,a:&[AccountInfo],reference:[u8;32],amount:u64,expires_at:i64,decimals:u8)->ProgramResult{
 let i=&mut a.iter();let payer=next_account_info(i)?;let merchant_acc=next_account_info(i)?;let payment=next_account_info(i)?;
 let payer_token=next_account_info(i)?;let escrow_token=next_account_info(i)?;let mint=next_account_info(i)?;
 let token_program=next_account_info(i)?;let system=next_account_info(i)?;
 if !payer.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 let (m,now)=merchant_and_time(pid,merchant_acc,expires_at)?;
 let bump=create_payment_account(pid,payer,merchant_acc,payment,system,&reference,0)?;
 let ix=transfer_checked_ix(*token_program.key,*payer_token.key,*mint.key,*escrow_token.key,*payer.key,amount,decimals);
 invoke(&ix,&[payer_token.clone(),mint.clone(),escrow_token.clone(),payer.clone(),token_program.clone()])?;
 Payment{version:Payment::VERSION,reference,payer:*payer.key,merchant:*merchant_acc.key,gross_amount:amount,
 fee_amount:checked_fee(amount,m.fee_bps)?,created_at:now,expires_at,status:Payment::PENDING,asset_kind:Payment::ASSET_TOKEN,
 mint:*mint.key,token_program:*token_program.key,decimals,bump}.serialize(&mut &mut payment.data.borrow_mut()[..])?;Ok(())
}
fn settle_sol(pid:&Pubkey,a:&[AccountInfo])->ProgramResult{
 let i=&mut a.iter();let auth=next_account_info(i)?;let merchant_acc=next_account_info(i)?;let payment_acc=next_account_info(i)?;
 let treasury=next_account_info(i)?;let fee_treasury=next_account_info(i)?;
 if !auth.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 if merchant_acc.owner!=pid||payment_acc.owner!=pid{return Err(PowerError::InvalidOwner.into())}
 let m=Merchant::try_from_slice(&merchant_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 let mut p=Payment::try_from_slice(&payment_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 if p.asset_kind!=Payment::ASSET_SOL{return Err(PowerError::InvalidStatus.into())}
 if m.authority!=*auth.key||m.treasury!=*treasury.key||m.fee_treasury!=*fee_treasury.key||p.merchant!=*merchant_acc.key{return Err(PowerError::Unauthorized.into())}
 if p.status!=Payment::PENDING{return Err(PowerError::InvalidStatus.into())}
 let net=p.gross_amount.checked_sub(p.fee_amount).ok_or(PowerError::ArithmeticOverflow)?;
 **payment_acc.try_borrow_mut_lamports()?=payment_acc.lamports().checked_sub(p.gross_amount).ok_or(PowerError::ArithmeticOverflow)?;
 **treasury.try_borrow_mut_lamports()?=treasury.lamports().checked_add(net).ok_or(PowerError::ArithmeticOverflow)?;
 **fee_treasury.try_borrow_mut_lamports()?=fee_treasury.lamports().checked_add(p.fee_amount).ok_or(PowerError::ArithmeticOverflow)?;
 p.status=Payment::SETTLED;p.serialize(&mut &mut payment_acc.data.borrow_mut()[..])?;Ok(())
}
fn settle_token(pid:&Pubkey,a:&[AccountInfo])->ProgramResult{
 let i=&mut a.iter();let auth=next_account_info(i)?;let merchant_acc=next_account_info(i)?;let payment_acc=next_account_info(i)?;
 let escrow=next_account_info(i)?;let treasury=next_account_info(i)?;let fee_treasury=next_account_info(i)?;
 let mint=next_account_info(i)?;let token_program=next_account_info(i)?;
 if !auth.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 if merchant_acc.owner!=pid||payment_acc.owner!=pid{return Err(PowerError::InvalidOwner.into())}
 let m=Merchant::try_from_slice(&merchant_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 let mut p=Payment::try_from_slice(&payment_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 if p.asset_kind!=Payment::ASSET_TOKEN||p.status!=Payment::PENDING||p.mint!=*mint.key||p.token_program!=*token_program.key{return Err(PowerError::InvalidStatus.into())}
 if m.authority!=*auth.key||p.merchant!=*merchant_acc.key{return Err(PowerError::Unauthorized.into())}
 let net=p.gross_amount.checked_sub(p.fee_amount).ok_or(PowerError::ArithmeticOverflow)?;
 let seeds=&[b"payment",merchant_acc.key.as_ref(),&p.reference,&[p.bump]];
 let net_ix=transfer_checked_ix(*token_program.key,*escrow.key,*mint.key,*treasury.key,*payment_acc.key,net,p.decimals);
 invoke_signed(&net_ix,&[escrow.clone(),mint.clone(),treasury.clone(),payment_acc.clone(),token_program.clone()],[seeds].as_slice())?;
 if p.fee_amount>0{
  let fee_ix=transfer_checked_ix(*token_program.key,*escrow.key,*mint.key,*fee_treasury.key,*payment_acc.key,p.fee_amount,p.decimals);
  invoke_signed(&fee_ix,&[escrow.clone(),mint.clone(),fee_treasury.clone(),payment_acc.clone(),token_program.clone()],[seeds].as_slice())?;
 }
 p.status=Payment::SETTLED;p.serialize(&mut &mut payment_acc.data.borrow_mut()[..])?;Ok(())
}
fn refund_sol(pid:&Pubkey,a:&[AccountInfo])->ProgramResult{
 let i=&mut a.iter();let caller=next_account_info(i)?;let payment_acc=next_account_info(i)?;let payer=next_account_info(i)?;
 if !caller.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 if payment_acc.owner!=pid{return Err(PowerError::InvalidOwner.into())}
 let mut p=Payment::try_from_slice(&payment_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 if p.asset_kind!=Payment::ASSET_SOL||p.payer!=*payer.key{return Err(PowerError::AccountMismatch.into())}
 if p.status!=Payment::PENDING{return Err(PowerError::InvalidStatus.into())}
 if *caller.key!=p.payer&&Clock::get()?.unix_timestamp<p.expires_at{return Err(PowerError::Unauthorized.into())}
 **payment_acc.try_borrow_mut_lamports()?=payment_acc.lamports().checked_sub(p.gross_amount).ok_or(PowerError::ArithmeticOverflow)?;
 **payer.try_borrow_mut_lamports()?=payer.lamports().checked_add(p.gross_amount).ok_or(PowerError::ArithmeticOverflow)?;
 p.status=Payment::REFUNDED;p.serialize(&mut &mut payment_acc.data.borrow_mut()[..])?;Ok(())
}
fn refund_token(pid:&Pubkey,a:&[AccountInfo])->ProgramResult{
 let i=&mut a.iter();let caller=next_account_info(i)?;let payment_acc=next_account_info(i)?;let payer=next_account_info(i)?;
 let escrow=next_account_info(i)?;let payer_token=next_account_info(i)?;let mint=next_account_info(i)?;let token_program=next_account_info(i)?;
 if !caller.is_signer{return Err(ProgramError::MissingRequiredSignature)}
 if payment_acc.owner!=pid{return Err(PowerError::InvalidOwner.into())}
 let mut p=Payment::try_from_slice(&payment_acc.data.borrow()).map_err(|_|PowerError::InvalidAccountData)?;
 if p.asset_kind!=Payment::ASSET_TOKEN||p.payer!=*payer.key||p.mint!=*mint.key||p.token_program!=*token_program.key{return Err(PowerError::AccountMismatch.into())}
 if p.status!=Payment::PENDING{return Err(PowerError::InvalidStatus.into())}
 if *caller.key!=p.payer&&Clock::get()?.unix_timestamp<p.expires_at{return Err(PowerError::Unauthorized.into())}
 let seeds=&[b"payment",p.merchant.as_ref(),&p.reference,&[p.bump]];
 let ix=transfer_checked_ix(*token_program.key,*escrow.key,*mint.key,*payer_token.key,*payment_acc.key,p.gross_amount,p.decimals);
 invoke_signed(&ix,&[escrow.clone(),mint.clone(),payer_token.clone(),payment_acc.clone(),token_program.clone()],[seeds].as_slice())?;
 p.status=Payment::REFUNDED;p.serialize(&mut &mut payment_acc.data.borrow_mut()[..])?;Ok(())
}
