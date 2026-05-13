import { defineConfig }
from "vite"

import react
from "@vitejs/plugin-react"

import tailwindcss
from "@tailwindcss/vite"

export default defineConfig({

  plugins: [

    react(),

    tailwindcss()

  ],

  server: {

    proxy: {

      // BACKEND
      "/api": {

        target:
          "http://localhost:5000",

        changeOrigin: true

      },

      // CODEFORCES DIRECT
      "/cfapi": {

        target:
          "https://codeforces.com",

        changeOrigin: true,

        secure: true,

        rewrite: (path) =>

          path.replace(
            /^\/cfapi/,
            "/api"
          )

      }

    }

  }

})