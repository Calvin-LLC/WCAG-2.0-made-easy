# WCAG 2.0 Made Easy

## Project Overview

A comprehensive, ready-to-use accessibility toolkit for WCAG 2.0 Level A and AA compliance. Drop the `.claude` folder into any web project.

## Quick Start

```bash
# Copy to your project
cp -r WCAG-2.0-made-easy/.claude your-project/
```

## What's Included

### Rules (Claude Code will enforce these)
- **wcag-level-a.md** - Minimum accessibility (CRITICAL)
- **wcag-level-aa.md** - Standard accessibility (TARGET)
- **accessibility-patterns.md** - Code patterns to follow/avoid

### Agent
- **accessibility-reviewer** - WCAG 2.0 specialist that reviews HTML, CSS, JS

### Checklists
- **developer-checklist.md** - Before every commit
- **design-checklist.md** - During design phase
- **testing-checklist.md** - QA accessibility testing

### Skills
- **accessibility-patterns** - Reusable accessible code patterns

### Tests
- **accessibility-tests.js** - Automated testing with axe-core

## Key Requirements

### Level A (Minimum - Must Do)
- All images have alt text
- All inputs have labels
- All functionality keyboard accessible
- No keyboard traps
- Page language declared
- Descriptive page titles

### Level AA (Standard - Should Do)
- Color contrast 4.5:1 (text) / 3:1 (large text, UI)
- Text resizable to 200%
- Focus always visible
- Multiple navigation methods
- Error suggestions provided

### Additional Best Practices
- Touch targets: 48x48px minimum
- Touch spacing: 8px minimum
- Reduced motion: Respect prefers-reduced-motion
- Units: Use rem/em, not fixed px
- Input detection: Don't assume touch from viewport

## WCAG Principles (POUR)

| Principle | User Need | Key Requirements |
|-----------|-----------|------------------|
| **Perceivable** | Can perceive content | Alt text, captions, contrast |
| **Operable** | Can operate UI | Keyboard access, no traps |
| **Understandable** | Can understand | Clear language, predictable |
| **Robust** | Works with AT | Valid HTML, ARIA |

## Running Tests

```bash
cd .claude/tests
npm install
node accessibility-tests.js http://your-site.com
```

## Manual Testing

### Keyboard Test
1. Tab through entire page
2. Verify focus is visible
3. Verify no traps (can always Tab away)
4. Test Enter/Space on buttons
5. Test Escape on modals

### Screen Reader Test
- **Mac**: VoiceOver (Cmd + F5)
- **Windows**: NVDA (free)

### Browser Tools
- Lighthouse (Chrome DevTools)
- axe DevTools extension
- WAVE extension

## Resources

- [WCAG 2.0 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0)
- [WebAIM](https://webaim.org/)
- [A11Y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## License

MIT - Use freely in any project.
