import * as child from 'node:child_process';
export const gitBranch = child
  .execSync('git branch --show-current')
  .toString()
  .trim();
export const gitHash = child
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();
export const buildTime = new Date().toISOString().replace(/T/, ' ');
