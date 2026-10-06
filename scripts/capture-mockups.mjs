import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

const BASE_URL = 'http://localhost:3005';
const MOCKUP_DIR = path.resolve(process.cwd(), 'mockups');
const MARKETING_DIR = path.join(MOCKUP_DIR, 'marketing');
const DASHBOARD_DIR = path.join(MOCKUP_DIR, 'dashboard');

fs.mkdirSync(MARKETING_DIR, { recursive: true });
fs.mkdirSync(DASHBOARD_DIR, { recursive: true });

const tasks = [
  // Marketing
  { name: '01-landing-hero.png', dir: MARKETING_DIR, url: '/', width: 1920, height: 1080, fullPage: false },
  { name: '02-landing-fullpage.png', dir: MARKETING_DIR, url: '/', width: 1440, height: 900, fullPage: true },
  { name: '03-product-overview.png', dir: MARKETING_DIR, url: '/product', width: 1920, height: 1080, fullPage: false },
  { name: '04-product-fullpage.png', dir: MARKETING_DIR, url: '/product', width: 1440, height: 900, fullPage: true },
  { name: '05-solutions-enterprise.png', dir: MARKETING_DIR, url: '/solutions', width: 1920, height: 1080, fullPage: false },
  { name: '06-pricing-tiers.png', dir: MARKETING_DIR, url: '/pricing', width: 1920, height: 1080, fullPage: false },
  { name: '07-interactive-demo.png', dir: MARKETING_DIR, url: '/demo', width: 1920, height: 1080, fullPage: false },
  { name: '08-mobile-landing.png', dir: MARKETING_DIR, url: '/', width: 390, height: 844, fullPage: false, isMobile: true },

  // Dashboard
  { name: '01-dashboard-overview.png', dir: DASHBOARD_DIR, url: '/dashboard', width: 1920, height: 1080, fullPage: false },
  { name: '02-dashboard-agents-fleet.png', dir: DASHBOARD_DIR, url: '/dashboard/agents', width: 1920, height: 1080, fullPage: false },
  { name: '03-agent-observability-detail.png', dir: DASHBOARD_DIR, url: '/dashboard/agents/agent-1', width: 1920, height: 1080, fullPage: false },
  { name: '04-agent-activity-timeline.png', dir: DASHBOARD_DIR, url: '/dashboard/agents/agent-1/activity', width: 1920, height: 1080, fullPage: false },
  { name: '05-live-activity-feed.png', dir: DASHBOARD_DIR, url: '/dashboard/activity', width: 1920, height: 1080, fullPage: false },
  { name: '06-insights-recommendations.png', dir: DASHBOARD_DIR, url: '/dashboard/insights', width: 1920, height: 1080, fullPage: false },
  { name: '07-knowledge-vault.png', dir: DASHBOARD_DIR, url: '/dashboard/knowledge', width: 1920, height: 1080, fullPage: false },
  { name: '08-tasks-execution.png', dir: DASHBOARD_DIR, url: '/dashboard/tasks', width: 1920, height: 1080, fullPage: false },
  { name: '09-dashboard-mobile.png', dir: DASHBOARD_DIR, url: '/dashboard', width: 390, height: 844, fullPage: false, isMobile: true }
];

async function captureAll() {
  console.log('Launching browser with Edge:', EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();

  for (const task of tasks) {
    const dest = path.join(task.dir, task.name);
    console.log(`Capturing [${task.url}] -> ${task.name}...`);

    await page.setViewport({
      width: task.width,
      height: task.height,
      deviceScaleFactor: 2, // 2x Retina quality
      isMobile: !!task.isMobile,
      hasTouch: !!task.isMobile
    });

    try {
      await page.goto(`${BASE_URL}${task.url}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Small pause for GSAP/CSS animations to settle
      await new Promise(r => setTimeout(r, 1200));

      await page.screenshot({
        path: dest,
        fullPage: task.fullPage
      });
      console.log(`  ✓ Saved: ${task.name}`);
    } catch (err) {
      console.error(`  ✗ Error on ${task.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('All mockups captured successfully!');
}

captureAll().catch(console.error);
