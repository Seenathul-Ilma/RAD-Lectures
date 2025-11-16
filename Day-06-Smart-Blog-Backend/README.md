# Authentication & Authorization System

A complete role-based authentication and authorization system built with Express.js, TypeScript, MongoDB, and JWT tokens. Features user registration, login, role-based access control (RBAC), and automatic admin account creation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Authorization & Roles](#authorization--roles)
- [Token Management](#token-management)
- [Default Admin Account](#default-admin-account)
- [Security Features](#security-features)

## Features

- ✅ User registration with role assignment
- ✅ Secure login with JWT authentication
- ✅ Access token & refresh token implementation
- ✅ Role-based access control (USER, AUTHOR, ADMIN)
- ✅ Author approval system (pending/approved/rejected)
- ✅ Password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ Automatic default admin creation
- ✅ Profile retrieval for authenticated users

## Tech Stack

- **Backend**: Express.js + TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Environment Variables**: dotenv
- **CORS**: cors middleware

## Project Structure

```
src/
├── controllers/          # Business logic and request handlers
│   └── authController.ts      # Authentication logic (register, login, profile)
├── middleware/           # Functions that run between request and response
│   ├── auth.ts                # JWT authentication middleware (verify tokens)
│   └── authorizeRoles.ts      # Role-based authorization middleware (check permissions)
├── models/               # Database schemas and data structures
│   ├── userModels.ts          # User schema, Role & Status enums
│   └── authModel.ts           # Auth schema (optional - for separate auth table)
├── routes/               # API endpoint definitions
│   └── authRoutes.ts          # Route mappings (URLs → controllers)
├── utils/                # Reusable helper functions
│   └── tokens.ts              # JWT token generation utilities
├── index.ts              # Server entry point (Express setup, MongoDB connection)
└── .env                  # Environment variables (secrets, config)
```

**Folder Purpose:**
- **controllers/** - Handle incoming requests, process data, return responses
- **middleware/** - Intercept requests for authentication, authorization, validation
- **models/** - Define data structure and database schema
- **routes/** - Map URLs to controller functions
- **utils/** - Share reusable functions across the app (tokens, validation, etc.)
- **index.ts** - Initialize server, connect database, register middleware

## Installation

### Option A: Starting from Scratch

#### Step 1: Initialize Node.js Project

```bash
# Create a new directory for your project
mkdir smart-blog-backend
cd smart-blog-backend

# Initialize package.json with default values
npm init -y
```

#### Step 2: Install Core Dependencies

```bash
# Install Express.js, MongoDB, and other core packages
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Install TypeScript and development tools
npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose @types/cors @types/bcryptjs @types/jsonwebtoken
```

#### Step 3: Configure TypeScript

```bash
# Create tsconfig.json file
npx tsc --init
```

Update `tsconfig.json` with these settings:

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

#### Step 4: Configure package.json Scripts

Add these scripts to your `package.json`:

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
# Create folder structure
mkdir -p src/controllers src/middleware src/models src/routes src/utils

# Create main entry file
touch src/index.ts
```

#### Step 6: Setup MongoDB

Create a MongoDB database using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB installation.

### Option B: Clone Existing Repository

```bash
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```env
SERVER_PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-from-jwtsecrets.com

DEFAULT_ADMIN_FIRSTNAME=John
DEFAULT_ADMIN_LASTNAME=Doe
DEFAULT_ADMIN_EMAIL=admin@gmail.com
DEFAULT_ADMIN_PASSWORD=admin123
```

**Important Notes:**
- Get a secure JWT secret from [JWT Secrets](https://jwtsecrets.com/)
- Change default admin credentials in production
- Restart server after any `.env` changes

## API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user/author |
| POST | `/api/v1/auth/login` | Login and receive tokens |
| POST | `/api/v1/auth/refresh` | Refresh access token |

### Protected Routes

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| GET | `/api/v1/auth/me` | Get user profile | Any authenticated |
| POST | `/api/v1/auth/admin/register` | Register new admin | ADMIN or AUTHOR |

### Request Examples

**Register User/Author:**
```json
POST /api/v1/auth/register
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "password": "securePassword123",
  "role": "USER"
}
```

**Login:**
```json
POST /api/v1/auth/login
{
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login Successful..!",
  "data": {
    "email": "jane@example.com",
    "role": ["USER"],
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Get Profile:**
```http
GET /api/v1/auth/me
Authorization: Bearer <access-token>
```

## Authentication Flow

### 1. Registration

- User submits registration form with role selection (USER or AUTHOR)
- Password is hashed using bcrypt (10 salt rounds)
- AUTHORS require admin approval (status: PENDING)
- USERS are auto-approved (status: APPROVED)

### 2. Login

- User provides email and password
- System validates credentials against database
- Returns access token (30 minutes) and refresh token (7 days)

### 3. Protected Routes

```typescript
// All authenticated users can access
router.get("/me", authenticate, getMyProfile)

// Only ADMIN and AUTHOR can access
router.post("/admin/register", 
  authenticate, 
  authorization(Role.ADMIN, Role.AUTHOR), 
  adminRegister
)
```

## Authorization & Roles

### Role Types

```typescript
enum Role {
  ADMIN = "ADMIN",   // Full system access
  AUTHOR = "AUTHOR", // Content creation (requires approval)
  USER = "USER"      // Basic access
}
```

### Approval Status

```typescript
enum Status {
  APPROVED = "APPROVED",   // Can access system
  PENDING = "PENDING",     // Awaiting approval
  REJECTED = "REJECTED"    // Access denied
}
```

### Middleware Chain

```typescript
// 1. authenticate - Verifies JWT token
// 2. authorization - Checks user roles
router.post("/admin/register", 
  authenticate,                         // Step 1: Verify token
  authorization(Role.ADMIN, Role.AUTHOR), // Step 2: Check roles
  adminRegister                         // Step 3: Execute controller
)
```

### How Authorization Works

```typescript
const authorization = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles
    
    // Check if user has any of the allowed roles
    const isAllowed = userRoles.some(role => 
      allowedRoles.includes(role)
    )
    
    if (isAllowed) {
      next() // Grant access
    } else {
      res.status(403).json({ message: "Forbidden" })
    }
  }
}
```

## Token Management

### Access Token

- **Purpose**: Authenticate API requests
- **Expiration**: 30 minutes
- **Contains**: User ID, roles
- **Usage**: Send in Authorization header

```typescript
// Token Generation
export const signAccessToken = (user: IUser): string => {
  return jwt.sign(
    { sub: user._id.toString(), roles: user.roles },
    JWT_SECRET,
    { expiresIn: "30m" }
  )
}
```

### Refresh Token

- **Purpose**: Generate new access tokens
- **Expiration**: 7 days
- **Contains**: User ID only
- **Usage**: Send to `/api/v1/auth/refresh` endpoint

```typescript
// Refresh Access Token
POST /api/v1/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Token Usage in Requests

```javascript
// Include access token in headers
fetch('http://localhost:5000/api/v1/auth/me', {
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
})
```

## Default Admin Account

### Automatic Creation

On server startup, the system checks for existing admins:
- **If no admin exists**: Creates default admin from `.env` variables
- **If admin exists**: Skips creation and logs message

```typescript
// Runs on MongoDB connection
const existingAdmin = await User.findOne({ roles: "ADMIN" })
if (!existingAdmin) {
  // Create default admin with credentials from .env
}
```

### First Login

```json
POST /api/v1/auth/login
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

**⚠️ Important**: Change default admin password immediately in production!

## Security Features

### Password Security

- **Hashing**: bcrypt with 10 salt rounds
- **Storage**: Never stores plain-text passwords
- **Validation**: Compares hashed passwords during login

```typescript
const hashedPassword = await bcrypt.hash(password, 10)
const isValid = await bcrypt.compare(password, hashedPassword)
```

### Token Security

- **JWT Secret**: Stored in environment variables
- **Token Expiration**: Short-lived access tokens (30 min)
- **Verification**: All protected routes verify token validity

### Request Validation

```typescript
// All fields required check
if (!firstName || !lastName || !email || !password) {
  return res.status(400).json({ message: "All fields required" })
}

// Role validation
if (role !== Role.USER && role !== Role.AUTHOR) {
  return res.status(400).json({ message: "Invalid role" })
}
```

### CORS Configuration

```typescript
app.use(cors({
  origin: ["http://localhost:5173"], // Frontend URL
  methods: ["POST", "GET", "PUT", "DELETE"]
}))
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server runs on `http://localhost:5000` (or port specified in `.env`)

## Common Issues & Solutions

### Token Expired Error

**Issue**: Access token expires after 30 minutes

**Solution**: Use refresh token to get new access token

```javascript
// When 403 error occurs, refresh token
const response = await fetch('/api/v1/auth/refresh', {
  method: 'POST',
  body: JSON.stringify({ refreshToken })
})
```

### MongoDB Connection Failed

**Issue**: Cannot connect to database

**Solution**: 
1. Check `MONGO_URI` in `.env`
2. Verify network access in MongoDB Atlas
3. Ensure correct username/password

### Author Cannot Login

**Issue**: Author account shows "Invalid Credentials"

**Solution**: Author accounts require admin approval (check `approval` status in database)

### Unauthorized Access

**Issue**: 401 error on protected routes

**Solution**: 
1. Verify token is included in Authorization header
2. Check token format: `Bearer <token>`
3. Ensure token hasn't expired

## API Response Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

## Database Schema

### User Model

```typescript
{
  firstname: String,
  lastname: String,
  email: String (unique, lowercase),
  password: String (hashed),
  roles: [String] (enum: USER, AUTHOR, ADMIN),
  approval: String (enum: APPROVED, PENDING, REJECTED),
  createdAt: Date,
  updatedAt: Date
}
```

## Development Tips

1. **Test with Postman/Thunder Client**: Use API clients for easier testing
2. **Check Logs**: Monitor console for error messages
3. **Database Inspection**: Use MongoDB Compass to view data
4. **Token Debugging**: Decode JWT tokens at [jwt.io](https://jwt.io)
5. **Environment Variables**: Always restart server after `.env` changes

## Next Steps

- [ ] Implement email verification
- [ ] Add password reset functionality
- [ ] Create admin dashboard for user management
- [ ] Add rate limiting for API endpoints
- [ ] Implement account lockout after failed attempts
- [ ] Add logging system for security events

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)

---

**Note**: This is a learning project. For production use, implement additional security measures like rate limiting, input sanitization, and comprehensive error handling.