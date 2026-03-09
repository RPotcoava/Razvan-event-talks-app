const fs = require('fs');
const path = require('path');

const srcDir = 'src';
const buildDir = '.';

const talksData = fs.readFileSync(path.join(srcDir, 'talks.json'), 'utf8');
const indexHtml = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
let scriptJs = fs.readFileSync(path.join(srcDir, 'script.js'), 'utf8');

// Inject data and code into the script
scriptJs = scriptJs.replace('%%TALKS_DATA%%', talksData);

// Inject styles and script into the HTML
let finalHtml = indexHtml.replace('</head>', `<style>${stylesCss}</style></head>`);
finalHtml = finalHtml.replace('</body>', `<script>${scriptJs}</script></body>`);

fs.writeFileSync(path.join(buildDir, 'index.html'), finalHtml);

console.log('Build complete: index.html has been generated.');
