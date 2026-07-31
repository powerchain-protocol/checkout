# PowerPay Loading Experience

The application now has two coordinated startup layers.

## Static boot layer

`app/index.html` renders immediately before JavaScript and React load. It uses
the official PowerPay mark, matching typography, an accessible progress
indicator, and light/dark system-theme support.

## React startup layer

`StartupScreen` takes over after the application bundle mounts and advances
through four functional phases:

1. interface preparation;
2. wallet-provider preparation;
3. network and settlement preparation;
4. ready state and dashboard handoff.

The transition is intentionally brief. It gives required fonts and the React
runtime time to settle without introducing a long artificial delay.

## Design

The implementation follows the approved concept through:

- official PowerPay icon and connected wordmark;
- Power Light and Pay Semibold typography;
- forest-green energy divider and progress ring;
- secure, encrypted, and verified assurance labels;
- animated multi-layer energy waves;
- PowerChain, multi-chain, and instant-payment capability footer;
- coordinated light and dark system themes;
- mobile and reduced-motion support.

The generated concept remains available at
`docs/images/powerpay-loading-concept.png` as a design reference.
