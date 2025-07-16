# DocSum - Document Summarization Application

## Overview

DocSum is a full-stack document summarization application that allows users to upload PDF and HWP files and get AI-powered summaries. The application provides both basic and detailed summarization modes, with a clean, responsive interface for managing document summaries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: PostgreSQL-based session store

### UI Component System
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Theme**: New York style with neutral base colors
- **Responsive Design**: Mobile-first approach with breakpoint utilities

## Key Components

### Database Schema
- **Users Table**: Stores user profile information from Replit Auth
- **Sessions Table**: Handles session persistence for authentication
- **Summaries Table**: Stores document summaries with metadata

### File Processing
- **PDF Processing**: Uses pdf.js-extract for text extraction
- **HWP Support**: Basic HWP file handling (implementation may need completion)
- **File Validation**: 10MB size limit, type validation for security

### AI Integration
- **OpenAI Integration**: Uses GPT-4o for document summarization
- **Summarization Modes**: Basic (500 tokens) and detailed (1500 tokens)
- **Korean Language Support**: Optimized for Korean text processing

### Authentication System
- **Replit Auth**: Integrated OpenID Connect authentication
- **Session Management**: Secure session handling with PostgreSQL storage
- **User Management**: Automatic user creation and profile management

## Data Flow

1. **User Authentication**: Users authenticate via Replit Auth
2. **File Upload**: Users upload PDF/HWP files through drag-and-drop interface
3. **File Processing**: Server extracts text content from uploaded files
4. **AI Summarization**: OpenAI API generates summaries based on selected mode
5. **Data Persistence**: Summaries and metadata stored in PostgreSQL
6. **Real-time Updates**: React Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **AI Service**: OpenAI API for text summarization
- **Authentication**: Replit Auth service
- **File Processing**: pdf.js-extract library

### Development Tools
- **Build**: Vite with React plugin
- **Database Migration**: Drizzle Kit for schema management
- **Type Safety**: TypeScript across full stack
- **Code Quality**: ESLint configuration

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Connected to Neon Database instance
- **Environment**: Development mode with debugging tools

### Production
- **Build Process**: Vite builds frontend, esbuild bundles backend
- **Server**: Express.js serving static files and API routes
- **Database**: Production PostgreSQL on Neon
- **Session Storage**: PostgreSQL-based session persistence

### Configuration
- **Environment Variables**: DATABASE_URL, OPENAI_API_KEY, SESSION_SECRET
- **Replit Integration**: Cartographer plugin for development environment
- **Security**: HTTPS enforcement, secure session cookies

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and scalable database design. The choice of Neon Database provides serverless scaling, while Drizzle ORM ensures type-safe database operations. The React Query integration provides efficient state management and caching for optimal user experience.