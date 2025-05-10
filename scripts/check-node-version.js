#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const semver = require('semver');

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get required Node.js version
const requiredVersion = packageJson.engines.node;

// Check current version
const currentVersion = process.version;

if (!semver.satisfies(currentVersion, requiredVersion)) {
  console.error('\u001B[31m%s\u001B[0m', 'Error: Node.js version mismatch');
  console.error(
    '\u001B[33m%s\u001B[0m',
    `You are using Node.js ${currentVersion}`
  );
  console.error(
    '\u001B[33m%s\u001B[0m',
    `This project requires Node.js ${requiredVersion}`
  );
  console.error(
    '\u001B[36m%s\u001B[0m',
    'Please use nvm to install the correct version:'
  );
  console.error('\u001B[36m%s\u001B[0m', '  nvm install 22');
  console.error('\u001B[36m%s\u001B[0m', '  nvm use 22');
  process.exit(1);
}

console.log(
  '\u001B[32m%s\u001B[0m',
  `Using correct Node.js version: ${currentVersion}`
);
