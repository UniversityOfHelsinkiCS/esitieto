import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config();

const inDeployment = process.env.DEPLOYMENT === 'true'
const devPort = process.env.VITE_DEV_PORT ? parseInt(process.env.VITE_DEV_PORT, 10) : 3001;
console.log('VITE_DEV_PORT:', devPort);

// List of environment variables to exclude
const excludeEnvVars = [
  'ProgramFiles(x86)',
  'CommonProgramFiles(x86)',
];

// Filter the environment variables to exclude the problematic ones
const filteredEnv = Object.keys(process.env).reduce((env, key) => {
  if (!excludeEnvVars.includes(key)) {
    env[key] = process.env[key];
  }
  return env;
}, {});


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin(filteredEnv)],
  base: inDeployment ? '/esitieto' : '/',
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: devPort || 3001,
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    }
  }
})