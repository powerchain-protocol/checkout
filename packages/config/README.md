# PowerPay Configuration Workspace

This private workspace centralizes repository-wide policy and source-boundary
metadata.

## Install-script policy

`install-scripts-policy.json` records the rationale for every package that is
explicitly approved or denied by the root `allowScripts` policy.

The root `package.json` remains npm's source of truth because npm reads
`allowScripts` only from the project package manifest. The JSON file in this
workspace is the human-readable governance record used by validation scripts.

## Source boundaries

- `src/`: public PowerPay SDK implementation
- `app/src/`: merchant application implementation
- `packages/sdk/powerpay/ui/`: reusable React UI package
- `packages/config/`: shared repository policy and configuration

Application code may consume the public SDK or shared packages. The public SDK
must not import from `app/src`.
