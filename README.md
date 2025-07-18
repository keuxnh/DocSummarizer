# DocSum - AI Document Summarization

DocSum is a full-stack web application that provides AI-powered document summarization for PDF and HWP files. Built with React, Node.js, and Google Gemini AI.

## Features

- 🤖 AI-powered document summarization using Google Gemini
- 📄 Support for PDF and HWP file formats
- 🔐 User authentication with Replit Auth
- 📚 Summary history and management
- 🎨 GitHub-style dark theme UI
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS + shadcn/ui
- Wouter for routing
- TanStack Query for state management

### Backend
- Node.js with Express
- PostgreSQL with Drizzle ORM
- Google Gemini AI API
- Replit Auth for authentication

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google Gemini API key

### Environment Variables
Copy `.env.example` to `.env` and fill in your values:

```bash
DATABASE_URL=your_postgresql_database_url
GEMINI_API_KEY=your_gemini_api_key
SESSION_SECRET=your_session_secret
REPL_ID=your_repl_id
REPLIT_DOMAINS=your_replit_domain
```

### Installation
```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## Deployment

### Vercel Deployment

1. **Fork this repository**

2. **Connect to Vercel**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect the configuration

3. **Environment Variables**
   Set up these environment variables in your Vercel project settings:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `GEMINI_API_KEY` - Your Google Gemini API key
   - `SESSION_SECRET` - A secure random string for sessions
   - `REPL_ID` - Your Replit project ID (if using Replit Auth)
   - `REPLIT_DOMAINS` - Your Vercel domain

4. **Deploy**
   - Push to your main branch
   - Vercel will automatically build and deploy

### Database Setup

For production, you'll need a PostgreSQL database. We recommend:
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Supabase](https://supabase.com/) - Full-stack platform
- [PlanetScale](https://planetscale.com/) - MySQL alternative

Run the database migrations:
```bash
npm run db:push
```

## File Structure

```
├── api/                 # Vercel serverless functions
│   ├── index.ts        # Main API handler
│   ├── auth.ts         # Authentication logic
│   ├── db.ts           # Database connection
│   ├── storage.ts      # Database operations
│   ├── gemini.ts       # AI summarization
│   └── schema.ts       # Database schema
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/     # Page components
│   │   ├── hooks/     # Custom hooks
│   │   └── lib/       # Utilities
│   └── dist/          # Built frontend (generated)
├── vercel.json        # Vercel configuration
└── README.md         # This file
```

## Features in Detail

### Document Processing
- **PDF Support**: Extract text from PDF files using pdf.js-extract
- **HWP Support**: Basic HWP file handling (Korean word processor)
- **File Size Limit**: 10MB maximum file size
- **Security**: File type validation and sanitization

### AI Summarization
- **Basic Mode**: Concise summaries (500 tokens)
- **Detailed Mode**: Comprehensive summaries (1500 tokens)
- **Korean Language**: Optimized for Korean text processing
- **Error Handling**: Robust error handling for API failures

### User Management
- **Authentication**: Secure login with Replit Auth
- **Session Management**: PostgreSQL-based session storage
- **User Profiles**: Automatic user creation and profile management
- **History**: Personal summary history for each user

### UI/UX
- **Dark Theme**: GitHub-style dark theme throughout
- **Responsive**: Mobile-first responsive design
- **File Upload**: Drag-and-drop file upload interface
- **Loading States**: Smooth loading animations and states

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `GET /api/login` - Login with Replit Auth
- `GET /api/logout` - Logout user

### Summaries
- `GET /api/summaries` - Get user's summaries
- `POST /api/summaries` - Create new summary
- `GET /api/summaries/:id` - Get specific summary
- `DELETE /api/summaries/:id` - Delete summary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.