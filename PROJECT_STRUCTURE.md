# D & H Creatives - Full Stack Project Structure

## 📁 Project Organization

Your project is now organized into **separate Frontend and Backend folders**:

```
d-h-creatives/
├── frontend/                    # React Frontend Application
│   ├── src/                     # Source code
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── api/                 # API service files
│   │   ├── context/             # React context
│   │   ├── utils/               # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── public/                  # Static assets & HTML
│   ├── build/                   # Production build
│   ├── package.json             # Frontend dependencies
│   ├── .env.example             # Frontend environment variables
│   └── README.md
│
├── backend/                     # Express Backend API
│   ├── src/
│   │   ├── routes/              # API route handlers
│   │   ├── controllers/         # Business logic
│   │   ├── models/              # MongoDB schemas
│   │   ├── middleware/          # Auth, error handling, etc
│   │   ├── config/              # Database & config
│   │   ├── utils/               # Helper functions
│   │   └── server.js            # Express app entry
│   ├── package.json             # Backend dependencies
│   ├── .env.example             # Backend environment variables
│   ├── .gitignore
│   └── README.md
│
├── .git/                        # Git repository
├── PROJECT_STRUCTURE.md         # This file
└── Original-README.md           # Original project README
```

## 🚀 Running the Project

### Option 1: Run Frontend Only (for testing UI)
```bash
cd frontend
npm install
npm start
```
- Frontend: http://localhost:3000
- Will use localStorage for demo data

### Option 2: Run Both Frontend and Backend
**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
npm start
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📦 Frontend Stack

- **React 18** - UI framework
- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - API client
- **react-icons** - Icons
- **CSS3** - Styling with gradients and animations

**Key Folders:**
- `src/components/` - Reusable UI components
- `src/pages/` - Full page components
- `src/api/` - API service files (authService, dataService, client)
- `src/context/` - React context for auth
- `src/utils/` - Helper functions (appStore, etc)

## 🔧 Backend Stack

- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing
- **Razorpay** - Payment processing

**Key Folders:**
- `src/routes/` - API route definitions (to be created)
- `src/controllers/` - Business logic handlers (to be created)
- `src/models/` - MongoDB schemas (to be created)
- `src/middleware/` - Auth middleware
- `src/config/` - Database configuration
- `src/utils/` - Helper utilities

## 🔌 API Integration

Frontend currently uses:
1. **localStorage** - Local data storage for demo
2. **Zustand Store** - State management in `src/utils/appStore.js`
3. **Axios Client** - Ready in `src/api/client.js` with endpoints configured

Backend endpoints to be implemented:
- `/api/auth/*` - Authentication
- `/api/videos/*` - Video management
- `/api/projects/*` - Project management
- `/api/templates/*` - Template system
- `/api/export/*` - Video export
- `/api/admin/*` - Admin panel

## 📝 Environment Variables

### Frontend (.env)
```
REACT_APP_VITE_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY=your_key_here
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
FRONTEND_URL=http://localhost:3000
```

## 🔄 Next Steps

1. **Backend Setup:**
   - Create controllers for each route
   - Define MongoDB models (User, Video, Project, Template, etc)
   - Implement route handlers
   - Set up database connection

2. **Connect Frontend to Backend:**
   - Update `src/api/client.js` endpoints
   - Replace localStorage calls with API calls
   - Implement error handling

3. **Database:**
   - Set up MongoDB Atlas or local MongoDB
   - Create indexes for performance
   - Set up migrations if needed

4. **Authentication:**
   - Implement JWT token flow
   - Add token refresh logic
   - Secure API endpoints

5. **Payment Integration:**
   - Implement Razorpay payment handling
   - Create subscription management
   - Add invoice generation

## 💡 Tips

- Keep API calls in separate service files
- Use environment variables for API URLs
- Implement proper error handling on both sides
- Add logging for debugging
- Test API endpoints with Postman/Insomnia
- Use git branches for feature development

## 📚 Documentation

- See `frontend/README.md` for frontend-specific info
- See `backend/README.md` for backend-specific info
- API endpoints listed in `backend/README.md`

---

**Your D & H Creatives SaaS platform is ready for development! 🚀**
