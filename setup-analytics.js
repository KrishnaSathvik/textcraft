#!/usr/bin/env node

/**
 * Google Analytics Setup Script
 * 
 * Helps you set up Google Analytics by updating the configuration files
 * with your Measurement ID.
 * 
 * Usage: node setup-analytics.js G-XXXXXXXXXX
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function setupAnalytics(measurementId) {
  console.log('🔧 Setting up Google Analytics...\n');

  // Validate Measurement ID format
  if (!measurementId || !measurementId.startsWith('G-') || measurementId.length !== 12) {
    console.log('❌ Invalid Measurement ID format. Should be: G-XXXXXXXXXX');
    console.log('   Example: G-ABC123DEF4');
    process.exit(1);
  }

  console.log(`📊 Using Measurement ID: ${measurementId}\n`);

  // Update analytics config
  const configPath = path.join(__dirname, 'src', 'config', 'analytics.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  configContent = configContent.replace(
    "GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX'",
    `GOOGLE_ANALYTICS_ID: '${measurementId}'`
  );
  
  fs.writeFileSync(configPath, configContent);
  console.log('✅ Updated src/config/analytics.ts');

  // Update index.html
  const indexPath = path.join(__dirname, 'index.html');
  let htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  htmlContent = htmlContent.replace(/G-XXXXXXXXXX/g, measurementId);
  
  fs.writeFileSync(indexPath, htmlContent);
  console.log('✅ Updated index.html');

  // Create .env file
  const envPath = path.join(__dirname, '.env');
  const envContent = `# Google Analytics Configuration
VITE_GA_MEASUREMENT_ID=${measurementId}
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file');

  console.log('\n🎉 Google Analytics setup complete!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run build');
  console.log('2. Run: npm run preview');
  console.log('3. Check browser console for "Google Analytics initialized"');
  console.log('4. Visit your Google Analytics dashboard to see real-time data');
  console.log('\n📚 For more help, see: GOOGLE-ANALYTICS-SETUP.md');
}

// Get Measurement ID from command line
const measurementId = process.argv[2];

if (!measurementId) {
  console.log('🔧 Google Analytics Setup Script\n');
  console.log('Usage: node setup-analytics.js G-XXXXXXXXXX');
  console.log('\nExample:');
  console.log('  node setup-analytics.js G-ABC123DEF4');
  console.log('\nTo get your Measurement ID:');
  console.log('1. Go to https://analytics.google.com/');
  console.log('2. Create a new property');
  console.log('3. Copy the Measurement ID (starts with G-)');
  process.exit(1);
}

setupAnalytics(measurementId);
