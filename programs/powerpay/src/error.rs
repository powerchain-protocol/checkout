use solana_program::program_error::ProgramError; use thiserror::Error;
#[repr(u32)] #[derive(Clone,Debug,Eq,Error,PartialEq)] pub enum PowerError {
 #[error("invalid instruction")]InvalidInstruction=0, #[error("invalid owner")]InvalidOwner,
 #[error("invalid account data")]InvalidAccountData, #[error("unauthorized")]Unauthorized,
 #[error("invalid status")]InvalidStatus, #[error("arithmetic overflow")]ArithmeticOverflow,
 #[error("payment expired")]PaymentExpired, #[error("invalid amount")]InvalidAmount,
 #[error("merchant paused")]MerchantPaused, #[error("account mismatch")]AccountMismatch,
}
impl From<PowerError> for ProgramError{fn from(e:PowerError)->Self{ProgramError::Custom(e as u32)}}
