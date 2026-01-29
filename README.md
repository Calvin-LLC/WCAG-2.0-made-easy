# WCAG 2.0 Made Easy
A comprehensive Claude Code setup to make sure your web applications are accessible for all. I was inspired to make this after taking Derek Featherstone's linkedin course, "Accessibility for Web Design", and recently seeing "https://github.com/affaan-m/everything-claude-code" by Affaan Mustafa.
 

- **Accessibility rules** - Claude Code enforces WCAG 2.0 compliance
- **Review agents** - AI-powered accessibility auditing
- **Checklists** - Quick reference for developers
- **Code patterns** - Copy-paste accessible code examples
- **Tests** - Automated accessibility testing


## Quick Start

### Option 1: Copy to Your Project

```bash
# Copy the .claude folder to your project
cp -r WCAG-2.0-made-easy/.claude your-project/
```

### Option 2: Reference as Guide

Use the checklists and patterns as reference while coding.

---

# WCAG 2.0 Quick Reference

## The Four Principles (POUR)

| Principle | Meaning | Key Requirements |
|-----------|---------|------------------|
| **Perceivable** | Users can perceive content | Alt text, captions, contrast |
| **Operable** | Users can operate UI | Keyboard access, no traps, enough time |
| **Understandable** | Users can understand | Clear language, predictable, error help |
| **Robust** | Works with assistive tech | Valid HTML, ARIA when needed |

## Testing Your Site

### Keyboard Testing
1. Unplug your mouse
2. Press Tab to navigate - can you reach everything?
3. Can you see where focus is?
4. Can you activate buttons with Enter/Space?
5. Can you escape from modals with Escape?
6. Are there any keyboard traps?

### Screen Reader Testing
- **Windows**: NVDA (free) or JAWS
- **Mac**: VoiceOver (built-in, Cmd+F5)
- **Mobile**: TalkBack (Android) / VoiceOver (iOS)

### Automated Testing
```bash
# Run the included tests
cd .claude/tests
node accessibility-tests.js
```

### Browser Extensions
- axe DevTools
- WAVE
- Lighthouse (built into Chrome)

---

## Files Included

```
WCAG-2.0-made-easy/
├── README.md                          # This file
├── .claude/
│   ├── agents/
│   │   └── accessibility-reviewer.md  # AI accessibility auditor
│   ├── rules/
│   │   ├── wcag-level-a.md           # Level A requirements
│   │   ├── wcag-level-aa.md          # Level AA requirements
│   │   └── accessibility-patterns.md  # Code patterns
│   ├── skills/
│   │   └── accessibility-patterns/    # Reusable patterns
│   ├── checklists/
│   │   ├── developer-checklist.md    # Before committing
│   │   ├── design-checklist.md       # During design
│   │   └── testing-checklist.md      # QA testing
│   └── tests/
│       └── accessibility-tests.js     # Automated tests
```

---

## Resources

- [WCAG 2.0 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0)
- [WebAIM](https://webaim.org/)
- [A11Y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

---

## License

MIT - Use freely in any project.
