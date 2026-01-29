# Accessibility Patterns

Reusable accessible code patterns. Copy and adapt for your project.

---

## 1. Skip Link

```html
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header>...</header>
    <nav>...</nav>
    <main id="main-content">
        <!-- Page content -->
    </main>
</body>

<style>
.skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
    z-index: 9999;
    padding: 1rem;
    background: #000;
    color: #fff;
    text-decoration: underline;
}

.skip-link:focus {
    left: 0;
}
</style>
```

---

## 2. Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Site Name</title>
</head>
<body>
    <a href="#main" class="skip-link">Skip to main content</a>

    <header role="banner">
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main id="main" role="main">
        <h1>Page Title</h1>
        <!-- Page content -->
    </main>

    <footer role="contentinfo">
        <p>&copy; 2024 Company Name</p>
    </footer>
</body>
</html>
```

---

## 3. Accessible Form

```html
<form action="/submit" method="post">
    <!-- Text Input -->
    <div class="form-group">
        <label for="name">Full Name <span aria-hidden="true">*</span></label>
        <input type="text" id="name" name="name"
               required
               aria-required="true"
               autocomplete="name">
    </div>

    <!-- Email with Help Text -->
    <div class="form-group">
        <label for="email">Email Address <span aria-hidden="true">*</span></label>
        <input type="email" id="email" name="email"
               required
               aria-required="true"
               aria-describedby="email-help"
               autocomplete="email">
        <p id="email-help" class="help-text">We'll never share your email.</p>
    </div>

    <!-- Input with Error -->
    <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone"
               aria-invalid="true"
               aria-describedby="phone-error"
               autocomplete="tel">
        <p id="phone-error" class="error" role="alert">
            Please enter a valid phone number (e.g., 555-123-4567)
        </p>
    </div>

    <!-- Select -->
    <div class="form-group">
        <label for="country">Country</label>
        <select id="country" name="country" autocomplete="country-name">
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
        </select>
    </div>

    <!-- Checkbox Group -->
    <fieldset>
        <legend>Notification Preferences</legend>
        <div class="checkbox-group">
            <input type="checkbox" id="email-notify" name="notify[]" value="email">
            <label for="email-notify">Email notifications</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="sms-notify" name="notify[]" value="sms">
            <label for="sms-notify">SMS notifications</label>
        </div>
    </fieldset>

    <!-- Radio Group -->
    <fieldset>
        <legend>Preferred Contact Method</legend>
        <div class="radio-group">
            <input type="radio" id="contact-email" name="contact" value="email">
            <label for="contact-email">Email</label>
        </div>
        <div class="radio-group">
            <input type="radio" id="contact-phone" name="contact" value="phone">
            <label for="contact-phone">Phone</label>
        </div>
    </fieldset>

    <!-- Submit -->
    <button type="submit">Submit Form</button>
</form>
```

---

## 4. Accessible Button Variations

```html
<!-- Standard Button -->
<button type="button">Save Changes</button>

<!-- Icon Button with Label -->
<button type="button" aria-label="Delete item">
    <svg aria-hidden="true" focusable="false"><!-- icon --></svg>
</button>

<!-- Icon + Text Button -->
<button type="button">
    <svg aria-hidden="true" focusable="false"><!-- icon --></svg>
    <span>Download</span>
</button>

<!-- Loading Button -->
<button type="button" aria-busy="true" disabled>
    <span class="spinner" aria-hidden="true"></span>
    <span>Saving...</span>
</button>

<!-- Toggle Button -->
<button type="button"
        aria-pressed="false"
        onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')">
    Dark Mode
</button>
```

---

## 5. Accessible Modal/Dialog

```html
<button type="button" id="open-modal">Open Dialog</button>

<div id="modal" role="dialog" aria-modal="true"
     aria-labelledby="modal-title"
     aria-describedby="modal-desc"
     hidden>
    <div class="modal-content">
        <h2 id="modal-title">Confirm Action</h2>
        <p id="modal-desc">Are you sure you want to delete this item?</p>
        <div class="modal-actions">
            <button type="button" id="cancel-btn">Cancel</button>
            <button type="button" id="confirm-btn">Delete</button>
        </div>
        <button type="button" class="close-btn" aria-label="Close dialog">×</button>
    </div>
</div>

<script>
const modal = document.getElementById('modal');
const openBtn = document.getElementById('open-modal');
const closeBtn = modal.querySelector('.close-btn');
const cancelBtn = document.getElementById('cancel-btn');
let previousFocus;

function openModal() {
    previousFocus = document.activeElement;
    modal.hidden = false;
    modal.querySelector('button').focus();
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    previousFocus?.focus();
}

// Trap focus inside modal
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    if (e.key !== 'Tab') return;

    const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
    }
});

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
</script>
```

---

## 6. Accessible Navigation

```html
<!-- Main Navigation -->
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>

<!-- Breadcrumb Navigation -->
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><span aria-current="page">Widget Pro</span></li>
    </ol>
</nav>

<!-- Pagination -->
<nav aria-label="Pagination">
    <ul>
        <li><a href="?page=1" aria-label="Go to first page">&laquo;</a></li>
        <li><a href="?page=2" aria-label="Go to page 2">2</a></li>
        <li><span aria-current="page" aria-label="Current page, page 3">3</span></li>
        <li><a href="?page=4" aria-label="Go to page 4">4</a></li>
        <li><a href="?page=10" aria-label="Go to last page">&raquo;</a></li>
    </ul>
</nav>
```

---

## 7. Accessible Dropdown Menu

```html
<div class="dropdown">
    <button type="button"
            id="menu-button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu">
        Menu
        <span aria-hidden="true">▼</span>
    </button>
    <ul id="menu" role="menu" aria-labelledby="menu-button" hidden>
        <li role="none">
            <a role="menuitem" href="/profile">Profile</a>
        </li>
        <li role="none">
            <a role="menuitem" href="/settings">Settings</a>
        </li>
        <li role="none">
            <button role="menuitem" type="button">Logout</button>
        </li>
    </ul>
</div>

<script>
const button = document.getElementById('menu-button');
const menu = document.getElementById('menu');

button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    menu.hidden = expanded;
    if (!expanded) {
        menu.querySelector('[role="menuitem"]').focus();
    }
});

menu.addEventListener('keydown', (e) => {
    const items = [...menu.querySelectorAll('[role="menuitem"]')];
    const index = items.indexOf(document.activeElement);

    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            items[(index + 1) % items.length].focus();
            break;
        case 'ArrowUp':
            e.preventDefault();
            items[(index - 1 + items.length) % items.length].focus();
            break;
        case 'Escape':
            button.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
            button.focus();
            break;
    }
});
</script>
```

---

## 8. Accessible Tabs

```html
<div class="tabs">
    <div role="tablist" aria-label="Product Information">
        <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">
            Description
        </button>
        <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
            Specifications
        </button>
        <button role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1">
            Reviews
        </button>
    </div>

    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
        <h2>Description</h2>
        <p>Product description content...</p>
    </div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
        <h2>Specifications</h2>
        <p>Product specifications...</p>
    </div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
        <h2>Reviews</h2>
        <p>Customer reviews...</p>
    </div>
</div>

<script>
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Deselect all tabs
        tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        // Hide all panels
        panels.forEach(p => p.hidden = true);

        // Select clicked tab
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');

        // Show associated panel
        document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    });

    tab.addEventListener('keydown', (e) => {
        const index = [...tabs].indexOf(tab);
        let newIndex;

        if (e.key === 'ArrowRight') {
            newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
            newIndex = (index - 1 + tabs.length) % tabs.length;
        } else {
            return;
        }

        tabs[newIndex].click();
        tabs[newIndex].focus();
    });
});
</script>
```

---

## 9. Accessible Alert/Toast

```html
<!-- Success Alert -->
<div role="status" aria-live="polite" class="alert alert-success">
    <span aria-hidden="true">✓</span>
    Settings saved successfully.
</div>

<!-- Error Alert (Important) -->
<div role="alert" aria-live="assertive" class="alert alert-error">
    <span aria-hidden="true">⚠</span>
    Error: Could not save settings. Please try again.
</div>

<!-- Toast Container (for dynamic alerts) -->
<div id="toast-container" aria-live="polite" aria-atomic="true">
    <!-- Toasts will be inserted here -->
</div>

<script>
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}
</script>
```

---

## 10. Accessible Data Table

```html
<table>
    <caption>Monthly Sensor Readings</caption>
    <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Moisture (%)</th>
            <th scope="col">Temperature (°C)</th>
            <th scope="col">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Jan 1</th>
            <td>45</td>
            <td>22</td>
            <td><span class="status-ok" aria-label="Status: OK">✓ OK</span></td>
        </tr>
        <tr>
            <th scope="row">Jan 2</th>
            <td>28</td>
            <td>24</td>
            <td><span class="status-warning" aria-label="Status: Low moisture">⚠ Low</span></td>
        </tr>
    </tbody>
</table>

<style>
/* Don't rely on color alone */
.status-ok::before { content: "✓ "; }
.status-warning::before { content: "⚠ "; }
.status-error::before { content: "✕ "; }
</style>
```

---

## 11. Accessible Loading State

```html
<!-- Loading Button -->
<button type="submit" aria-busy="true" disabled>
    <span class="spinner" aria-hidden="true"></span>
    <span>Saving...</span>
</button>

<!-- Loading Region -->
<div aria-busy="true" aria-describedby="loading-msg">
    <p id="loading-msg" class="visually-hidden">Loading content, please wait.</p>
    <div class="spinner" aria-hidden="true"></div>
</div>

<!-- Progress Bar -->
<div role="progressbar"
     aria-valuenow="75"
     aria-valuemin="0"
     aria-valuemax="100"
     aria-label="Upload progress">
    <div class="progress-fill" style="width: 75%"></div>
</div>

<style>
/* Visually hidden but available to screen readers */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>
```

---

## 12. Focus Styles

```css
/* Global focus styles */
:focus-visible {
    outline: 2px solid #0d6efd;
    outline-offset: 2px;
}

/* Button focus */
button:focus-visible {
    outline: 2px solid #0d6efd;
    box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.25);
}

/* Input focus */
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
}

/* Link focus */
a:focus-visible {
    outline: 2px solid #0d6efd;
    outline-offset: 2px;
    background-color: rgba(13, 110, 253, 0.1);
}

/* Dark background focus */
.dark-bg :focus-visible {
    outline-color: #fff;
}

/* NEVER do this without replacement! */
/* *:focus { outline: none; } */
```

---

## 13. Reduced Motion

```css
/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Or provide toggle */
.reduce-motion * {
    animation: none !important;
    transition: none !important;
}

/* Safe animations (opacity/color only) */
@media (prefers-reduced-motion: reduce) {
    .fade-in {
        animation: none;
        opacity: 1;
    }
}
```

---

## 14. Touch Targets

```css
/* Minimum touch target size */
button,
a,
[role="button"],
input[type="checkbox"] + label,
input[type="radio"] + label {
    min-width: 48px;
    min-height: 48px;
}

/* Icon buttons */
.icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;
    padding: 12px;
}

/* Spacing between targets */
.btn-group > * + * {
    margin-left: 8px;
}

.action-list > * + * {
    margin-top: 8px;
}

/* Pointer queries for adaptive sizing */
@media (pointer: coarse) {
    /* Touch device - ensure large targets */
    .btn {
        min-height: 48px;
        padding: 12px 24px;
    }
}

@media (pointer: fine) {
    /* Mouse - can use smaller targets (but still accessible) */
    .btn {
        min-height: 36px;
        padding: 8px 16px;
    }
}
```

---

## 15. Relative Units

```css
/* Base sizing */
html {
    font-size: 100%; /* Respects browser setting (usually 16px) */
}

body {
    font-size: 1rem;
    line-height: 1.5;
}

/* Typography scale */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }

/* Layout */
.container {
    max-width: 75rem;
    padding: 1.5rem;
    margin: 0 auto;
}

/* Spacing */
.section {
    padding: 3rem 0;
}

.card {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

/* Avoid fixed heights */
/* WRONG */
.hero { height: 600px; }

/* CORRECT */
.hero { min-height: 50vh; }
```
