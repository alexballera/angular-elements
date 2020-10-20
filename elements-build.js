const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
    const files = [
        './dist/spa-examples/runtime.js',
        './dist/spa-examples/polyfills.js',
        './dist/spa-examples/main.js'
    ];

    await fs.ensureDir('elements');
    await concat(files, 'elements/angular-elements.js');
    await fs.copyFile(
        './dist/spa-examples/styles.css',
        'elements/styles.css'
    );
})();
