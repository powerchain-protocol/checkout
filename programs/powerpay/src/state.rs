use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, PartialEq)]
pub struct Merchant {
    pub version: u8,
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub fee_treasury: Pubkey,
    pub fee_bps: u16,
    pub paused: bool,
    pub bump: u8,
}
impl Merchant { pub const VERSION:u8=1; pub const LEN:usize=1+32+32+32+2+1+1; }

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, PartialEq)]
pub struct Payment {
    pub version:u8,
    pub reference:[u8;32],
    pub payer:Pubkey,
    pub merchant:Pubkey,
    pub gross_amount:u64,
    pub fee_amount:u64,
    pub created_at:i64,
    pub expires_at:i64,
    pub status:u8,
    pub asset_kind:u8,
    pub mint:Pubkey,
    pub token_program:Pubkey,
    pub decimals:u8,
    pub bump:u8,
}
impl Payment {
    pub const VERSION:u8=2;
    pub const LEN:usize=1+32+32+32+8+8+8+8+1+1+32+32+1+1;
    pub const PENDING:u8=0; pub const SETTLED:u8=1; pub const REFUNDED:u8=2;
    pub const ASSET_SOL:u8=0; pub const ASSET_TOKEN:u8=1;
}
