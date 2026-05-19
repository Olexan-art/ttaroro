const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to Glossary
  await page.goto('http://localhost:5173/glossary');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/home/jules/verification/glossary_uk.png', fullPage: true });

  // Navigate to Readings
  await page.goto('http://localhost:5173/readings');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/home/jules/verification/readings_uk.png', fullPage: true });

  await browser.close();
  console.log("Screenshots captured.");
})();
