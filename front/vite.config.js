import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 1420,      // Force port 1420
    strictPort: true, // If port is being used fail instead of changing port
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    // Sonarqube configuration
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './test-report.xml', // Execution report
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'], // 'lcov' format for sonarqube
      reportsDirectory: './coverage',
    },
  }
})
