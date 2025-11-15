# Node.js + Express + MongoDB - Complete Backend Guide

A comprehensive guide for building RESTful API backends using Node.js, TypeScript, Express.js, and MongoDB (via Mongoose). Perfect for beginners and intermediate developers! 🚀

---

## 📑 Table of Contents

1. [Technologies Overview](#technologies-overview)
2. [Project Setup](#project-setup)
3. [Project Structure](#project-structure)
4. [Core Concepts](#core-concepts)
5. [MongoDB & Mongoose](#mongodb--mongoose)
6. [Building the API](#building-the-api)
7. [Asynchronous JavaScript](#asynchronous-javascript)
8. [Best Practices](#best-practices)
9. [Testing API Endpoints](#testing-api-endpoints)
10. [Deployment](#deployment)

---

## Technologies Overview

### What is Each Technology?

| Technology | Description | Purpose in Our Project |
|------------|-------------|----------------------|
| **Node.js** | JavaScript runtime environment that runs JavaScript on the server | Allows us to build backend applications using JavaScript |
| **Express.js** | Minimal web application framework for Node.js | Handles routing, HTTP requests/responses, middleware |
| **MongoDB** | NoSQL database that stores data in JSON-like documents | Stores our application data flexibly |
| **Mongoose** | Object Data Modeling (ODM) library for MongoDB | Provides schema validation, type casting, query building |
| **TypeScript** | JavaScript with static type definitions | Adds type safety, better IDE support, fewer runtime errors |

### Why This Stack?

- ✅ **JavaScript Everywhere** - Same language for frontend and backend
- ✅ **Fast & Scalable** - Node.js is non-blocking and event-driven
- ✅ **Flexible Schema** - MongoDB adapts to changing requirements
- ✅ **Type Safety** - TypeScript catches errors during development
- ✅ **Rich Ecosystem** - Huge npm package library

---

## Project Setup

### Step 1: Initialize Node.js Project

```bash
# Create a new directory for your project
mkdir my-backend-api
cd my-backend-api

# Initialize package.json with default values
npm init -y
```

### Step 2: Install Dependencies

#### Core Dependencies
```bash
# Install Express.js for building the API
npm install express

# Install Mongoose for MongoDB interaction
npm install mongoose
```

#### TypeScript Dependencies
```bash
# Install TypeScript and development tools
npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose
```

**What each package does:**

| Package | Type | Purpose |
|---------|------|---------|
| `express` | Production | Web framework for routing and middleware |
| `mongoose` | Production | MongoDB ODM for data modeling |
| `typescript` | Development | Adds static typing to JavaScript |
| `ts-node-dev` | Development | Runs TypeScript with auto-restart on changes |
| `@types/node` | Development | TypeScript definitions for Node.js |
| `@types/express` | Development | TypeScript definitions for Express |
| `@types/mongoose` | Development | TypeScript definitions for Mongoose |

### Step 3: Initialize TypeScript

```bash
# Creates tsconfig.json file
npx tsc --init
```

### Step 4: Configure TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",           // Use modern JavaScript features
    "module": "CommonJS",         // Use CommonJS for Node.js
    "rootDir": "src",             // Source files location
    "outDir": "dist",             // Compiled JavaScript output
    "strict": true,               // Enable strict type checking
    "esModuleInterop": true,      // Better ES6 module compatibility
    "skipLibCheck": true          // Skip type checking of declaration files
  }
}
```

### Step 5: Configure package.json Scripts

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

**Script explanations:**

- `npm run dev` - Starts development server with auto-restart
- `npm run build` - Compiles TypeScript to JavaScript
- `npm start` - Runs the compiled production code

### Step 6: Run the Project

```bash
# Development mode (auto-restarts on file changes)
npm run dev

# Production mode
npm run build
npm start
```

---

## Project Structure

```
my-backend-api/
├── src/
│   ├── models/              # Database models/schemas
│   │   ├── userModel.ts
│   │   └── itemModel.ts
│   ├── routes/              # API route definitions
│   │   ├── userRoutes.ts
│   │   └── itemRoutes.ts
│   ├── controllers/         # Business logic & request handlers
│   │   ├── userController.ts
│   │   └── itemController.ts
│   └── index.ts             # Main application entry point
├── dist/                    # Compiled JavaScript (generated)
├── node_modules/            # Dependencies (generated)
├── package.json             # Project configuration
├── tsconfig.json            # TypeScript configuration
└── .env                     # Environment variables
```

### Architecture Pattern: MVC (Model-View-Controller)

```
Request Flow:
Client → Routes → Controller → Model → Database
                      ↓
                   Response
```

**Explanation:**
1. **Routes** - Define API endpoints (URLs)
2. **Controllers** - Handle business logic
3. **Models** - Define data structure and interact with database

---

## Core Concepts

### 1. Setting Up Express Server (index.ts)

```typescript
import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes"
import itemRoutes from "./routes/itemRoutes"

// Create Express application
const app: Application = express()

// Middleware - Parse incoming JSON data
app.use(express.json())

// Mount Routes (like Spring Boot controllers)
// All requests to /api/v1/user go to userRoutes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/item", itemRoutes)

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongo_test_1")
    console.log("✅ MongoDB connected successfully")
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err)
    process.exit(1) // Exit if database connection fails
  }
}

// Start server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  connectDB()
})
```

### 2. Creating Routes (userRoutes.ts)

**Routes** define the API endpoints and map them to controller functions.

```typescript
import { Router, Request, Response } from "express"
import { createUser, getAllUsers, updateUser, deleteUser } from "../controllers/userController"

const router = Router()

// Define endpoints
// GET    /api/v1/user/          - Get all users
// POST   /api/v1/user/save      - Create new user
// PUT    /api/v1/user/update    - Update user
// DELETE /api/v1/user/:id       - Delete user by ID

router.get("/", getAllUsers)
router.post("/save", createUser)
router.put("/update", updateUser)
router.delete("/:id", deleteUser)

export default router
```

### 3. Creating Models (userModel.ts)

**Models** define the structure of your data (like database tables/entities).

```typescript
import mongoose, { Document, Schema } from "mongoose"

// TypeScript interface for type safety
interface IUser extends Document {
  name: string
  email: string
  age?: number          // Optional field (?)
  createdAt?: Date      // Added by timestamps
  updatedAt?: Date      // Added by timestamps
}

// MongoDB Schema (defines structure and validation)
const userSchema = new Schema<IUser>(
  {
    name: { type: String, 
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]   
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    age: { 
      type: Number, 
      required: false,
      min: [0, "Age cannot be negative"],
      max: [150, "Age seems unrealistic"]
    }
  },
  { 
    timestamps: true  // Automatically adds createdAt and updatedAt
  }
)

// Create and export the model
export const User = mongoose.model<IUser>("User", userSchema)
```

**Schema Field Options:**

| Option | Description | Example |
|--------|-------------|---------|
| `type` | Data type | `String`, `Number`, `Boolean`, `Date` |
| `required` | Must have a value | `required: true` or `required: [true, "Error message"]` |
| `unique` | No duplicates allowed | `unique: true` |
| `default` | Default value | `default: 0` |
| `min/max` | Minimum/maximum value | `min: 0, max: 100` |
| `trim` | Remove whitespace | `trim: true` |
| `lowercase/uppercase` | Convert case | `lowercase: true` |
| `match` | Regex validation | `match: /pattern/` |

### 4. Creating Controllers (userController.ts)

**Controllers** contain the business logic and handle requests/responses.

```typescript
import { Request, Response } from "express"
import { User } from "../models/userModel"

// CREATE - Add new user
export const createUser = async (req: Request, res: Response) => {
  try {
    // Extract data from request body
    const { name, email, age } = req.body

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required"
      })
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      })
    }

    // Create new user
    const newUser = new User({ name, email, age })
    const savedUser = await newUser.save()

    console.log("✅ User created:", savedUser)

    // Send success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser
    })
  } catch (err) {
    console.error("❌ Error creating user:", err)
    res.status(500).json({
      success: false,
      message: "Internal server error while creating user"
    })
  }
}

// READ - Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (err) {
    console.error("❌ Error fetching users:", err)
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching users"
    })
  }
}

// UPDATE - Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { 
        new: true,           // Return updated document
        runValidators: true  // Run schema validators
      }
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    })
  } catch (err) {
    console.error("❌ Error updating user:", err)
    res.status(500).json({
      success: false,
      message: "Internal server error while updating user"
    })
  }
}

// DELETE - Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser
    })
  } catch (err) {
    console.error("❌ Error deleting user:", err)
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting user"
    })
  }
}
```

---

## MongoDB & Mongoose

### Understanding MongoDB

**MongoDB** is a NoSQL database that stores data in flexible, JSON-like documents (BSON format).

**Key Differences from SQL:**

| Feature | SQL (MySQL, PostgreSQL) | NoSQL (MongoDB) |
|---------|------------------------|-----------------|
| **Structure** | Tables with rows/columns | Collections with documents |
| **Schema** | Fixed schema (rigid) | Flexible schema (dynamic) |
| **Relationships** | Foreign keys, JOINs | Embedded documents or references |
| **Scaling** | Vertical (bigger server) | Horizontal (more servers) |
| **Best for** | Complex queries, transactions | Rapid development, flexibility |

### Mongoose Query Methods

```typescript
// CREATE
const user = new User({ name: "John", email: "john@example.com" })
await user.save()
// OR
await User.create({ name: "John", email: "john@example.com" })

// READ - Find all
const users = await User.find()

// READ - Find one
const user = await User.findOne({ email: "john@example.com" })

// READ - Find by ID
const user = await User.findById("507f1f77bcf86cd799439011")

// READ - With conditions
const adults = await User.find({ age: { $gte: 18 } })  // age >= 18

// READ - Select specific fields
const users = await User.find().select("name email")  // Only name and email

// READ - Sort
const users = await User.find().sort({ age: -1 })  // Sort by age descending

// READ - Limit and skip (pagination)
const users = await User.find().limit(10).skip(20)  // Page 3 (items 21-30)

// UPDATE - Find and update one
const updated = await User.findByIdAndUpdate(
  id,
  { name: "New Name" },
  { new: true, runValidators: true }
)

// UPDATE - Update many
await User.updateMany(
  { age: { $lt: 18 } },  // Condition: age < 18
  { $set: { isMinor: true } }
)

// DELETE - Find and delete one
await User.findByIdAndDelete(id)

// DELETE - Delete many
await User.deleteMany({ age: { $lt: 18 } })

// COUNT
const count = await User.countDocuments({ age: { $gte: 18 } })

// EXISTS
const exists = await User.exists({ email: "test@example.com" })
```

### MongoDB Query Operators

```typescript
// Comparison Operators
{ age: { $eq: 25 } }       // Equal to 25
{ age: { $ne: 25 } }       // Not equal to 25
{ age: { $gt: 25 } }       // Greater than 25
{ age: { $gte: 25 } }      // Greater than or equal to 25
{ age: { $lt: 25 } }       // Less than 25
{ age: { $lte: 25 } }      // Less than or equal to 25
{ age: { $in: [20, 25, 30] } }    // In array
{ age: { $nin: [20, 25, 30] } }   // Not in array

// Logical Operators
{ $and: [{ age: { $gte: 18 } }, { age: { $lte: 65 } }] }
{ $or: [{ name: "John" }, { name: "Jane" }] }
{ $not: { age: { $gte: 18 } } }

// String Pattern Matching
{ name: { $regex: /john/i } }  // Case-insensitive search
```

---

## Asynchronous JavaScript

### Why Async Programming?

Node.js is **non-blocking** and **event-driven**. This means:
- Operations like database queries, file reading, HTTP requests don't block the main thread
- Multiple operations can run concurrently
- Better performance and scalability

### 1. Callbacks (Old Way)

A **callback** is a function passed to another function to be executed later.

```typescript
// Example: Callback function
const printName = (name: string, callback: () => void) => {
  console.log(`Hello ${name}`)
  callback()  // Execute the callback
}

const greet = () => {
  console.log("Welcome!")
}

printName("John", greet)
// Output:
// Hello John
// Welcome!
```

**Problem with Callbacks: "Callback Hell"**

```typescript
// ❌ Callback Hell - Hard to read and maintain
getData((data) => {
  processData(data, (processedData) => {
    saveData(processedData, (result) => {
      sendEmail(result, (response) => {
        console.log("Done!")
      })
    })
  })
})
```

### 2. Promises (Better Way)

A **Promise** represents the eventual completion (or failure) of an async operation.

**Promise States:**
- ⏳ **Pending** - Initial state (not fulfilled or rejected)
- ✅ **Fulfilled** - Operation completed successfully (resolved)
- ❌ **Rejected** - Operation failed (rejected)

```typescript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  const isSuccess = true

  setTimeout(() => {
    if (isSuccess) {
      resolve("Operation successful!")  // Success
    } else {
      reject("Something went wrong!")   // Failure
    }
  }, 2000)
})

// Consuming a Promise
myPromise
  .then((result) => {
    console.log("✅", result)  // Handle success
  })
  .catch((error) => {
    console.log("❌", error)   // Handle error
  })
  .finally(() => {
    console.log("Completed")   // Always runs
  })
```

**Promise Chaining:**

```typescript
fetch("/api/users")
  .then(response => response.json())
  .then(data => {
    console.log("Data:", data)
    return data.filter(user => user.age > 18)
  })
  .then(adults => {
    console.log("Adults:", adults)
  })
  .catch(error => {
    console.error("Error:", error)
  })
```

### 3. Async/Await (Modern Way - Best!)

**Async/Await** makes asynchronous code look and behave like synchronous code.

```typescript
// Using async/await
const fetchUserData = async () => {
  try {
    console.log("Fetching data...")
    
    // Wait for promise to resolve
    const response = await fetch("/api/users")
    const data = await response.json()
    
    console.log("Data received:", data)
    return data
  } catch (error) {
    console.error("Error:", error)
  } finally {
    console.log("Fetch completed")
  }
}

fetchUserData()
```

**Key Rules:**
- `async` keyword before function declaration
- `await` can only be used inside `async` functions
- `await` pauses execution until promise resolves
- Always use `try-catch` for error handling

### 4. Real Example: Database Query

```typescript
// ❌ Without async/await (Promise-based)
export const createUser = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).json({ message: "Email exists" })
      } else {
        const newUser = new User(req.body)
        return newUser.save()
      }
    })
    .then((savedUser) => {
      res.status(201).json({ data: savedUser })
    })
    .catch((error) => {
      res.status(500).json({ message: "Error" })
    })
}

// ✅ With async/await (Cleaner!)
export const createUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    
    if (existingUser) {
      return res.status(400).json({ message: "Email exists" })
    }

    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    
    res.status(201).json({ data: savedUser })
  } catch (error) {
    res.status(500).json({ message: "Error" })
  }
}
```

### When to Use `await`

**✅ Use await when:**
- Database operations (save, find, update, delete)
- HTTP requests (fetch, axios)
- File operations (reading/writing files)
- Any operation that returns a Promise

**❌ Don't await when:**
- Simple synchronous operations
- Calculations that don't involve I/O
- Operations that don't return Promises

```typescript
// ✅ Good - await necessary operations
const user = await User.findById(id)
const response = await fetch(url)
const file = await fs.readFile(path)

// ❌ Bad - unnecessary await
const sum = await (5 + 10)  // No need!
const name = await "John"   // No need!
```

---

## Best Practices

### 1. Error Handling

```typescript
// ✅ Always use try-catch in async functions
export const createUser = async (req: Request, res: Response) => {
  try {
    // Your code here
    const user = await User.create(req.body)
    res.status(201).json({ success: true, data: user })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    })
  }
}
```

### 2. Input Validation

```typescript
// ✅ Always validate input data
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body

    // Check required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      })
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      })
    }

    // Validate age
    if (age && (age < 0 || age > 150)) {
      return res.status(400).json({
        success: false,
        message: "Age must be between 0 and 150"
      })
    }

    // Proceed with creation...
  } catch (error) {
    // Handle error
  }
}
```

### 3. Environment Variables

```typescript
// .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_secret_key

// Load with dotenv
import dotenv from 'dotenv'
dotenv.config()

// Usage
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/default"
```

### 4. Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST (resource created) |
| **400** | Bad Request | Invalid input from client |
| **401** | Unauthorized | Authentication required |
| **403** | Forbidden | Authenticated but no permission |
| **404** | Not Found | Resource doesn't exist |
| **500** | Internal Server Error | Server-side error |

### 5. Response Format

```typescript
// ✅ Consistent response format
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "123",
    "name": "John",
    "email": "john@example.com"
  }
}

// Error response
{
  "success": false,
  "message": "Email already exists",
  "error": "DUPLICATE_EMAIL"
}
```

### 6. Database Connection

```typescript
// ✅ Proper connection handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      // Options for better stability
    })
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
    process.exit(1)  // Exit if connection fails
  }
}

// Handle disconnection
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

// Handle app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})
```

---

## Testing API Endpoints

### Using Thunder Client (VS Code Extension)

1. Install "Thunder Client" extension in VS Code
2. Create new request
3. Set method (GET, POST, PUT, DELETE)
4. Enter URL
5. Add request body (for POST/PUT)
6. Send request

### Using Postman

**1. Create User (POST)**
```
URL: http://localhost:5000/api/v1/user/save
Method: POST
Headers: Content-Type: application/json
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

**2. Get All Users (GET)**
```
URL: http://localhost:5000/api/v1/user/
Method: GET
```

**3. Update User (PUT)**
```
URL: http://localhost:5000/api/v1/user/update/507f1f77bcf86cd799439011
Method: PUT
Headers: Content-Type: application/json
Body (JSON):
{
  "name": "Jane Doe",
  "age": 26
}
```

**4. Delete User (DELETE)**
```
URL: http://localhost:5000/api/v1/user/507f1f77bcf86cd799439011
Method: DELETE
```

### Using cURL (Terminal)

```bash
# Create user
curl -X POST http://localhost:5000/api/v1/user/save \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'

# Get all users
curl http://localhost:5000/api/v1/user/

# Update user
curl -X PUT http://localhost:5000/api/v1/user/update/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","age":26}'

# Delete user
curl -X DELETE http://localhost:5000/api/v1/user/123
```

---

## Deployment

### Preparing for Production

1. **Environment Variables**
```bash
# Create .env file
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
NODE_ENV=production
```

2. **Build TypeScript**
```bash
npm run build
```

3. **Start Production Server**
```bash
npm start
```

### Deployment Platforms

#### 1. Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create my-backend-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

#### 2. Vercel (Serverless)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### 3. Railway
```bash
# Connect GitHub repo
# Add environment variables in dashboard
# Auto-deploys on git push
```

### MongoDB Cloud (Atlas)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP address (0.0.0.0/0 for all)
5. Get connection string
6. Replace in your .env file

---

## Quick Reference

### Express Methods

```typescript
app.get(path, handler)      // GET request
app.post(path, handler)     // POST request
app.put(path, handler)      // PUT request
app.delete(path, handler)   // DELETE request
app.patch(path, handler)    // PATCH request
app.use(middleware)         // Apply middleware
app.listen(port, callback)  // Start server
```

### Request Object Properties

```typescript
req.body        // Request body (requires express.json())
req.params      // URL parameters (/user/:id)
req.query       // Query string (?name=John)
req.headers     // Request headers
req.method      // HTTP method (GET, POST, etc.)
req.path        // Request path
req.ip          // Client IP address
```

### Response Methods

```typescript
res.send(data)              // Send response (any type)
res.json(data)              // Send JSON response
res.status(code)            // Set status code
res.sendStatus(code)        // Set status and send message
res.redirect(url)           // Redirect to URL
res.download(path)          // Download file
res.render(view, data)      // Render template
```

### Mongoose Schema Types

```typescript
String      // Text data
Number      // Numeric data
Date        // Date and time
Boolean     // true/false
Buffer      // Binary data
ObjectId    // MongoDB ObjectId
Array       // Array of values
Mixed       // Any data type
```

---

## Comparison with Spring Boot

For developers coming from Spring Boot, here's a comparison:

| Spring Boot | Node.js + Express |
|-------------|-------------------|
| `@RestController` | `router` in routes file |
| `@Service` | Business logic in controllers |
| `@Entity` | Mongoose Schema/Model |
| `@Repository` | Mongoose Model methods |
| `@Autowired` | Import/export ES6 modules |
| `@GetMapping` | `router.get()` |
| `@PostMapping` | `router.post()` |
| `@RequestBody` | `req.body` |
| `@PathVariable` | `req.params` |
| `@RequestParam` | `req.query` |
| `application.properties` | `.env` file |
| JPA/Hibernate | Mongoose ODM |
| MySQL/PostgreSQL | MongoDB |

---

## Resources

### Official Documentation
- [Node.js Docs](https://nodejs.org/en/docs/)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Learning Resources
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Tutorial](https://restfulapi.net/)
- [MongoDB University](https://university.mongodb.com/)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [Thunder Client](https://www.thunderclient.com/) - VS Code extension
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI for MongoDB
- [Studio 3T](https://studio3t.com/) - Advanced MongoDB client

---

## Summary Checklist

### Before Starting Development
- [ ] Node.js installed
- [ ] MongoDB installed and running
- [ ] VS Code with extensions (ESLint, Prettier, Thunder Client)
- [ ] Basic understanding of JavaScript/TypeScript
- [ ] Understanding of REST API concepts

### Project Setup
- [ ] Initialize npm project (`npm init -y`)
- [ ] Install dependencies (Express, Mongoose, TypeScript)
- [ ] Configure TypeScript (`tsconfig.json`)
- [ ] Set up project structure (models, routes, controllers)
- [ ] Create `.env` file for environment variables

### Development
- [ ] Define MongoDB schemas with validation
- [ ] Create routes for all CRUD operations
- [ ] Implement controllers with error handling
- [ ] Test all endpoints with Postman/Thunder Client
- [ ] Add middleware (CORS, authentication, validation)
- [ ] Implement proper error responses

### Before Deployment
- [ ] Remove all unused imports
- [ ] Remove console.logs
- [ ] Set up environment variables
- [ ] Test all API endpoints thoroughly
- [ ] Add rate limiting and security headers
- [ ] Set up MongoDB Atlas (cloud database)
- [ ] Build TypeScript (`npm run build`)
- [ ] Test production build locally

---

## Quick Start Command Summary

```bash
# 1. Setup
npm init -y
npm install express mongoose
npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose
npx tsc --init

# 2. Development
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start

# 5. Test API
# Use Postman or Thunder Client
```

---

**Made with ❤️ for Backend Developers**

*Last Updated: 2025*

For questions or contributions, feel free to open an issue or submit a pull request.

---

This comprehensive guide should help you build robust backend APIs with Node.js, Express, and MongoDB! 🚀