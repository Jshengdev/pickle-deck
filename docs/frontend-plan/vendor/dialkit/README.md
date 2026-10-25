# DialKit 2.0.2 (vendored, vanilla build)
Live controls for tuning an interface by feel. Josh Puckett, MIT (LICENSE here). https://www.dialkit.dev · github.com/joshpuckett/dialkit
Copied from the npm package `dialkit@2.0.2` (`dist/vanilla/browser.global.js` + `styles.css`) on 2026-10-02. Works offline, no bundler.

    <link rel="stylesheet" href="vendor/dialkit/styles.css">
    <script src="vendor/dialkit/browser.global.js"></script>
    <script>
      const root = DialKit.createDialRoot();
      const kit = DialKit.createDialKit("Card", { radius: [24, 0, 64] });   // [default, min, max, step?]
      kit.subscribe(v => card.style.borderRadius = v.radius + "px");          // runs now and on every change
    </script>

Controls: slider tuple, toggle (bool), text, color, select, image, pad, spring/easing, action, folder (nested object).
Options: { persist, defaultCollapsed, onAction, shortcuts }. Vanilla roots show by default; createDialRoot({ productionEnabled: false }) hides.
For pages that export (PDF via headless Chrome), save the values into the page's own data file, not localStorage, so the export matches.
Projects copy this folder next to their page (servers only serve their own folder). npm projects: `npm i dialkit motion`.
