import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   'import.meta.env': JSON.stringify(process.env)
  // }
  // server: {
  //   https: {
  //     key: fs.readFileSync("src/assets/certs/domain.key"),
  //     cert: fs.readFileSync("src/assets/certs/domain.cert"),
  //   },
  // },
})
