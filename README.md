# Aegis DateTime Picker

A custom HTML element (`<aegis-datetime-picker>`) for date and time selection, built with Svelte and compiled as a Web Component.

## Features

- 🗓️ **Three modes**: date, time, or datetime
- 🎨 **Blue & white theme** with CSS variable customization
- 📅 **Calendar UI** with keyboard navigation and accessibility
- ⏰ **Time UI** with hour/minute spinners and 12h/24h support
- 🚀 **Quick date buttons**: Yesterday, Today, Next Month, Next Year
- 💫 **Popup mode** for compact layouts
- ✅ **Validation** with min/max and required support
- 📝 **Form integration** via hidden input
- 🔒 **Multi-instance isolation** with Shadow DOM
- ♿ **Accessible** with ARIA roles and keyboard support

## Installation

### Via Script Tag (Plain HTML)

```html
<script type="module" src="dist/aegis-datetime-picker.js"></script>
```

### Via npm/yarn (Module-based projects)

```bash
npm install aegis-datetime-picker
```

```javascript
import 'aegis-datetime-picker';
```

## Usage

### Basic Examples

```html
<!-- Date picker -->
<aegis-datetime-picker
  mode="date"
  date-format="MM/DD/YYYY">
</aegis-datetime-picker>

<!-- Time picker (12-hour) -->
<aegis-datetime-picker
  mode="time"
  time-format="hh:mm A">
</aegis-datetime-picker>

<!-- DateTime picker -->
<aegis-datetime-picker
  mode="datetime"
  date-format="YYYY-MM-DD"
  time-format="HH:mm">
</aegis-datetime-picker>
```

### Popup Mode

```html
<aegis-datetime-picker
  mode="datetime"
  popup
  date-format="DD.MM.YYYY"
  time-format="HH:mm">
</aegis-datetime-picker>
```

### With Validation

```html
<aegis-datetime-picker
  mode="date"
  required
  min="2025-01-01T00:00"
  max="2025-12-31T23:59">
</aegis-datetime-picker>
```

### Form Integration

```html
<form id="my-form">
  <aegis-datetime-picker
    name="appointment"
    mode="datetime"
    required>
  </aegis-datetime-picker>
  <button type="submit">Submit</button>
</form>
```

The element creates a hidden `<input>` that submits the canonical value.

### Event Handling

```javascript
const picker = document.querySelector('aegis-datetime-picker');

picker.addEventListener('input', (e) => {
  console.log('Input:', e.detail.value);
});

picker.addEventListener('change', (e) => {
  console.log('Changed:', e.detail.value);
});
```

### Programmatic Access

```javascript
const picker = document.querySelector('aegis-datetime-picker');

// Get values
console.log(picker.value);      // "2025-12-05T14:30"
console.log(picker.dateValue);  // "2025-12-05"
console.log(picker.timeValue);  // "14:30"
console.log(picker.isValid);    // true

// Set value
picker.value = "2025-12-25T10:00";

// Popup methods
picker.open();
picker.close();
```

## Attributes & Properties

| Attribute | Property | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `mode` | `mode` | `string` | `"datetime"` | Picker mode: `"date"`, `"time"`, or `"datetime"` |
| `value` | `value` | `string \| null` | `null` | Canonical ISO-like value (e.g., `"2025-12-05T14:30"`) |
| `date-format` | `dateFormat` | `string` | `"YYYY-MM-DD"` | Date display format. Tokens: `YYYY`, `MM`, `DD` |
| `time-format` | `timeFormat` | `string` | `"HH:mm"` | Time display format. Tokens: `HH`, `hh`, `mm`, `A` |
| `min` | `min` | `string \| null` | `null` | Minimum allowed value (canonical format) |
| `max` | `max` | `string \| null` | `null` | Maximum allowed value (canonical format) |
| `required` | `required` | `boolean` | `false` | Whether value is required |
| `name` | `name` | `string` | `""` | Form field name (enables form submission) |
| `popup` | `popup` | `boolean` | `false` | Show as popup instead of inline |
| `show-quick-dates` | `showQuickDates` | `boolean` | `false` | Show quick date buttons in time-only mode |

### Read-only Properties

| Property | Type | Description |
|----------|------|-------------|
| `dateValue` | `string \| null` | Date portion only (`"YYYY-MM-DD"`) |
| `timeValue` | `string \| null` | Time portion only (`"HH:mm"`) |
| `isValid` | `boolean` | Current validation state |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `{ value: string \| null }` | Fired on each value change |
| `change` | `{ value: string \| null }` | Fired when value is committed |

## Format Tokens

### Date Tokens

| Token | Description | Example |
|-------|-------------|---------|
| `YYYY` | 4-digit year | `2025` |
| `MM` | 2-digit month | `01`-`12` |
| `DD` | 2-digit day | `01`-`31` |

### Time Tokens

| Token | Description | Example |
|-------|-------------|---------|
| `HH` | 24-hour hours | `00`-`23` |
| `hh` | 12-hour hours | `01`-`12` |
| `mm` | Minutes | `00`-`59` |
| `A` | AM/PM indicator | `AM`, `PM` |

### Format Examples

| Format | Example Output |
|--------|----------------|
| `MM/DD/YYYY` | `12/05/2025` |
| `DD.MM.YYYY` | `05.12.2025` |
| `YYYY-MM-DD` | `2025-12-05` |
| `HH:mm` | `14:30` |
| `hh:mm A` | `02:30 PM` |

## CSS Customization

The component uses CSS custom properties for theming:

```css
aegis-datetime-picker {
  --aegis-dtp-bg: #ffffff;
  --aegis-dtp-text: #1a1a2e;
  --aegis-dtp-accent: #3b82f6;
  --aegis-dtp-hover-bg: #dbeafe;
  --aegis-dtp-border-radius: 6px;
  --aegis-dtp-border: #cbd5e1;
  --aegis-dtp-invalid: #ef4444;
}
```

### Example: Purple Theme

```css
aegis-datetime-picker.purple-theme {
  --aegis-dtp-accent: #8b5cf6;
  --aegis-dtp-hover-bg: #ede9fe;
}
```

## Accessibility

- Calendar uses `role="grid"` with `role="gridcell"` for days
- Selected date marked with `aria-selected="true"`
- Today's date marked with `aria-current="date"`
- Arrow keys navigate the calendar
- Enter/Space selects focused day
- Escape closes popup
- All buttons have accessible labels

## Multi-Instance Support

Multiple `<aegis-datetime-picker>` elements on the same page work independently:

```html
<aegis-datetime-picker id="start" mode="datetime"></aegis-datetime-picker>
<aegis-datetime-picker id="end" mode="datetime"></aegis-datetime-picker>
```

Each instance:
- Has isolated state (Shadow DOM)
- Manages its own popup (if enabled)
- Submits its own form value

## Notes

- **Local timezone**: All date/time calculations use the browser's local timezone
- **Minutes precision**: No seconds are stored or displayed
- **Canonical format**: Internal value is always `YYYY-MM-DDTHH:mm`
- **Time baseline**: Time-only mode uses `1970-01-01` as the date baseline

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT
