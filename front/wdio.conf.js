import path from 'path';

const isProd = process.env.TEST_ENV === 'production';
const targetFolder = isProd ? 'release' : 'debug';

const isWindows = process.platform === 'win32';
const binaryName = isWindows ? 'graphite.exe' : 'graphite';

export const config = {
    // Where the test specs are located
    specs: [
        './tests-e2e/auth.spec.js',
        './tests-e2e/editor.spec.js',
        './tests-e2e/encryption.spec.js'
    ],
    maxInstances: 1, // Compulsory for desktop apps

    // App capabilities
    capabilities: [{
        maxInstances: 1,
        browserName: 'wry',
        'tauri:options': {
            application: path.join(process.cwd(), `../tauri/target/${targetFolder}/${binaryName}`)
        }
    }],

    // Environment and test configurations
    logLevel: 'error',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // We use the local runner and the Mocha framework (simple and straightforward)
    services: [], // We will manage the tauri-driver through scripts to avoid port issues
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};