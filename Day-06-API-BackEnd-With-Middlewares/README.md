# Express.js Middleware Implementation Guide

A comprehensive guide to implementing and using middleware in Express.js with TypeScript, covering global middleware, route-specific middleware, and reusable middleware patterns.

## Table of Contents

- [Overview](#overview)
- [Project Setup](#project-setup)
- [Middleware Types](#middleware-types)
- [Implementation Examples](#implementation-examples)
- [Key Concepts](#key-concepts)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)

## Overview

This project demonstrates various middleware patterns in Express.js:

- **Global Middleware**: Applied to all routes
- **Route-Specific Middleware**: Applied to individual endpoints
- **Reusable Middleware**: Modular functions used across multiple routes
- **Multiple Middleware Chains**: Sequential middleware execution

## Project Setup

### Dependencies

```bash
npm install express cors  # to install express & cors at the same time
npm install -D @types/express @types/cors typescript  # to add type definitions for both
```

### Project Structure

```
project/
├── src/
│   ├── index.ts
│   └── middlewares/
│       └── sampleReusableMiddleware.ts
├── package.json
└── tsconfig.json
```

## Middleware Types

### 1. Global Middleware

Applied to **all routes** in the application. Defined using `app.use()` before route definitions.

```typescript
// Built-in middleware for JSON parsing
app.use(express.json())

// CORS middleware
app.use(cors({
    origin: ["http://localhost:5173"],   // frontend. don't apply backend url - ("http://localhost:5000/")
    methods: ["POST", "GET", "PUT", "DELETE"] // Allowed methods (optional) - "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
}))

// Custom global middleware
app.use((req, res, next) => {
    // Runs for every request
    console.log("Global middleware executed");
    next() // Must call next() to continue
})
```

### 2. Route-Specific Middleware

Applied only to specific endpoints.

```typescript
app.get("/hello",
    (req, res, next) => {
        console.log("First middleware");
        next();
    },
    (req, res, next) => {
        console.log("Second middleware");
        next();
    },
    (req, res) => {
        res.send("Response after middlewares");
    }
)
```

### 3. Reusable Middleware

Modular middleware functions that can be imported and used across multiple routes.

```typescript
import { sampleReusableMiddleware } from "./middlewares/sampleReusableMiddleware"

app.get("/test", sampleReusableMiddleware, (req, res) => {
    res.send("Response after reusable middleware");
})
```

## Implementation Examples

### Basic Server Setup

```typescript
import express from "express";
import cors from "cors"
import { sampleReusableMiddleware } from "./middlewares/sampleReusableMiddleware"

const app = express()

// Global middlewares
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173/"],
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

// Routes
app.get("/", (req, res) => {
    res.send("Hello from Express backend")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})
```

### Code Explanation 

**File: `index.ts`**

```typescript
import express from "express";   // Framework to build backend server & routes
import cors from "cors"    // Allows frontend (React, etc.) to communicate with backend
import { sampleReusableMiddleware } from "./middlewares/sampleReusableMiddleware"   // Your custom middleware function for reuse when needed

// Create an Express application instance
const app = express();

/*
   1. GLOBAL MIDDLEWARE: express.json()
   - Automatically converts JSON request body → req.body
   - Applies to every request
   - This runs for all routes
*/
app.use(express.json());   // Built-in

/*
   2. CORS MIDDLEWARE
   - Allows requests ONLY from your frontend
   - Protects backend from other unknown origins
   - Without this, your frontend cannot call the backend due to CORS protection.
*/
app.use(cors({
    origin: ["http://localhost:5173/"],       // Allowed frontend URL
    methods: ["POST", "GET", "PUT", "DELETE"] // Allowed HTTP methods
    //credentials: true                       // Enable if sending cookies
}));

/*
   3. CUSTOM GLOBAL MIDDLEWARE
   - Runs before ALL routes & endpoints
   - If res.send() is used here → request stops → routes will NOT execute
   - next() is required to continue to next middleware/route. Then only the next middleware or route will run
*/
app.use((req, res, next) => {
    // res.send("Blocked by global middleware ❌"); // Stops entire request
    next(); // Continue to next middleware ✔
});

/*
   4. DEFAULT GET ROUTE ( / )
   - Handles GET / request
   - If global middleware returned a response, this would NOT run.
*/
app.get("/", (req, res) => {
    console.log("Default GET '/' endpoint is running.");
    res.send("Hello.. This is the GET method inside Node Express backend.");
});

/*
   SAMPLE FOR REUSABLE MIDDLEWARE (moved to its own file)

   // Now, In sampleReusableMiddleware.ts
   const sampleReusableMiddleware = (req, res, next) => {
       // logic...
       next();
   };

   IMPORTANT:
   - sampleReusableMiddleware() → ❌ Do NOT call it manually
   - sampleReusableMiddleware   → ✔ Pass the function
*/

/*
   5. /hello ROUTE WITH MULTIPLE INLINE MIDDLEWARES
   - Can attach multiple middlewares in one route.
   - Each middleware MUST call next() to continue.
   - Final function sends the response
*/
app.get(
    "/hello",

    // First middleware
    (req, res, next) => {
        // console.log("1st middleware executed");
        next();    // pass to next middleware
    },

    // Second middleware
    (req, res, next) => {
        // console.log("2nd middleware executed");
        next();    // pass to final handler
    },

    // Final route handler → sends response.
    (req, res) => {
        console.log("GET '/hello' endpoint is running.");
        res.send("Hello.. This is the GET method from '/hello'.");
    }
);

/*
   6. /test ROUTE USING CUSTOM REUSABLE MIDDLEWARE
   - sampleReusableMiddleware is passed without calling it
   - ✔ correct: sampleReusableMiddleware
   - ❌ wrong: sampleReusableMiddleware()
   - No need to call the function manually. Express automatically executes/call it for you.
*/
app.get(
    "/test",

    sampleReusableMiddleware, // Middleware passed (not a function call)

    (req, res) => {
        console.log("GET '/test' endpoint is running.");
        res.send("Hello.. This is the GET method from '/test'.");
    }
);

/*
   7. START THE SERVER
*/
app.listen(5000, () => {
    console.log("Server is running on port 5000!");
});

/*
   📌 QUICK THEORY (VERY SIMPLE)

   ROUTES:
      - Define the URL + HTTP method
      - Example: app.get("/users")

   CONTROLLERS:
      - Logic for request & response
      - Example: (req, res) => { ... }

   MIDDLEWARE:
      - Runs BEFORE controller
      - Used for validation, auth, logging, etc.

*/

```

### Reusable Middleware Example

**File: `middlewares/sampleReusableMiddleware.ts`**

```typescript
import { NextFunction, Request, Response } from "express";

export const sampleReusableMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Authorization check example
    if(req.headers.authorization == null) {
        return res.status(401).send("Unauthorized"); // Stop execution
    }

    // Continue to next middleware/route handler
    next()
}
```

## Key Concepts

### The `next()` Function

- **Purpose**: Passes control to the next middleware in the chain
- **Without `next()`**: Request processing stops at current middleware
- **With `next()`**: Execution continues to the next middleware or route handler

```typescript
app.use((req, res, next) => {
    console.log("This runs first");
    next(); // Pass control forward
})

app.get("/", (req, res) => {
    console.log("This runs after next() is called");
    res.send("Response");
})
```

### Stopping Middleware Execution

Use `return` with a response to stop execution and prevent `next()` from being called:

```typescript
if (condition) {
    return res.send("Stopping here"); // Stops execution
}
next(); // Only runs if condition is false
```

### Middleware Execution Order

1. **Global middlewares** (defined with `app.use()`)
2. **Route-specific middlewares** (defined in route handler)
3. **Final route handler** (sends response)

```typescript
// 1. Global middleware
app.use((req, res, next) => {
    console.log("1. Global");
    next();
})

// 2. Route with multiple middlewares
app.get("/example",
    (req, res, next) => {
        console.log("2. First route middleware");
        next();
    },
    (req, res, next) => {
        console.log("3. Second route middleware");
        next();
    },
    (req, res) => {
        console.log("4. Final handler");
        res.send("Done");
    }
)
```

## Best Practices

### 1. Always Call `next()` or Send a Response

```typescript
// ✅ Correct
app.use((req, res, next) => {
    if (condition) {
        return res.send("Error");
    }
    next();
})

// ❌ Incorrect - hangs request
app.use((req, res, next) => {
    console.log("Forgot to call next()");
})
```

### 2. Use `return` When Sending Early Responses

```typescript
// ✅ Correct - prevents next() from running
if (!authorized) {
    return res.status(401).send("Unauthorized");
}
next();

// ❌ Incorrect - next() might still run
if (!authorized) {
    res.status(401).send("Unauthorized");
}
next(); // This still executes!
```

### 3. Order Matters

```typescript
// ✅ Correct order
app.use(express.json()) // Parse JSON first
app.use(cors()) // Then handle CORS
app.get("/api", handler) // Then define routes

// ❌ Wrong order
app.get("/api", handler) // Routes won't have JSON parsing
app.use(express.json())
```

### 4. Organize Reusable Middleware

```typescript
// middlewares/auth.ts
export const authMiddleware = (req, res, next) => { /*...*/ }

// middlewares/logger.ts
export const loggerMiddleware = (req, res, next) => { /*...*/ }

// index.ts
import { authMiddleware } from "./middlewares/auth"
import { loggerMiddleware } from "./middlewares/logger"

app.get("/protected", authMiddleware, loggerMiddleware, handler)
```

## Common Patterns

### Authentication Middleware

```typescript
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    
    // Verify token logic here
    next();
}
```

### Logging Middleware

```typescript
export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
}
```

### Error Handling Middleware

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
})
```

## CORS Configuration

```typescript
app.use(cors({
    origin: ["http://localhost:5173"], // Frontend URL (no trailing slash)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true // Allow cookies (optional)
}))
```

**Important**: Use the frontend URL (where React/Vue app runs), not the backend URL.

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

The server runs on `http://localhost:5000` by default.



## Common Issues

### Request Hangs

**Cause**: Middleware doesn't call `next()` or send a response.

**Solution**: Always call `next()` or use `return res.send()`.

### Middleware Not Running

**Cause**: Defined after routes or not properly imported.

**Solution**: Define global middleware before routes.

### CORS Errors

**Cause**: Wrong origin URL or missing CORS middleware.

**Solution**: Ensure CORS middleware is configured with correct frontend URL.

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)
- [TypeScript with Express](https://www.typescriptlang.org/)

---

**Note**: This project uses TypeScript for type safety. Ensure all type definitions are properly installed and configured.