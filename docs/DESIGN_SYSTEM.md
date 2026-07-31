# PowerPay Design System

## Brand direction

PowerPay uses a professional financial-operations visual language rather than
a consumer-wallet aesthetic. The system is designed for long-running merchant
sessions, dense transaction information, and high-confidence payment actions.

## Typography

Use Inter throughout the application.

- Display headings: 700
- Section headings: 650–700
- Body: 400–500
- Labels and navigation: 600–750
- Numeric balances: 700–800

The PowerPay wordmark may visually distinguish `Power` at a lighter weight and
`Pay` at semibold while maintaining no spacing between the words.

## Color

Primary forest green:

```css
--pp-brand-700: #0b6b43;
--pp-brand-600: #0f8252;
--pp-brand-100: #e7f4ed;
```

Avoid introducing generic blue as a primary interface color. External asset
logos may retain their authentic brand colors where required.

## Layout

- Fixed navigation for desktop merchant operations
- Bordered, low-elevation surfaces
- 12–18 px corner radius
- Clear content hierarchy
- Responsive collapse below 900 px
- Mobile single-column layout below 620 px

## Components

### Primary action

Use forest-green fill, white text, strong contrast, and explicit action text.

### Secondary action

Use a neutral surface with a visible border.

### Status

Use icon and text together. Never communicate payment state by color alone.

### Checkout panels

Keep client context, payment details, and transaction summary simultaneously
visible on desktop. Stack them in workflow order on smaller screens.

### Loading

Use a full-page centered loading state without a card. Show the PowerPay mark,
wordmark, inline spinner, concise starting label, and a short supporting line.

## Themes

Light and dark themes must preserve:

- identical information architecture;
- the same semantic colors;
- comparable contrast;
- consistent spacing;
- matching interaction states.
