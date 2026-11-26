import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import kycSubmitHandler from "./api/kyc-submit";
import voiceNormalizeHandler from "./api/voice-normalize";
import publicAuditHandler from "./api/public-audit";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/kyc-submit", kycSubmitHandler);
  app.post("/api/voice-normalize", voiceNormalizeHandler);
  app.post("/api/public-audit", publicAuditHandler);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve static assets from public folder
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
