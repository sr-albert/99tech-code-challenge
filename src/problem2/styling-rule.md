# Swap UI Styling Specification

You are designing a dark-themed “Swap” card UI. Match the exact look-and-feel defined below. Do not change class names. Keep CSS variables and structure intact. Ensure hover/focus, transitions, and responsive behavior are preserved.

## Design Tokens (`:root`)

- **Colors**: `--primary-color #6366f1`, `--primary-hover #4f46e5`, `--secondary-color #8b5cf6`
- **Backgrounds**: `--background #0f172a`, `--surface #1e293b`, `--surface-hover #334155`, `--border #334155`
- **Text**: `--text-primary #f1f5f9`, `--text-secondary #94a3b8`, `--text-muted #64748b`
- **Status**: `--error #ef4444`, `--success #10b981`, `--warning #f59e0b`
- **Effects**: `--shadow rgba(0,0,0,0.3)`, `--gradient linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

## Global Layout

- Reset margins, padding, and box-sizing.
- Use the system font stack with font-smoothing enabled.
- Body: dark radial background accents, center the container, maximum width `480px`.

## Card Structure

- `.swap-card`: surface background, `24px` radius, `24px` padding, `1px` border, deep shadow, gradient hairline via `::before`.
- `.card-header`: title and settings icon aligned; settings hover uses surface-hover background and text-primary color.

## Form Elements

- `.swap-form`: vertical gap of `16px`.
- `.currency-input-group` with `.input-label`: `14px` text, secondary color.
- `.currency-input-wrapper`: background `--background`, `2px` border, `16px` radius, `12px` padding, `12px` gap, focused state adds primary border and subtle glow.
- `.currency-selector`: pill layout with icon, symbol, dropdown; minimum width `120px`; hover shows surface-hover background and visible border.
- `.currency-icon`: `24px` circular image.
- `.currency-symbol`: bold `16px`, flex grow.
- `.dropdown-arrow`: translates downward on hover.
- `.amount-input`: bold `24px`, right-aligned, transparent background, no border, muted placeholder, read-only state uses text-secondary and not-allowed cursor.
- `.input-footer`: `12px` row with balance text and MAX button.
- `.max-btn`: outlined with primary text; hover fills with primary color and inverts text.
- Validation via `.error-message`: `12px`, red text, minimum height, toggled with `.show`.

## Swap Controls

- `.swap-button-container`: centers `.swap-direction-btn` between inputs; button uses dark background, bordered, rotates on hover, scales slightly when active.
- `.confirm-btn`: gradient background, `16px` radius, elevates on hover, disabled state reduces opacity and disables pointer.

## Loading Overlay

- `.loading-overlay`: absolute card cover, dark translucent backdrop with blur, toggled via `.hidden`.
- `.spinner`: bordered circle with primary top border, `0.8s` infinite rotation keyframes.

## Modal Components

- `.modal-overlay`: full-screen dimmed layer with blur, opacity transitions, toggled via `.show`.
- `.modal`: surface panel, `24px` radius, max width `420px`, max height `80vh`, bordered with shadow, scale-in animation.
- `.modal-header`: includes title and close button (close hover matches settings).
- `.modal-search input`: dark background, `2px` border, `12px` radius, primary focus ring.
- `.modal-content`: scrollable list container.
- `.token-item`: row with icon, symbol, name, right-aligned price; hover uses surface-hover; `.selected` adds subtle primary tint and border.
- `.token-item.no-price`: dims item and price text.
- `.empty-state`: centered muted text.

## Responsive Behavior (≤ 480px)

- Reduce card padding and border radius.
- Stack currency input content column-wise, align amount text to the left.
- Increase modal max height to `90vh`.

## Motion & Transitions

- Apply smooth transitions to background, border, and color changes.
- Ensure spinner keyframes handle rotation.

## Structural Constraints

- Preserve all class names exactly: `container`, `swap-card`, `swap-form`, `currency-input-group`, `input-label`, `currency-input-wrapper`, `currency-selector`, `currency-icon`, `currency-symbol`, `dropdown-arrow`, `amount-input`, `input-footer`, `balance-text`, `max-btn`, `exchange-rate`, `error-message`, `swap-button-container`, `swap-direction-btn`, `confirm-btn`, `loading-overlay`, `spinner`, `modal-overlay`, `modal`, `modal-header`, `modal-close`, `modal-search`, `modal-content`, `token-item`, `token-item-icon`, `token-item-info`, `token-item-symbol`, `token-item-name`, `token-item-price`, `empty-state`.
- Use CSS variables for all colors; do not hardcode new values.
- Maintain hover, focus, and active interactions along with transition behaviors.
- Ensure accessibility through contrast and visible focus states.

## Output Requirements

- Provide HTML/CSS (or components) that visually match this specification.
- Do not alter existing class or variable names.
- Keep styles scoped to the provided classes and variables.
- Avoid utility frameworks; maintain pixel-level fidelity with the defined sizes, spacing, and effects.