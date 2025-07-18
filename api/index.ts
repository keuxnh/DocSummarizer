import express from "express";
import { createServer } from "http";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { setupAuth, isAuthenticated } from "./auth";
import { storage } from "./storage";
import { processFile } from "./fileProcessor";
import { summarizeDocument } from "./gemini";
import { db } from "./db";
import * as schema from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for Vercel
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Setup authentication
await setupAuth(app);

// Static file serving for production
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDistPath));
}

// Auth routes
app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const user = await storage.getUser(userId);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Summary routes
app.get('/api/summaries', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const summaries = await storage.getUserSummaries(userId);
    res.json(summaries);
  } catch (error) {
    console.error("Error fetching summaries:", error);
    res.status(500).json({ message: "Failed to fetch summaries" });
  }
});

app.post('/api/summaries', isAuthenticated, upload.single('file'), async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const { summaryMode } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (req.file.size > 10 * 1024 * 1024) { // 10MB limit
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    }

    // Process the file
    const { text, title } = await processFile(req.file);
    
    // Generate summary
    const summaryContent = await summarizeDocument(text, summaryMode);
    
    // Save to database
    const summary = await storage.createSummary({
      userId,
      title,
      filename: req.file.originalname,
      fileType: req.file.originalname.endsWith('.pdf') ? 'pdf' : 'hwp',
      summaryMode,
      summaryContent,
      originalText: text.substring(0, 1000) // Store first 1000 chars
    });

    res.json(summary);
  } catch (error) {
    console.error('Error creating summary:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to create summary' 
    });
  }
});

app.get('/api/summaries/:id', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const { id } = req.params;
    
    const summary = await storage.getSummary(parseInt(id), userId);
    if (!summary) {
      return res.status(404).json({ message: 'Summary not found' });
    }
    
    res.json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
});

app.delete('/api/summaries/:id', isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const { id } = req.params;
    
    await storage.deleteSummary(parseInt(id), userId);
    res.json({ message: 'Summary deleted successfully' });
  } catch (error) {
    console.error("Error deleting summary:", error);
    res.status(500).json({ message: "Failed to delete summary" });
  }
});

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === "production") {
    const clientDistPath = path.join(__dirname, "../client/dist");
    res.sendFile(path.join(clientDistPath, "index.html"));
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// For Vercel
export default app;

// For local development
if (process.env.NODE_ENV !== "production") {
  const server = createServer(app);
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}