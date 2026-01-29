# WCAG 2.0 Level A Requirements

## CRITICAL - These are the minimum accessibility requirements!

Level A is the minimum level of conformance. Failing these creates serious barriers for users with disabilities.

---

## 1.1 Text Alternatives

### 1.1.1 Non-text Content

ALL non-text content must have a text alternative.

```html
<!-- Informative images: describe the content -->
<img src="chart.png" alt="Bar chart showing sales growth of 25% year over year">

<!-- Functional images: describe the function -->
<button>
    <img src="search.svg" alt="Search">
</button>

<!-- Decorative images: use empty alt -->
<img src="decorative-border.png" alt="">

<!-- Complex images: use longer description -->
<img src="flowchart.png" alt="User registration process" aria-describedby="flowchart-desc">
<div id="flowchart-desc">
    Step 1: Enter email. Step 2: Verify email. Step 3: Create password. Step 4: Complete profile.
</div>

<!-- Form image buttons -->
<input type="image" src="submit.png" alt="Submit form">
```

**Common Failures:**
- Missing `alt` attribute
- `alt="image"` or `alt="photo"` (not descriptive)
- Alt text that doesn't match the image purpose

---

## 1.3 Adaptable

### 1.3.1 Info and Relationships

Structure must be programmatically determinable.

```html
<!-- Use semantic HTML -->
<header>
    <nav aria-label="Main navigation">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h1>Article Title</h1>
        <p>Content...</p>
    </article>
</main>

<!-- Tables need proper headers -->
<table>
    <caption>Monthly Sales Data</caption>
    <thead>
        <tr>
            <th scope="col">Month</th>
            <th scope="col">Sales</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">January</th>
            <td>$10,000</td>
        </tr>
    </tbody>
</table>

<!-- Lists for list content -->
<ul>
    <li>Item one</li>
    <li>Item two</li>
</ul>
```

### 1.3.2 Meaningful Sequence

Reading order must be logical when CSS is disabled.

```html
<!-- DOM order should match visual order -->
<!-- WRONG: Using CSS to reorder visually -->
<div style="display: flex; flex-direction: row-reverse;">
    <div>This appears first visually but is read last</div>
    <div>This appears second visually but is read first</div>
</div>

<!-- CORRECT: DOM order matches visual order -->
<div style="display: flex;">
    <div>First</div>
    <div>Second</div>
</div>
```

### 1.3.3 Sensory Characteristics

Don't rely solely on shape, size, position, or sound.

```html
<!-- WRONG: Position-only instruction -->
<p>Click the button on the right to continue.</p>

<!-- CORRECT: Include text reference -->
<p>Click the "Continue" button to proceed.</p>
<button>Continue</button>
```

---

## 1.4 Distinguishable

### 1.4.1 Use of Color

Color cannot be the only visual means of conveying information.

```html
<!-- WRONG: Color only -->
<span style="color: red;">Error</span>
<span style="color: green;">Success</span>

<!-- CORRECT: Color + text/icon -->
<span style="color: red;">⚠ Error: Invalid email</span>
<span style="color: green;">✓ Success: Form submitted</span>

<!-- CORRECT: Color + pattern for charts -->
<!-- Use different line styles, not just colors -->
```

### 1.4.2 Audio Control

Auto-playing audio must be controllable.

```html
<!-- WRONG: Auto-playing with no control -->
<audio autoplay src="music.mp3"></audio>

<!-- CORRECT: User-initiated or with controls -->
<audio controls src="music.mp3"></audio>
```

---

## 2.1 Keyboard Accessible

### 2.1.1 Keyboard

All functionality must be available via keyboard.

```html
<!-- Native elements are keyboard accessible -->
<button onclick="doSomething()">Click me</button>
<a href="/page">Go to page</a>
<input type="text">

<!-- Custom elements need keyboard support -->
<div role="button"
     tabindex="0"
     onclick="doSomething()"
     onkeydown="handleKeydown(event)">
    Custom button
</div>

<script>
function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        doSomething();
    }
}
</script>
```

### 2.1.2 No Keyboard Trap

Users must be able to navigate away from any component.

```html
<!-- WRONG: Keyboard trap -->
<div onkeydown="event.preventDefault()">
    <!-- User cannot Tab out -->
</div>

<!-- CORRECT: Standard Tab navigation works -->
<div>
    <input type="text">
    <button>Submit</button>
</div>
<!-- Tab moves to next element outside this div -->
```

---

## 2.2 Enough Time

### 2.2.1 Timing Adjustable

If there's a time limit, users must be able to adjust it.

```javascript
// CORRECT: Warn before timeout, allow extension
let timeLeft = 300; // 5 minutes

function warnTimeout() {
    if (timeLeft === 60) {
        const extend = confirm("Session expires in 1 minute. Extend?");
        if (extend) {
            timeLeft = 300;
        }
    }
}
```

### 2.2.2 Pause, Stop, Hide

Moving/auto-updating content must be controllable.

```html
<!-- CORRECT: Pause button for carousel -->
<div class="carousel">
    <button onclick="pauseCarousel()">Pause</button>
    <!-- slides -->
</div>

<!-- CORRECT: Pause for auto-updating content -->
<div class="live-feed">
    <button onclick="toggleUpdates()">Pause updates</button>
    <!-- content -->
</div>
```

---

## 2.3 Seizures

### 2.3.1 Three Flashes or Below

No content flashes more than 3 times per second.

```css
/* WRONG: Rapid flashing */
@keyframes flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
.flash {
    animation: flash 0.2s infinite; /* 5 flashes/second - DANGEROUS */
}

/* CORRECT: Slow, gentle animation */
.pulse {
    animation: pulse 2s infinite; /* Safe */
}
```

---

## 2.4 Navigable

### 2.4.1 Bypass Blocks

Provide a way to skip repeated content.

```html
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header><!-- repeated on every page --></header>
    <nav><!-- repeated on every page --></nav>
    <main id="main-content">
        <!-- unique page content -->
    </main>
</body>

<style>
.skip-link {
    position: absolute;
    left: -9999px;
}
.skip-link:focus {
    left: 0;
    top: 0;
    z-index: 9999;
    background: #000;
    color: #fff;
    padding: 1rem;
}
</style>
```

### 2.4.2 Page Titled

Pages must have descriptive titles.

```html
<!-- CORRECT: Descriptive, unique titles -->
<title>Dashboard - My Application</title>
<title>Edit Profile - My Application</title>
<title>Search Results for "sensors" - My Application</title>

<!-- WRONG: Generic or missing -->
<title>Page</title>
<title>My Application</title>
```

### 2.4.3 Focus Order

Focus order must be logical and meaningful.

```html
<!-- DOM order determines focus order -->
<!-- Make sure it matches visual reading order -->

<form>
    <label for="name">Name</label>
    <input id="name">

    <label for="email">Email</label>
    <input id="email">

    <button type="submit">Submit</button>
</form>
```

### 2.4.4 Link Purpose (In Context)

Link purpose must be determinable.

```html
<!-- CORRECT: Descriptive link text -->
<a href="/report.pdf">Download Q4 Sales Report (PDF, 2MB)</a>
<a href="/settings">Account Settings</a>

<!-- CORRECT: Context makes it clear -->
<h2>Sensor Readings</h2>
<p>View the latest data. <a href="/sensors">View all readings</a></p>

<!-- WRONG: Unclear purpose -->
<a href="/page">Click here</a>
<a href="/report.pdf">Download</a>
```

---

## 3.1 Readable

### 3.1.1 Language of Page

Page language must be declared.

```html
<!-- CORRECT -->
<html lang="en">
<html lang="es">
<html lang="fr">

<!-- WRONG: Missing lang attribute -->
<html>
```

---

## 3.2 Predictable

### 3.2.1 On Focus

Focus must not cause unexpected context changes.

```html
<!-- WRONG: Navigates on focus -->
<input onfocus="window.location='other-page.html'">

<!-- WRONG: Opens popup on focus -->
<a href="#" onfocus="window.open('popup.html')">Link</a>
```

### 3.2.2 On Input

Input must not cause unexpected context changes.

```html
<!-- WRONG: Auto-submit on change -->
<select onchange="this.form.submit()">
    <option>Option 1</option>
    <option>Option 2</option>
</select>

<!-- CORRECT: Explicit submit -->
<select id="options">
    <option>Option 1</option>
    <option>Option 2</option>
</select>
<button type="submit">Apply</button>
```

---

## 3.3 Input Assistance

### 3.3.1 Error Identification

Errors must be identified and described in text.

```html
<!-- CORRECT: Clear error message -->
<label for="email">Email</label>
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" class="error" role="alert">
    Please enter a valid email address (e.g., name@example.com)
</p>

<!-- WRONG: No error message -->
<input type="email" style="border-color: red;">
```

### 3.3.2 Labels or Instructions

Inputs must have labels.

```html
<!-- CORRECT: Visible label -->
<label for="username">Username</label>
<input type="text" id="username">

<!-- CORRECT: aria-label for icon buttons -->
<button aria-label="Search">
    <svg><!-- search icon --></svg>
</button>

<!-- WRONG: Placeholder as only label -->
<input type="text" placeholder="Username">
```

---

## 4.1 Compatible

### 4.1.1 Parsing

HTML must be valid.

```html
<!-- CORRECT -->
<div id="unique-id">
    <p>Properly nested</p>
</div>

<!-- WRONG: Duplicate IDs -->
<div id="content">...</div>
<div id="content">...</div>

<!-- WRONG: Improper nesting -->
<p><div>Wrong</div></p>
```

### 4.1.2 Name, Role, Value

Custom components must have accessible name, role, and state.

```html
<!-- CORRECT: Custom checkbox -->
<div role="checkbox"
     aria-checked="true"
     tabindex="0"
     aria-labelledby="checkbox-label">
    ✓
</div>
<span id="checkbox-label">Accept terms</span>

<!-- BETTER: Use native elements -->
<label>
    <input type="checkbox" checked>
    Accept terms
</label>
```

---

## Checklist Summary

- [ ] All images have alt text
- [ ] Semantic HTML used
- [ ] Color is not only indicator
- [ ] All features keyboard accessible
- [ ] No keyboard traps
- [ ] No rapid flashing
- [ ] Skip link provided
- [ ] Descriptive page title
- [ ] Logical focus order
- [ ] Descriptive link text
- [ ] Page language declared
- [ ] No context change on focus/input
- [ ] Error messages provided
- [ ] All inputs labeled
- [ ] Valid HTML
