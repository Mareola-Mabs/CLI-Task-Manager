
// Importing External Modules
import chalk from 'chalk' //CLI Color Module

import path from 'node:path' //File System Module


import { fileURLToPath } from 'url';

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct path to assets/task.json
const taskFilePath = path.join(__dirname, 'assets', 'tasks.json');

console.log(taskFilePath)
