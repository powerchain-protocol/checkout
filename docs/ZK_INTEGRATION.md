# Zero-knowledge integration boundary

PowerPay defines a `ZkVerifier` interface and proof envelope but does not ship an
unaudited proof verifier.

A production integration must specify:

- circuit and version;
- public input encoding;
- proving system;
- verification key distribution;
- replay prevention;
- proof expiry;
- subject binding;
- verifier audit history.

The default `RejectingZkVerifier` fails closed. Database records store proof
hashes and verification results rather than private witness data.
