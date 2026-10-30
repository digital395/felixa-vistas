# Felixa Vistas Express backend

## 1. Copy the files
Copy `server/server.js` into your existing `C:\www\felixa-vistas\server\server.js`.

Create `C:\www\felixa-vistas\server\.env` using `.env.example` as a template.
Set a valid Sell.Do API key in that local `.env` file. Do not put the key in React code or commit `.env` to Git.

## 2. Install backend packages
Run these commands from the project root (`C:\www\felixa-vistas`):

```powershell
npm install express dotenv express-rate-limit
```

If `package.json` does not already contain `"type": "module"`, add it at the top level. Vite projects often already use ES modules; verify before adding a duplicate.

## 3. Add a backend script
In the existing `package.json`, add this entry under `scripts` without deleting existing scripts:

```json
"server": "node server/server.js"
```

Example scripts section (keep your existing scripts too):

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "server": "node server/server.js"
}
```

## 4. Configure the Vite proxy
Merge this `server.proxy` entry into the existing `vite.config.js`. Do not overwrite other Vite configuration or plugins.

```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:5001",
      changeOrigin: true,
    },
  },
},
```

For example, if your current file uses `defineConfig`, the shape may be:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
});
```

## 5. Frontend request
In `src/components/SiteVisit.jsx`, keep the request same-origin:

```js
const response = await fetch("/api/site-visit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

## 6. Start both processes
Use two terminals in VS Code, both at `C:\www\felixa-vistas`.

Terminal 1:
```powershell
npm run server
```

Terminal 2:
```powershell
npm run dev
```

Check `http://localhost:5001/api/health` and confirm it returns JSON showing the API is running. Then test the form once and inspect the backend terminal.

Important: this code deliberately does not treat HTTP 200 alone as confirmed lead creation. The legacy Sell.Do response schema must be confirmed. Check the CRM for the test lead before submitting again to avoid duplicates.
