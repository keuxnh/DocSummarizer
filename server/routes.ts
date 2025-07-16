import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertSummarySchema } from "@shared/schema";
import { summarizeDocument } from "./services/gemini";
import { processFile } from "./services/fileProcessor";
import multer from "multer";
import { z } from "zod";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.hwp')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and HWP files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

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

  app.get('/api/summaries/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const summaryId = parseInt(req.params.id);
      const summary = await storage.getSummary(summaryId, userId);
      
      if (!summary) {
        return res.status(404).json({ message: "Summary not found" });
      }
      
      res.json(summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      res.status(500).json({ message: "Failed to fetch summary" });
    }
  });

  app.post('/api/summaries', isAuthenticated, upload.single('file'), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { summaryMode } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      if (!summaryMode || !['basic', 'detailed'].includes(summaryMode)) {
        return res.status(400).json({ message: "Invalid summary mode" });
      }

      // Process file to extract text
      const { text, title } = await processFile(file);

      // Generate summary using OpenAI
      const summaryContent = await summarizeDocument(text, summaryMode);

      // Save to database
      const summaryData = {
        userId,
        title,
        filename: file.originalname,
        fileType: file.originalname.endsWith('.pdf') ? 'pdf' : 'hwp',
        summaryMode,
        originalContent: text,
        summaryContent,
      };

      const validatedData = insertSummarySchema.parse(summaryData);
      const summary = await storage.createSummary(validatedData);

      res.json(summary);
    } catch (error) {
      console.error("Error creating summary:", error);
      res.status(500).json({ message: "Failed to create summary", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.delete('/api/summaries/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const summaryId = parseInt(req.params.id);
      
      await storage.deleteSummary(summaryId, userId);
      res.json({ message: "Summary deleted successfully" });
    } catch (error) {
      console.error("Error deleting summary:", error);
      res.status(500).json({ message: "Failed to delete summary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
