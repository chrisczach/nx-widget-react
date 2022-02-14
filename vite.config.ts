import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateConfig } from 'widget-dashboard-tools'
// https://vitejs.dev/config/
export default defineConfig(generateConfig({
  devServer: 'http://127.0.0.1:3000',
  cloudInstance: 'https://dev3.cloud.hdw.mx',
  plugins: [react()]
}))
