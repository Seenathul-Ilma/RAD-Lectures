# Smart Blog Web App - Full-Stack

A complete full-stack blog application with role-based authentication, built with Express.js, MongoDB, React, and TypeScript. Features user registration, JWT authentication, protected routes, and context-based state management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Application Flow](#application-flow)
- [Authentication System](#authentication-system)
- [API Integration](#api-integration)
- [Context & State Management](#context--state-management)
- [Routing](#routing)
- [Common Issues](#common-issues)

## Features

### Backend
- ✅ User & Author registration with role-based approval
- ✅ JWT authentication (access tokens)
- ✅ Protected API routes with middleware
- ✅ Role-based authorization (USER, AUTHOR, ADMIN)
- ✅ Password hashing with bcrypt
- ✅ Auto-create default admin account
- ✅ MongoDB integration with Mongoose

### Frontend
- ✅ React with TypeScript
- ✅ Authentication context (global user state)
- ✅ Protected routes
- ✅ Axios interceptors for automatic token injection
- ✅ React Router for navigation
- ✅ Lazy loading for code splitting
- ✅ Form handling with controlled components
- ✅ localStorage for token persistence

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, cors

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS (via @import)
- **Build Tool**: Vite

## Project Structure

```
smart-blog-web-app/
├── smart-blog-backend/              # Backend API server
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   └── authController.ts    # Auth logic (register, login, profile)
│   │   ├── middleware/              # Request interceptors
│   │   │   ├── auth.ts              # JWT verification middleware
│   │   │   └── authorizeRoles.ts    # Role-based access control
│   │   ├── models/                  # Database schemas
│   │   │   ├── userModels.ts        # User schema with Role & Status enums
│   │   │   └── authModel.ts         # Auth schema (optional)
│   │   ├── routes/                  # API endpoint definitions
│   │   │   └── authRoutes.ts        # Auth routes (login, register, profile)
│   │   ├── utils/                   # Helper functions
│   │   │   └── tokens.ts            # JWT token generation
│   │   ├── index.ts                 # Server entry point
│   │   └── .env                     # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
└── smart-blog-frontend/             # React frontend
    ├── src/
    │   ├── components/              # Reusable components
    │   │   ├── Header.tsx           # Navigation bar
    │   │   └── Layout.tsx           # Page layout wrapper (Header + Outlet)
    │   ├── context/                 # Global state management
    │   │   └── authContext.tsx      # User authentication context
    │   ├── pages/                   # Route pages
    │   │   ├── Register.tsx         # User/Author registration form
    │   │   ├── Login.tsx            # Login form
    │   │   ├── Home.tsx             # Protected home page
    │   │   └── Welcome.tsx          # Public landing page
    │   ├── routes/                  # Route configuration
    │   │   └── index.tsx            # React Router setup
    │   ├── services/                # API integration layer
    │   │   ├── axiosConfig.ts       # Axios instance with interceptors
    │   │   └── auth.ts              # Authentication API calls
    │   ├── App.tsx                  # Root component with AuthProvider
    │   ├── main.tsx                 # App entry point
    │   └── index.css                # Global styles (Tailwind)
    ├── package.json
    └── vite.config.ts
```

## Backend Setup

### Option A: From Scratch

#### Step 1: Initialize Project

```bash
# Create backend directory
mkdir smart-blog-backend
cd smart-blog-backend

# Initialize Node.js project
npm init -y
```

#### Step 2: Install Dependencies

```bash
# Core dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Development dependencies
npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose @types/cors @types/bcryptjs @types/jsonwebtoken
```

#### Step 3: Configure TypeScript

```bash
# Create tsconfig.json
npx tsc --init
```

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

#### Step 4: Add npm Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

#### Step 5: Create Project Structure

```bash
mkdir -p src/controllers src/middleware src/models src/routes src/utils
touch src/index.ts
```

#### Step 6: Setup Environment Variables

Create `.env` file:
```env
SERVER_PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-from-jwtsecrets.com

DEFAULT_ADMIN_FIRSTNAME=John
DEFAULT_ADMIN_LASTNAME=Doe
DEFAULT_ADMIN_EMAIL=admin@gmail.com
DEFAULT_ADMIN_PASSWORD=admin123
```

#### Step 7: Run Backend

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Option B: Clone Repository

```bash
git clone <backend-repo-url>
cd smart-blog-backend
npm install
npm run dev
```

## Frontend Setup

### Option A: From Scratch

#### Step 1: Create Vite Project

```bash
# Create Vite project (interactive prompts)
npm create vite@latest

# Follow the prompts:
# Project name: smart-blog-frontend
# Select a framework: React
# Select a variant: TypeScript

# Navigate to project directory
cd smart-blog-frontend
```

#### Step 2: Install Dependencies

```bash
# Install initial dependencies
npm install

# Install additional core dependencies
npm install react-router-dom axios

# Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite
```

#### Step 3: Configure Tailwind CSS

Add Tailwind to `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

Update `src/index.css`:
```css
@import "tailwindcss";
```

#### Step 4: Create Project Structure

```bash
mkdir -p src/components src/context src/pages src/routes src/services
```

#### Step 5: Run Frontend

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### Option B: Clone Repository

```bash
git clone <frontend-repo-url>
cd smart-blog-frontend
npm install
npm run dev
```

## Application Flow

### 1. User Registration Flow

```
User fills form → Register.tsx
    ↓
Calls register() → services/auth.ts
    ↓
POST /api/v1/auth/register → Backend API
    ↓
Validates data → authController.ts
    ↓
Hashes password → bcrypt
    ↓
Saves to MongoDB → User model
    ↓
Returns success → Frontend
    ↓
Redirects to /login
```

### 2. Login Flow

```
User enters credentials → Login.tsx
    ↓
Calls login() → services/auth.ts
    ↓
POST /api/v1/auth/login → Backend API
    ↓
Validates credentials → authController.ts
    ↓
Generates JWT → utils/tokens.ts
    ↓
Returns accessToken → Frontend
    ↓
Stores in localStorage → "accessToken"
    ↓
Fetches user profile → getMyProfile()
    ↓
Updates AuthContext → setUser(profile.data)
    ↓
Redirects to /home
```

### 3. Protected Route Access

```
User navigates to /home
    ↓
Component loads → Home.tsx
    ↓
useAuth() hook → Gets user from context
    ↓
Displays user.email
```

### 4. API Request with Token

```
Frontend makes API call
    ↓
Axios interceptor → axiosConfig.ts
    ↓
Checks if route is public
    ↓
If protected: Adds Authorization header
    ↓
Header: "Bearer <token>"
    ↓
Backend receives request
    ↓
authenticate middleware → auth.ts
    ↓
Verifies JWT token
    ↓
Adds user to req.user
    ↓
Calls next() → Controller executes
```

## Authentication System

### Backend Authentication

**JWT Token Generation** (`utils/tokens.ts`):
```typescript
export const signAccessToken = (user: IUser): string => {
  return jwt.sign(
    { sub: user._id.toString(), roles: user.roles },
    JWT_SECRET,
    { expiresIn: "30m" }
  )
}
```

**Authentication Middleware** (`middleware/auth.ts`):
```typescript
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(" ")[1] // "Bearer TOKEN"
  
  const payload = jwt.verify(token, JWT_SECRET)
  req.user = payload
  next()
}
```

**Authorization Middleware** (`middleware/authorizeRoles.ts`):
```typescript
export const authorization = (...allowedRoles: string[]) => {
  return (req, res, next) => {
    const userRoles = req.user?.roles
    const isAllowed = userRoles.some(role => 
      allowedRoles.includes(role)
    )
    
    if (isAllowed) next()
    else res.status(403).json({ message: "Forbidden" })
  }
}
```

### Frontend Authentication

**Auth Context** (`context/authContext.tsx`):
```typescript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      getMyProfile()
        .then(res => setUser(res.data))
        .catch(err => setUser(null))
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
```

**Custom Hook**:
```typescript
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
```

## API Integration

### Axios Configuration (`services/axiosConfig.ts`)

**Purpose**: Centralized API configuration with automatic token injection

```typescript
const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api/v1"
})

const PUBLIC_ENDPOINTS = ["/auth/register", "/auth/login"]

// Interceptor: Adds token to protected routes
axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  const isPublic = PUBLIC_ENDPOINTS.some(url => 
    config.url?.includes(url)
  )
  
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})
```

### Auth Service (`services/auth.ts`)

**Purpose**: Centralized authentication API calls

```typescript
export const register = async (data: registerDataType) => {
  const res = await axiosConfig.post("/auth/register", data)
  return res.data
}

export const login = async (email: string, password: string) => {
  const res = await axiosConfig.post("/auth/login", { email, password })
  return res.data
}

export const getMyProfile = async () => {
  const res = await axiosConfig.get("/auth/me")
  return res.data
}

export const adminRegister = async (data: registerDataType) => {
  const res = await axiosConfig.post("/auth/admin/register", data)
  return res.data
}
```

### Why This Architecture?

**Separation of Concerns**:
- `axiosConfig.ts` - HTTP client configuration
- `auth.ts` - Authentication API logic
- Components - UI and user interaction

**Benefits**:
- ✅ Automatic token management
- ✅ Centralized API base URL
- ✅ Easy to add new endpoints
- ✅ Reusable across components
- ✅ Type-safe with TypeScript

## Context & State Management

### Auth Context Purpose

**Global User State**: Share authenticated user data across entire app without prop drilling.

**When Context Updates**:
1. **On App Load**: Checks localStorage for token → Fetches profile
2. **After Login**: Sets user data in context
3. **After Logout**: Clears user data

### Using Auth Context

```typescript
// In any component
import { useAuth } from '../context/authContext'

function MyComponent() {
  const { user, setUser } = useAuth()
  
  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
}
```

### Provider Wrapper

```typescript
// App.tsx
import { AuthProvider } from './context/authContext'

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
```

**Note**: Components must be wrapped in `<AuthProvider>` to access context.

## Routing

### React Router Setup (`routes/index.tsx`)

```typescript
<BrowserRouter>
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Layout with Header */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="home" element={<Home />} />
      </Route>
      
      {/* Auth pages without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Suspense>
</BrowserRouter>
```

### Layout Component

**Purpose**: Shared layout for pages (Header + content area)

```typescript
// components/Layout.tsx
export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  )
}
```

### Lazy Loading

**Purpose**: Code splitting for better performance

```typescript
const Register = lazy(() => import("../pages/Register"))
const Login = lazy(() => import("../pages/Login"))
```

**Benefits**:
- Smaller initial bundle size
- Faster page load
- Components load on-demand

## Common Issues

### 1. CORS Error

**Issue**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: Ensure backend CORS is configured correctly
```typescript
// Backend: src/index.ts
app.use(cors({
  origin: ["http://localhost:5173"], // Frontend URL
  methods: ["POST", "GET", "PUT", "DELETE"]
}))
```

### 2. Token Not Sent to Backend

**Issue**: API returns 401 "No token provided"

**Solution**: Check axios interceptor and localStorage
```typescript
// Check if token exists
const token = localStorage.getItem("accessToken")
console.log("Token:", token)

// Check if interceptor is working
console.log("Headers:", config.headers)
```

### 3. User State Not Updating

**Issue**: `useAuth()` returns null after login

**Solution**: Ensure `setUser()` is called after login
```typescript
// Login.tsx
const profile = await getMyProfile()
setUser(profile.data) // Must call this!
```

### 4. Context Error

**Issue**: `useAuth must be used within AuthProvider`

**Solution**: Wrap app in `<AuthProvider>`
```typescript
// App.tsx
<AuthProvider>
  <Router />
</AuthProvider>
```

### 5. Routes Not Loading

**Issue**: Lazy-loaded components show "Loading..." forever

**Solution**: Check import paths and `Suspense` wrapper
```typescript
<Suspense fallback={<div>Loading...</div>}>
  <Routes>...</Routes>
</Suspense>
```

### 6. MongoDB Connection Failed

**Issue**: Backend crashes with "MongoDB connection error"

**Solution**: Check `.env` file and MongoDB Atlas network access
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

## Development Workflow

### How to Run Both Frontend & Backend Simultaneously

You need **two separate terminal windows** running at the same time because each server runs continuously.

#### Method 1: Two Terminals (Recommended)

**Terminal 1 - Backend Server**:
```bash
# Navigate to backend folder
cd smart-blog-backend

# Start backend server
npm run dev

# Output: Server is running on 5000
# ⚠️ Keep this terminal running - DO NOT close!
```

**Terminal 2 - Frontend Server**:
```bash
# Navigate to frontend folder (in a NEW terminal)
cd smart-blog-frontend

# Start frontend server
npm run dev

# Output: Local: http://localhost:5173/
# ⚠️ Keep this terminal running - DO NOT close!
```

**Why Two Terminals?**
- Backend runs on port **5000** (API server)
- Frontend runs on port **5173** (React dev server)
- Both must run **simultaneously** for the app to work
- Closing either terminal stops that server

#### Method 2: Using VS Code Split Terminal

1. Open VS Code
2. Open integrated terminal (`Ctrl + ` ` or `Cmd + ` `)
3. Click the **split terminal** icon (or `Ctrl + Shift + 5`)
4. Run backend in left terminal, frontend in right terminal

```
┌─────────────────────┬─────────────────────┐
│ Terminal 1          │ Terminal 2          │
│ cd smart-blog-back..│ cd smart-blog-front.│
│ npm run dev         │ npm run dev         │
│ Backend: Port 5000  │ Frontend: Port 5173 │
└─────────────────────┴─────────────────────┘
```

#### Method 3: Using `concurrently` Package (Advanced)

Install in root directory:
```bash
npm install -D concurrently
```

Create `package.json` in root:
```json
{
  "scripts": {
    "dev": "concurrently \"cd smart-blog-backend && npm run dev\" \"cd smart-blog-frontend && npm run dev\""
  }
}
```

Run both with one command:
```bash
npm run dev
```

#### Quick Start Checklist

✅ **Before Running**:
1. MongoDB is running (or MongoDB Atlas connection is valid)
2. `.env` file exists in backend with valid credentials
3. Dependencies installed (`npm install` in both folders)

✅ **Start Order** (doesn't matter, but recommended):
1. Start **backend first** → Wait for "MongoDB connected"
2. Start **frontend second** → Opens browser automatically

✅ **Verify Both Are Running**:
- Backend: `http://localhost:5000/api/v1/auth/login` (should show 404 or error - that's OK!)
- Frontend: `http://localhost:5173` (should show your app)

#### Stopping the Servers

Press `Ctrl + C` in each terminal to stop the server.

```bash
# In Terminal 1 (Backend)
Ctrl + C  # Stops backend server

# In Terminal 2 (Frontend)
Ctrl + C  # Stops frontend server
```

### Testing the Application

1. **Register**: Navigate to `/register` → Create USER or AUTHOR account
2. **Login**: Navigate to `/login` → Enter credentials
3. **Home**: After login → Redirected to `/home` (shows user email)
4. **Protected API**: Try accessing `/api/v1/auth/me` with token

### Testing with Postman/Thunder Client

**Register**:
```http
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Login**:
```http
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Get Profile** (Protected):
```http
GET http://localhost:5000/api/v1/auth/me
Authorization: Bearer <paste-access-token-here>
```

## Key Concepts Explained

### 1. Middleware vs Interceptors

#### What are Middleware?

**Middleware** are functions that execute **on the server side** between receiving a request and sending a response.

**Location**: Backend (Express.js)

**Purpose**: 
- Authenticate requests
- Validate data
- Check permissions
- Log requests
- Handle errors

**Example** (`middleware/auth.ts`):
```typescript
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  
  if (!token) {
    return res.status(401).json({ message: "No token" })
  }
  
  const payload = jwt.verify(token, JWT_SECRET)
  req.user = payload  // Attach user to request
  next()  // Continue to next middleware or controller
}
```

**Flow**:
```
Client Request → Middleware 1 → Middleware 2 → Controller → Response
                    ↓               ↓
              (authenticate)   (authorization)
```

#### What are Interceptors?

**Interceptors** are functions that execute **on the client side** before sending a request or after receiving a response.

**Location**: Frontend (Axios)

**Purpose**:
- Add authentication tokens
- Modify request headers
- Handle errors globally
- Transform request/response data
- Retry failed requests

**Example** (`services/axiosConfig.ts`):
```typescript
// Request Interceptor (runs BEFORE sending request)
axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  
  if (token && !isPublicEndpoint(config.url)) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config  // Modified config sent to server
})

// Response Interceptor (runs AFTER receiving response)
axiosConfig.interceptors.response.use(
  (response) => response,  // Success handler
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

**Flow**:
```
Component → Request Interceptor → HTTP Request → Server
                    ↓
            (Add Authorization header)

Server → HTTP Response → Response Interceptor → Component
                              ↓
                    (Handle 401 errors)
```

#### Middleware vs Interceptors Comparison

| Feature | Middleware (Backend) | Interceptors (Frontend) |
|---------|---------------------|------------------------|
| **Location** | Server (Express.js) | Client (Axios) |
| **Runs On** | Incoming requests | Outgoing requests / Incoming responses |
| **Purpose** | Validate, authenticate, authorize | Add tokens, transform data, handle errors |
| **Access To** | Database, server resources | localStorage, browser APIs |
| **Example Use** | Check JWT validity, verify roles | Add Authorization header, retry requests |
| **Next Step** | `next()` to continue | `return config` or `return response` |

#### Why Both Are Needed

**Frontend Interceptor** (Axios):
- Automatically adds token to every request
- No need to manually add `Authorization` header in each API call
- Handles token expiration globally

**Backend Middleware** (Express):
- Verifies token is valid and not tampered with
- Checks user has required permissions
- Protects sensitive data and operations

**Security Flow**:
```
Login → Store token in localStorage (Frontend)
          ↓
User navigates to protected page
          ↓
Component calls API
          ↓
Axios Interceptor adds token to headers (Frontend)
          ↓
Request sent to server
          ↓
Express Middleware verifies token (Backend)
          ↓
If valid: Execute controller
If invalid: Return 401 error
```

### 2. Axios Interceptors in Detail

**Request Interceptor** - Runs before every HTTP request:
```typescript
axiosConfig.interceptors.request.use((config) => {
  // Modify request config
  console.log("Request URL:", config.url)
  console.log("Request Method:", config.method)
  
  // Add token for protected routes
  const token = localStorage.getItem("accessToken")
  const isPublic = PUBLIC_ENDPOINTS.some(url => 
    config.url?.includes(url)
  )
  
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config  // Send modified config
})
```

**Why This Matters**:
- ✅ Write token logic once, works everywhere
- ✅ No need to manually add headers in components
- ✅ Easy to update token logic globally
- ✅ Automatically handles public vs protected routes

**Without Interceptor** (Manual approach):
```typescript
// Login.tsx
const response = await axios.get('/auth/me', {
  headers: { Authorization: `Bearer ${token}` }
})

// Home.tsx
const response = await axios.get('/posts', {
  headers: { Authorization: `Bearer ${token}` }
})

// Profile.tsx
const response = await axios.get('/users/me', {
  headers: { Authorization: `Bearer ${token}` }
})

// ❌ Repetitive code in every component!
```

**With Interceptor** (Automatic approach):
```typescript
// services/auth.ts - API calls
export const getMyProfile = async () => {
  const res = await axiosConfig.get("/auth/me")
  return res.data
  // ✅ Token added automatically by interceptor!
}

// Login.tsx - After successful login
const profile = await getMyProfile()
// ✅ This calls axiosConfig.get() which triggers interceptor

// Home.tsx - Using user data
const { user } = useAuth()
// ✅ User data already loaded from context (fetched via getMyProfile)

// Any component using axiosConfig
const response = await axiosConfig.get('/any-protected-route')
// ✅ Token added automatically!
```

**How It Works in Your Code**:

1. **Interceptor Configuration** (`services/axiosConfig.ts`):
```typescript
// This runs BEFORE every request made with axiosConfig
axiosConfig.interceptors.request.use((myConfig) => {
  const token = localStorage.getItem("accessToken")
  const isPublic = PUBLIC_ENDPOINTS.some((url) => 
    myConfig.url?.includes(url)
  )
  
  // Automatically adds Authorization header to protected routes
  if (token && !isPublic) {
    myConfig.headers.Authorization = `Bearer ${token}`
  }
  
  return myConfig
})
```

2. **Login Flow** (`pages/Login.tsx`):
```typescript
// After login success
await localStorage.setItem("accessToken", res.data.accessToken)

// Then fetch profile
const profile = await getMyProfile()
// ↓ This calls axiosConfig.get("/auth/me")
// ↓ Interceptor sees "/auth/me" is NOT in PUBLIC_ENDPOINTS
// ↓ Interceptor adds: Authorization: Bearer <token>
// ↓ Request sent to backend with token!
```

3. **Auth Context** (`context/authContext.tsx`):
```typescript
useEffect(() => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    getMyProfile()  // Uses axiosConfig internally
      .then((res) => setUser(res.data))
      // ↓ Interceptor automatically added token!
  }
}, [])
```

**Your Code Example**:
```typescript
// pages/Login.tsx (line ~45)
const profile = await getMyProfile()
// ↓
// services/auth.ts (line ~19)
export const getMyProfile = async () => {
  const res = await axiosConfig.get("/auth/me")
  // ↑ Interceptor adds token HERE automatically!
  return res.data
}
```

### 3. Context API

**What**: Global state management
**Why**: Share user data across components without props
**Where**: `context/authContext.tsx`

### 4. Protected Routes

**Backend**: Middleware checks JWT token
**Frontend**: Context provides user data

### 5. Token Storage

**Where**: localStorage (browser storage)
**Why**: Persist login state across page refreshes
**Security**: Only store access tokens, not passwords

### 6. Role-Based Access

**Backend**: `authorization()` middleware checks user roles
**Frontend**: Can check `user.roles` in components

## Next Steps

### Backend
- [ ] Add refresh token functionality
- [ ] Implement password reset
- [ ] Add email verification
- [ ] Create blog post endpoints
- [ ] Add comment system

### Frontend
- [ ] Create protected route wrapper component
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Add form validation
- [ ] Create admin dashboard
- [ ] Add logout functionality
- [ ] Improve UI/UX with better styling

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [JWT.io](https://jwt.io/) - Decode and test JWT tokens
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database

---

**Note**: This is a learning project demonstrating full-stack authentication. For production, add rate limiting, input validation, HTTPS, and comprehensive error handling.