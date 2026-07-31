# Repository migration

The canonical repository is now:

```text
https://github.com/powerchain-protocol/powerpay-checkout-sdk
```

Update an existing local clone:

```bash
git remote set-url origin https://github.com/powerchain-protocol/powerpay-checkout-sdk.git
git fetch origin
git remote -v
```

Package names:

```text
@powerchain-protocol/powerpay-checkout-sdk
@powerchain-protocol/powerpay-ui
```

Before publishing, create the `@powerchain-protocol` npm organization or update the package scope to an organization you control.
