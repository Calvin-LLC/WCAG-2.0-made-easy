# Accessibility Patterns Rule

## Always Apply These Patterns

When writing HTML, CSS, or JavaScript, enforce these accessibility patterns.

---

## HTML Patterns

### Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>[Page Name] - [Site Name]</title>
</head>
<body>
    <a href="#main" class="skip-link">Skip to main content</a>
    <header>
        <nav aria-label="Main">...</nav>
    </header>
    <main id="main">
        <h1>[Page Title]</h1>
        ...
    </main>
    <footer>...</footer>
</body>
</html>
```

### Images
```html
<!-- Informative -->
<img src="..." alt="Description of what the image shows">

<!-- Decorative -->
<img src="..." alt="">

<!-- Complex -->
<figure>
    <img src="..." alt="Brief description">
    <figcaption>Detailed description...</figcaption>
</figure>
```

### Forms
```html
<label for="fieldId">Label Text</label>
<input type="..." id="fieldId" name="..." aria-describedby="helpId errorId">
<p id="helpId">Help text</p>
<p id="errorId" role="alert">Error message</p>
```

### Buttons
```html
<!-- Text button -->
<button type="button">Action</button>

<!-- Icon button -->
<button type="button" aria-label="Description">
    <svg aria-hidden="true">...</svg>
</button>
```

### Links
```html
<!-- Descriptive text -->
<a href="...">Download Q4 Report (PDF, 2MB)</a>

<!-- NEVER -->
<a href="...">Click here</a>
<a href="...">Read more</a>
```

---

## CSS Patterns

### Focus Styles (REQUIRED)
```css
:focus-visible {
    outline: 2px solid #0d6efd;
    outline-offset: 2px;
}

/* NEVER */
*:focus { outline: none; }
```

### Touch Targets
```css
button, a, [role="button"] {
    min-width: 48px;
    min-height: 48px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

### Relative Units
```css
/* Use rem, not px */
body { font-size: 1rem; }
h1 { font-size: 2.5rem; }
.container { max-width: 75rem; }
```

### Color Independence
```css
/* Always combine color with another indicator */
.error {
    color: #dc3545;
    border-left: 4px solid #dc3545;
}
.error::before {
    content: "⚠ ";
}
```

---

## JavaScript Patterns

### Keyboard Support
```javascript
element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAction();
    }
});
```

### Focus Management
```javascript
// After dynamic content change
newElement.focus();

// After modal close
previouslyFocusedElement.focus();
```

### ARIA Updates
```javascript
// Toggle states
button.setAttribute('aria-expanded', isExpanded);
button.setAttribute('aria-pressed', isPressed);

// Loading states
element.setAttribute('aria-busy', 'true');
```

### Live Regions
```javascript
// For dynamic announcements
const alert = document.createElement('div');
alert.setAttribute('role', 'status');
alert.setAttribute('aria-live', 'polite');
alert.textContent = 'Settings saved';
document.body.appendChild(alert);
```

---

## Anti-Patterns to Block

### Critical (Will Break Accessibility)
- `<img>` without `alt` attribute
- `<input>` without associated `<label>`
- `*:focus { outline: none; }` without replacement
- `<div onclick>` for interactive elements
- Missing `<html lang="...">`
- Missing `<title>`

### Serious (Major Barriers)
- Color as only indicator
- Touch targets under 44px
- Fixed pixel heights that break zoom
- Missing heading structure
- Missing skip link
- Auto-playing media

### Moderate (Should Fix)
- Missing aria-labels on icon buttons
- Vague link text ("click here")
- Missing `prefers-reduced-motion` support
- Inconsistent focus styles
- Missing landmark roles

---

## Enforcement Checklist

When reviewing code, verify:

### HTML
- [ ] `<html lang="...">` present
- [ ] `<title>` is unique and descriptive
- [ ] Only one `<h1>` per page
- [ ] Headings in logical order
- [ ] All `<img>` have `alt`
- [ ] All `<input>` have `<label>`
- [ ] Skip link present
- [ ] Semantic elements used

### CSS
- [ ] Focus styles visible
- [ ] No `outline: none` without replacement
- [ ] Touch targets ≥ 48px
- [ ] Reduced motion respected
- [ ] Relative units used
- [ ] Color not sole indicator

### JavaScript
- [ ] Keyboard handlers on custom controls
- [ ] Focus managed after DOM changes
- [ ] ARIA states updated appropriately
- [ ] No keyboard traps
