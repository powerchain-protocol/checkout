# PowerPay 1.0.0 Beta 1 install policy and workspace report

Generated: 2026-07-31T05:45:56.550093+00:00

- Install-script policy: PASS
- Workspace layout: PASS
- Version normalization: PASS
- Documentation: PASS
- Package contents: PASS

## Policy summary

- Approved install-script packages: 4
- Explicitly denied install-script packages: 53
- Enforcement: strict-allow-scripts
- Source of truth: root package.json allowScripts
- Rationale: packages/config/install-scripts-policy.json

## After extracting

```bash
cd /workspaces/powerpay
rm -rf node_modules app/node_modules package-lock.json
npm install
npm run install:scripts:validate
npm run install:scripts:list
```
