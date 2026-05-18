import concurrently from 'concurrently';
import path from 'path';
import fs from 'fs';
import os from 'os';

const isWindows = process.platform === 'win32';
const driverPath = path.resolve('./msedgedriver.exe');

const appIdentifier = 'com.graphite.app';

const tauriAppDataPath = isWindows
    ? path.join(process.env.APPDATA, appIdentifier)
    : path.join(os.homedir(), 'Library', 'Application Support', appIdentifier);

console.log(`[E2E] Getting environment: ${isWindows ? 'Windows' : 'macOS/Linux'}`);

if (fs.existsSync(tauriAppDataPath)) {
    try {
        fs.rmSync(tauriAppDataPath, { recursive: true, force: true });
        console.log(`[E2E] Success: Previous data deleted in: ${tauriAppDataPath}`);
    } catch (err) {
        console.log(`[E2E] Warning: Could not delete data folder (may be locked): ${err.message}`);
    }
} else {
    console.log('[E2E] No previous local data detected. The environment is already clean.');
}

const driverCommand = isWindows
    ? `tauri-driver --port 4444 --native-driver "${driverPath}"`
    : 'tauri-driver --port 4444';

console.log(`[E2E] Launching tauri-driver and WebDriverIO`);

const { result } = concurrently([
    { command: driverCommand, name: 'tauri-driver', prefixColor: 'blue' },
    { command: 'node -e "setTimeout(() => {}, 3000)" && wdio run wdio.conf.js --port 4444', name: 'webdriverio', prefixColor: 'green' }
], {
    killOthersOn: ['failure', 'success'],
});

result.catch((err) => {
    process.exit(1);
});