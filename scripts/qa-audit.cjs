const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log('  PASS:', message);
  } else {
    failed++;
    console.error('  FAIL:', message);
  }
}

console.log('--- PHASE 1: ASSET & BUNDLE INTEGRITY AUDIT ---');
const distHtml = fs.readFileSync('dist/index.html', 'utf8');
assert(distHtml.includes('Utkarsh City'), 'dist/index.html has title metadata');
assert(distHtml.includes('favicon.svg'), 'dist/index.html references favicon.svg');
assert(fs.existsSync('public/models/character.glb'), 'character.glb exists in public');
assert(fs.existsSync('public/models/sports_car.glb'), 'sports_car.glb exists in public');
assert(fs.existsSync('public/utkarsh_arora.jpeg'), 'utkarsh_arora.jpeg exists');
assert(fs.existsSync('public/Utkarsh_Arora_Resume.pdf'), 'Utkarsh_Arora_Resume.pdf exists');
assert(fs.existsSync('public/robots.txt'), 'robots.txt exists in public');
assert(fs.existsSync('public/sitemap.xml'), 'sitemap.xml exists in public');
assert(fs.existsSync('ATTRIBUTION.md'), 'ATTRIBUTION.md exists in root');

console.log('\n--- PHASE 4: CONTENT ACCURACY AUDIT ---');
const profileSource = fs.readFileSync('src/data/profile.ts', 'utf8');
assert(profileSource.includes('Utkarsh Arora'), 'Name is Utkarsh Arora');
assert(profileSource.includes('Galgotias College of Engineering and Technology'), 'College is Galgotias');
assert(profileSource.includes('7.3/10'), 'CGPA is 7.3/10');
assert(profileSource.includes('2028'), 'Expected graduation is 2028');
assert(profileSource.includes('arorautkarsh05@gmail.com'), 'Email is arorautkarsh05@gmail.com');
assert(profileSource.includes('https://linkedin.com/in/utkarsh-arora-9b0887336/'), 'LinkedIn URL is verified');
assert(profileSource.includes('https://github.com/arorautkarsh05-web'), 'GitHub URL is verified');

const expSource = fs.readFileSync('src/data/experience.ts', 'utf8');
assert(expSource.includes('Calendar Verification Flag'), 'Calendar verification flags preserved without silent dates modification');
assert(expSource.includes('Auspify Technologies'), 'Auspify Technologies recorded');
assert(expSource.includes('HashBit Innovations'), 'HashBit Innovations recorded');
assert(expSource.includes('DataX Web Solutions'), 'DataX Web Solutions recorded');

const projSource = fs.readFileSync('src/data/projects.ts', 'utf8');
assert(projSource.includes('https://github.com/arorautkarsh05-web/Bayora'), 'Bayora repository linked');
assert(projSource.includes('https://github.com/arorautkarsh05-web/Ustaad'), 'Ustaad repository linked');
assert(projSource.includes('https://github.com/arorautkarsh05-web/PayPal-Resolve'), 'PayPal-Resolve repository linked');
assert(projSource.includes('https://github.com/arorautkarsh05-web/WebGuard-AI'), 'WebGuard-AI repository linked');

console.log('\n--- PHASE 8 & 9: SECURITY & SEO AUDIT ---');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('og:title'), 'Open Graph og:title present');
assert(indexHtml.includes('og:image'), 'Open Graph og:image present');
assert(indexHtml.includes('twitter:card'), 'Twitter card present');
assert(indexHtml.includes('canonical'), 'Canonical link tag present');

// Scan all source files for secret leaks or missing noopener
const srcFiles = [];
function getFiles(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) getFiles(full);
    else if (/\.(tsx?|jsx?)$/.test(item.name)) srcFiles.push(full);
  }
}
getFiles('src');

let missingRelCount = 0;
let secretPatternCount = 0;
const secretRegex = /(api[_-]?key|secret[_-]?token|private[_-]?key)\s*[:=]\s*['\"][a-zA-Z0-9_\-]{16,}['\"]/i;

for (const f of srcFiles) {
  const content = fs.readFileSync(f, 'utf8');
  if (secretRegex.test(content)) secretPatternCount++;

  const regex = /<a[^>]+target=['"]_blank['"][^>]*>/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    if (!m[0].includes('rel=') || !m[0].includes('noopener')) {
      console.warn('Missing noopener in:', f, m[0]);
      missingRelCount++;
    }
  }
}

assert(missingRelCount === 0, 'All target=_blank links include rel=noopener noreferrer');
assert(secretPatternCount === 0, 'No exposed API keys or private secrets in source code');

console.log('\n=============================================');
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('=============================================');
if (failed > 0) process.exit(1);
