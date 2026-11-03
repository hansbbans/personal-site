#!/usr/bin/env node
/**
 * Check for JavaScript console errors on the site
 */

const puppeteer = require('puppeteer');

const BASE_URL = (process.env.SITE_URL || 'https://hanscho.com').replace(/\/$/, '');
const URLS = [
  BASE_URL,
  `${BASE_URL}/food.html`,
  `${BASE_URL}/photos.html`
];

async function checkPage(url) {
  console.log(`Checking ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  const errors = [];
  const warnings = [];
  
  // Capture console messages
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    
    // Filter out common non-errors
    if (text.includes('Google Maps') || text.includes('deprecated')) return;
    // Cloudflare Web Analytics rejects non-production origins (e.g. localhost)
    const source = (msg.location && msg.location().url) || '';
    if (text.includes('cloudflareinsights') || source.includes('cloudflareinsights')) return;
    
    if (type === 'error') {
      errors.push(text);
      console.error(`  ❌ ERROR: ${text}`);
    } else if (type === 'warning') {
      warnings.push(text);
      console.log(`  ⚠️  WARNING: ${text}`);
    }
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    errors.push(error.message);
    console.error(`  ❌ PAGE ERROR: ${error.message}`);
  });
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait a bit for any delayed JS errors
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await browser.close();
    
    return { url, errors, warnings };
  } catch (err) {
    await browser.close();
    console.error(`  ❌ Failed to load ${url}: ${err.message}`);
    return { url, errors: [`Failed to load: ${err.message}`], warnings };
  }
}

async function main() {
  console.log('🔍 Checking for console errors...\n');
  
  let hasErrors = false;
  const allResults = [];
  
  for (const url of URLS) {
    const result = await checkPage(url);
    allResults.push(result);
    
    if (result.errors.length > 0) {
      hasErrors = true;
    }
    
    console.log(`  Found ${result.errors.length} errors, ${result.warnings.length} warnings\n`);
  }
  
  // Summary
  console.log('📊 Summary:');
  console.log(`  Total errors: ${allResults.reduce((sum, r) => sum + r.errors.length, 0)}`);
  console.log(`  Total warnings: ${allResults.reduce((sum, r) => sum + r.warnings.length, 0)}`);
  
  if (hasErrors) {
    console.log('\n❌ Console errors detected!');
    process.exit(1);
  } else {
    console.log('\n✅ No console errors found!');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
