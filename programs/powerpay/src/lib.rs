#![allow(unexpected_cfgs)]
pub mod error; pub mod instruction; pub mod processor; pub mod state;
use solana_program::{entrypoint, entrypoint::ProgramResult, account_info::AccountInfo, pubkey::Pubkey};
solana_program::declare_id!("4K2V1kpVycZ6qSFsNdz2FtpNxnJs17eBNzf9rdCMcKoe");
entrypoint!(entry);
fn entry(program_id:&Pubkey,accounts:&[AccountInfo],input:&[u8])->ProgramResult{processor::process(program_id,accounts,input)}
