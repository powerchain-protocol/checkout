use crate::error::PowerError;
use solana_program::program_error::ProgramError;

#[derive(Clone,Debug,PartialEq)]
pub enum PowerPayInstruction {
 InitializeMerchant{fee_bps:u16},
 UpdateMerchant{fee_bps:u16,paused:bool},
 CreatePayment{reference:[u8;32],amount:u64,expires_at:i64},
 SettlePayment,
 RefundPayment,
 CreateTokenPayment{reference:[u8;32],amount:u64,expires_at:i64,decimals:u8},
 SettleTokenPayment,
 RefundTokenPayment,
}
impl PowerPayInstruction {
 pub fn unpack(input:&[u8])->Result<Self,ProgramError>{
  let (&tag,rest)=input.split_first().ok_or(PowerError::InvalidInstruction)?;
  match tag {
   0 if rest.len()==2=>Ok(Self::InitializeMerchant{fee_bps:u16::from_le_bytes(rest.try_into().unwrap())}),
   1 if rest.len()==3=>Ok(Self::UpdateMerchant{fee_bps:u16::from_le_bytes(rest[0..2].try_into().unwrap()),paused:rest[2]!=0}),
   2 if rest.len()==48=>parse_create(rest).map(|(reference,amount,expires_at)|Self::CreatePayment{reference,amount,expires_at}),
   3 if rest.is_empty()=>Ok(Self::SettlePayment),
   4 if rest.is_empty()=>Ok(Self::RefundPayment),
   5 if rest.len()==49=>{
     let (reference,amount,expires_at)=parse_create(&rest[..48])?;
     Ok(Self::CreateTokenPayment{reference,amount,expires_at,decimals:rest[48]})
   },
   6 if rest.is_empty()=>Ok(Self::SettleTokenPayment),
   7 if rest.is_empty()=>Ok(Self::RefundTokenPayment),
   _=>Err(PowerError::InvalidInstruction.into())
  }
 }
}
fn parse_create(rest:&[u8])->Result<([u8;32],u64,i64),ProgramError>{
 let amount=u64::from_le_bytes(rest[32..40].try_into().unwrap());
 if amount==0{return Err(PowerError::InvalidAmount.into())}
 Ok((rest[0..32].try_into().unwrap(),amount,i64::from_le_bytes(rest[40..48].try_into().unwrap())))
}
#[cfg(test)] mod tests {
 use super::*;
 #[test]fn rejects_zero(){
  let mut d=vec![2];d.extend([1u8;32]);d.extend(0u64.to_le_bytes());d.extend(9i64.to_le_bytes());
  assert!(PowerPayInstruction::unpack(&d).is_err())
 }
 #[test]fn parses_token(){
  let mut d=vec![5];d.extend([2u8;32]);d.extend(10u64.to_le_bytes());d.extend(99i64.to_le_bytes());d.push(6);
  assert!(matches!(PowerPayInstruction::unpack(&d).unwrap(),PowerPayInstruction::CreateTokenPayment{decimals:6,..}))
 }
}
