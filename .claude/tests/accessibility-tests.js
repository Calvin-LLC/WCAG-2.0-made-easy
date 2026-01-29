/**
 * Accessibility Tests
 *
 * Automated accessibility testing for WCAG 2.0 compliance.
 * Run with: node accessibility-tests.js [url]
 *
 * Requirements:
 *   npm install puppeteer axe-core
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

// Check if running with puppeteer
let puppeteer, axeCore;
try {
    puppeteer = require('puppeteer');
    axeCore = require('axe-core');
} catch (e) {
    console.log('='.repeat(60));
    console.log('WCAG 2.0 Accessibility Test Suite');
    console.log('='.repeat(60));
    console.log('\nTo run automated browser tests, install dependencies:');
    console.log('  npm install puppeteer axe-core\n');
    console.log('Then run:');
    console.log('  node accessibility-tests.js http://your-site.com\n');
    console.log('-'.repeat(60));
    console.log('\nAlternatively, use these manual testing commands:\n');
    runManualTestChecklist();
    process.exit(0);
}

// WCAG 2.0 Level A and AA rules
const WCAG_RULES = {
    'level-a': [
        'image-alt',
        'label',
        'button-name',
        'link-name',
        'html-has-lang',
        'document-title',
        'bypass',
        'color-contrast',
        'duplicate-id',
        'empty-heading',
        'form-field-multiple-labels',
        'input-image-alt',
        'role-img-alt',
        'scope-attr-valid',
        'tabindex',
        'video-caption'
    ],
    'level-aa': [
        'color-contrast',
        'focus-visible',
        'heading-order',
        'landmark-one-main',
        'meta-viewport',
        'page-has-heading-one',
        'region'
    ]
};

async function runTests() {
    console.log('='.repeat(60));
    console.log('WCAG 2.0 Accessibility Test Suite');
    console.log('='.repeat(60));
    console.log(`\nTesting: ${BASE_URL}\n`);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    let totalViolations = 0;
    let totalPasses = 0;
    const results = [];

    try {
        // Navigate to page
        console.log('Loading page...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });

        // Inject axe-core
        await page.addScriptTag({ content: axeCore.source });

        // Run accessibility tests
        console.log('Running accessibility tests...\n');
        const axeResults = await page.evaluate(() => {
            return new Promise((resolve) => {
                axe.run({
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2a', 'wcag2aa', 'best-practice']
                    }
                }).then(resolve);
            });
        });

        // Process violations
        if (axeResults.violations.length > 0) {
            console.log('❌ VIOLATIONS FOUND:\n');

            axeResults.violations.forEach((violation, index) => {
                totalViolations += violation.nodes.length;

                console.log(`${index + 1}. ${violation.help}`);
                console.log(`   Rule: ${violation.id}`);
                console.log(`   Impact: ${violation.impact}`);
                console.log(`   WCAG: ${violation.tags.filter(t => t.startsWith('wcag')).join(', ')}`);
                console.log(`   Elements: ${violation.nodes.length}`);

                violation.nodes.slice(0, 3).forEach(node => {
                    console.log(`   - ${node.html.substring(0, 80)}...`);
                });

                if (violation.nodes.length > 3) {
                    console.log(`   ... and ${violation.nodes.length - 3} more`);
                }
                console.log();

                results.push({
                    type: 'violation',
                    id: violation.id,
                    impact: violation.impact,
                    description: violation.help,
                    count: violation.nodes.length
                });
            });
        }

        // Process passes
        totalPasses = axeResults.passes.length;

        // Summary
        console.log('-'.repeat(60));
        console.log('\nSUMMARY:');
        console.log(`  ✓ Passed: ${totalPasses} rules`);
        console.log(`  ✗ Failed: ${axeResults.violations.length} rules (${totalViolations} elements)`);
        console.log(`  ⊘ Incomplete: ${axeResults.incomplete.length} (need manual review)`);

        // Severity breakdown
        if (axeResults.violations.length > 0) {
            const bySeverity = {};
            axeResults.violations.forEach(v => {
                bySeverity[v.impact] = (bySeverity[v.impact] || 0) + v.nodes.length;
            });

            console.log('\n  By Severity:');
            if (bySeverity.critical) console.log(`    Critical: ${bySeverity.critical}`);
            if (bySeverity.serious) console.log(`    Serious: ${bySeverity.serious}`);
            if (bySeverity.moderate) console.log(`    Moderate: ${bySeverity.moderate}`);
            if (bySeverity.minor) console.log(`    Minor: ${bySeverity.minor}`);
        }

        // Additional checks
        console.log('\n' + '-'.repeat(60));
        console.log('\nADDITIONAL CHECKS:\n');

        // Check for focus visibility
        const focusCheck = await page.evaluate(() => {
            const styles = document.querySelectorAll('style');
            let hasBadFocus = false;
            styles.forEach(style => {
                if (style.textContent.includes(':focus') &&
                    style.textContent.includes('outline: none') &&
                    !style.textContent.includes(':focus-visible')) {
                    hasBadFocus = true;
                }
            });
            return hasBadFocus;
        });

        if (focusCheck) {
            console.log('⚠️  Warning: Found "outline: none" on :focus - ensure replacement focus style exists');
        } else {
            console.log('✓  Focus styles: No blanket outline removal detected');
        }

        // Check for touch target sizes
        const touchTargetCheck = await page.evaluate(() => {
            const clickables = document.querySelectorAll('button, a, [role="button"], input[type="submit"]');
            const small = [];
            clickables.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width < 44 || rect.height < 44) {
                    small.push({
                        tag: el.tagName,
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        text: el.textContent?.substring(0, 20) || ''
                    });
                }
            });
            return small;
        });

        if (touchTargetCheck.length > 0) {
            console.log(`⚠️  Warning: ${touchTargetCheck.length} touch targets may be too small (<44px)`);
            touchTargetCheck.slice(0, 3).forEach(el => {
                console.log(`   - ${el.tag}: ${el.width}x${el.height}px "${el.text}"`);
            });
        } else {
            console.log('✓  Touch targets: All appear to meet minimum size');
        }

        // Check for reduced motion support
        const motionCheck = await page.evaluate(() => {
            const styles = Array.from(document.styleSheets);
            let hasReducedMotion = false;
            try {
                styles.forEach(sheet => {
                    const rules = Array.from(sheet.cssRules || []);
                    rules.forEach(rule => {
                        if (rule.media && rule.media.mediaText.includes('prefers-reduced-motion')) {
                            hasReducedMotion = true;
                        }
                    });
                });
            } catch (e) {
                // Cross-origin stylesheets
            }
            return hasReducedMotion;
        });

        if (motionCheck) {
            console.log('✓  Reduced motion: prefers-reduced-motion media query found');
        } else {
            console.log('⚠️  Note: No prefers-reduced-motion media query detected');
        }

        // Check for skip link
        const skipLinkCheck = await page.evaluate(() => {
            const skipLink = document.querySelector('a[href="#main"], a[href="#main-content"], a[href="#content"], .skip-link');
            return !!skipLink;
        });

        if (skipLinkCheck) {
            console.log('✓  Skip link: Found');
        } else {
            console.log('⚠️  Warning: No skip link detected');
        }

        // Return results
        console.log('\n' + '='.repeat(60));

        if (totalViolations === 0) {
            console.log('\n✅ All automated accessibility tests passed!\n');
            console.log('Note: Automated tests catch ~30% of issues.');
            console.log('Manual testing with keyboard and screen reader is essential.\n');
            await browser.close();
            process.exit(0);
        } else {
            console.log(`\n❌ Found ${totalViolations} accessibility issues to fix.\n`);
            await browser.close();
            process.exit(1);
        }

    } catch (error) {
        console.error('Error running tests:', error.message);
        await browser.close();
        process.exit(1);
    }
}

function runManualTestChecklist() {
    console.log('MANUAL ACCESSIBILITY TESTING CHECKLIST');
    console.log('='.repeat(60));
    console.log(`
KEYBOARD TESTING:
  1. Tab through the entire page
  2. Verify focus is always visible
  3. Verify all interactive elements are reachable
  4. Verify no keyboard traps (can always Tab away)
  5. Test Enter/Space on buttons
  6. Test Escape on modals

SCREEN READER TESTING:
  - Windows: Use NVDA (free download)
  - Mac: Use VoiceOver (Cmd + F5)

  1. Navigate by headings (H key)
  2. Navigate by landmarks (D key in NVDA)
  3. Test all form fields
  4. Verify images have alt text
  5. Verify link text is descriptive

VISUAL TESTING:
  1. Zoom to 200% - verify no content loss
  2. Test color contrast (use browser extension)
  3. View in grayscale - verify nothing relies on color alone
  4. Measure touch targets (minimum 48x48px)

BROWSER TOOLS:
  - Chrome: Lighthouse (DevTools > Lighthouse)
  - axe DevTools extension
  - WAVE extension

ONLINE TOOLS:
  - https://wave.webaim.org/
  - https://webaim.org/resources/contrastchecker/
  - https://www.deque.com/axe/
`);
}

// Run tests
runTests().catch(console.error);
