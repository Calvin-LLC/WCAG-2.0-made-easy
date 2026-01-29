# WCAG 2.0 Level AA Requirements

## STANDARD - These are the target accessibility requirements!

Level AA is the standard level most organizations should meet. It builds on Level A requirements.

---

## 1.2 Time-based Media

### 1.2.4 Captions (Live)

Live audio must have real-time captions.

### 1.2.5 Audio Description (Prerecorded)

Video must have audio description of visual content.

```html
<!-- Video with captions and audio description track -->
<video controls>
    <source src="video.mp4" type="video/mp4">
    <track kind="captions" src="captions.vtt" srclang="en" label="English">
    <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Audio Descriptions">
</video>
```

---

## 1.4 Distinguishable

### 1.4.3 Contrast (Minimum)

Text must have sufficient contrast with background.

| Content Type | Minimum Ratio |
|--------------|---------------|
| Normal text (<18px or <14px bold) | 4.5:1 |
| Large text (≥18px or ≥14px bold) | 3:1 |
| UI components & graphics | 3:1 |

```css
/* CORRECT: Good contrast */
body {
    color: #212529;      /* Dark gray on white = ~16:1 */
    background: #ffffff;
}

.muted-text {
    color: #6c757d;      /* Gray on white = ~4.6:1 - passes */
}

/* WRONG: Insufficient contrast */
.light-text {
    color: #999999;      /* Light gray on white = ~2.8:1 - FAILS */
    background: #ffffff;
}

/* UI component contrast (3:1 minimum) */
input {
    border: 1px solid #6c757d;  /* ~4.6:1 - passes */
}

button {
    background: #0d6efd;  /* Must contrast with surrounding area */
}
```

### 1.4.4 Resize Text

Text must be resizable to 200% without loss of content or functionality.

```css
/* CORRECT: Use relative units */
body {
    font-size: 1rem;        /* 16px base, scales with user settings */
}

h1 {
    font-size: 2.5rem;      /* Scales proportionally */
}

.container {
    max-width: 80rem;       /* Scales with text */
    padding: 1.5rem;
}

/* WRONG: Fixed pixel sizes */
body {
    font-size: 16px;        /* Doesn't scale with user settings */
}

.container {
    width: 1200px;          /* Breaks at 200% zoom */
    overflow: hidden;       /* Clips content */
}
```

### 1.4.5 Images of Text

Avoid images of text. Use real text with CSS.

```html
<!-- WRONG: Image of text -->
<img src="welcome-banner.png" alt="Welcome to our site">

<!-- CORRECT: Real text, styled with CSS -->
<h1 class="banner-text">Welcome to our site</h1>

<style>
.banner-text {
    font-family: 'Fancy Font', serif;
    font-size: 3rem;
    color: #gold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
</style>
```

**Exception**: Logos may contain images of text.

---

## 2.4 Navigable

### 2.4.5 Multiple Ways

Provide more than one way to find pages.

```html
<!-- Multiple navigation methods -->

<!-- 1. Main navigation -->
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
    </ul>
</nav>

<!-- 2. Search -->
<form role="search" action="/search">
    <label for="search">Search</label>
    <input type="search" id="search" name="q">
    <button type="submit">Search</button>
</form>

<!-- 3. Site map -->
<a href="/sitemap">Site Map</a>

<!-- 4. Breadcrumbs -->
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li aria-current="page">Widget</li>
    </ol>
</nav>
```

### 2.4.6 Headings and Labels

Headings and labels must be descriptive.

```html
<!-- CORRECT: Descriptive headings -->
<h1>User Account Settings</h1>
<h2>Personal Information</h2>
<h2>Security Settings</h2>
<h2>Notification Preferences</h2>

<!-- WRONG: Vague headings -->
<h1>Settings</h1>
<h2>Section 1</h2>
<h2>Section 2</h2>

<!-- CORRECT: Descriptive labels -->
<label for="email">Email address</label>
<label for="threshold">Moisture alert threshold (percentage)</label>

<!-- WRONG: Vague labels -->
<label for="field1">Input</label>
<label for="field2">Value</label>
```

### 2.4.7 Focus Visible

Focus indicator must be visible on all interactive elements.

```css
/* CORRECT: Clear focus indicator */
:focus-visible {
    outline: 2px solid #0d6efd;
    outline-offset: 2px;
}

/* Custom focus for specific elements */
button:focus-visible {
    outline: 2px solid #0d6efd;
    box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.25);
}

a:focus-visible {
    outline: 2px solid #0d6efd;
    outline-offset: 2px;
    background-color: rgba(13, 110, 253, 0.1);
}

input:focus-visible {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
}

/* WRONG: Removing focus without replacement */
*:focus {
    outline: none;
}

/* WRONG: Low-visibility focus */
a:focus {
    outline: 1px dotted gray;
}
```

---

## 3.1 Readable

### 3.1.2 Language of Parts

Mark language changes within content.

```html
<html lang="en">
<body>
    <p>The French phrase <span lang="fr">je ne sais quoi</span> means
    "a quality that cannot be described."</p>

    <blockquote lang="de">
        Ich bin ein Berliner.
    </blockquote>
    <p>— John F. Kennedy</p>
</body>
</html>
```

---

## 3.2 Predictable

### 3.2.3 Consistent Navigation

Navigation must be in the same relative order across pages.

```html
<!-- Same navigation on every page -->
<nav aria-label="Main">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
<!-- Order must not change between pages -->
```

### 3.2.4 Consistent Identification

Components with same function must be labeled consistently.

```html
<!-- CORRECT: Consistent labeling -->
<!-- Page 1 -->
<button>Search</button>
<input type="search" aria-label="Search products">

<!-- Page 2 -->
<button>Search</button>
<input type="search" aria-label="Search products">

<!-- WRONG: Inconsistent labeling -->
<!-- Page 1 -->
<button>Search</button>

<!-- Page 2 -->
<button>Find</button>
<button>Look up</button>
```

---

## 3.3 Input Assistance

### 3.3.3 Error Suggestion

Provide suggestions to fix errors when possible.

```html
<!-- CORRECT: Suggest correction -->
<label for="email">Email</label>
<input type="email" id="email" value="john@gmailcom" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" class="error">
    Invalid email format. Did you mean john@gmail.com?
</p>

<!-- CORRECT: Explain requirements -->
<label for="password">Password</label>
<input type="password" id="password" aria-invalid="true" aria-describedby="password-error">
<p id="password-error" class="error">
    Password must be at least 8 characters and include a number.
</p>
```

### 3.3.4 Error Prevention (Legal, Financial, Data)

For important submissions, provide confirmation or reversal.

```html
<!-- CORRECT: Confirmation before destructive action -->
<button onclick="confirmDelete()">Delete Account</button>

<script>
function confirmDelete() {
    const confirmed = confirm(
        "Are you sure you want to delete your account? " +
        "This action cannot be undone."
    );
    if (confirmed) {
        // proceed with deletion
    }
}
</script>

<!-- CORRECT: Review before submission -->
<h2>Review Your Order</h2>
<dl>
    <dt>Product</dt>
    <dd>Widget Pro</dd>
    <dt>Quantity</dt>
    <dd>2</dd>
    <dt>Total</dt>
    <dd>$99.98</dd>
</dl>
<button type="button" onclick="editOrder()">Edit Order</button>
<button type="submit">Confirm Purchase</button>

<!-- CORRECT: Allow reversal -->
<p>Order placed! <button onclick="cancelOrder()">Cancel Order</button></p>
<p class="muted">You can cancel within 30 minutes.</p>
```

---

## Additional Best Practices (Beyond Level AA)

### Touch Targets

```css
/* Minimum 48x48px touch targets */
button,
a,
[role="button"],
input[type="checkbox"],
input[type="radio"] {
    min-width: 48px;
    min-height: 48px;
}

/* 8px minimum spacing */
.btn-group > * + * {
    margin-left: 8px;
}

/* Icon buttons need padding */
.icon-btn {
    padding: 12px;
    min-width: 48px;
    min-height: 48px;
}
```

### Reduced Motion

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

/* Or provide motion toggle */
.reduce-motion * {
    animation: none !important;
    transition: none !important;
}
```

### Pointer/Input Detection

```css
/* Don't assume input type from viewport */
/* WRONG */
@media (max-width: 768px) {
    /* assuming this is touch */
}

/* CORRECT: Query actual capabilities */
@media (hover: hover) and (pointer: fine) {
    /* Mouse or trackpad */
    .card:hover {
        transform: scale(1.02);
    }
}

@media (hover: none) and (pointer: coarse) {
    /* Touch device */
    .card {
        /* No hover effects */
    }
}

@media (pointer: coarse) {
    /* Touch - larger targets */
    .btn {
        min-height: 48px;
        padding: 12px 24px;
    }
}
```

### Relative Units

```css
/* Use rem for scalability */
html {
    font-size: 100%; /* Respects user's browser setting */
}

body {
    font-size: 1rem;
    line-height: 1.5;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

.container {
    max-width: 75rem;
    padding: 1.5rem;
}

/* Use vh/vw carefully */
.hero {
    min-height: 50vh;
}

/* Avoid fixed pixel heights */
/* WRONG */
.sidebar { height: 600px; }

/* CORRECT */
.sidebar { min-height: 100vh; }
```

---

## Level AA Checklist

### Perceivable
- [ ] Live captions for live audio
- [ ] Audio descriptions for video
- [ ] Color contrast 4.5:1 (text) / 3:1 (large text, UI)
- [ ] Text resizable to 200% without loss
- [ ] No images of text (except logos)

### Operable
- [ ] Multiple ways to find pages (nav, search, sitemap)
- [ ] Descriptive headings
- [ ] Descriptive labels
- [ ] Focus always visible

### Understandable
- [ ] Language changes marked
- [ ] Consistent navigation order
- [ ] Consistent component identification
- [ ] Error suggestions provided
- [ ] Confirmation for important actions

### Additional
- [ ] Touch targets 48x48px minimum
- [ ] 8px spacing between touch targets
- [ ] Reduced motion support
- [ ] Relative units for sizing
- [ ] No viewport-based input assumptions
