# TypeScript Basics - Essential Guide

A clean, beginner-friendly guide to TypeScript fundamentals. Learn types, interfaces, functions, and more! 🚀

---

## 📑 Table of Contents

1. [What is TypeScript?](#what-is-typescript)
2. [Setup & Running TypeScript](#setup--running-typescript)
3. [Basic Types](#basic-types)
4. [Arrays & Tuples](#arrays--tuples)
5. [Objects & Interfaces](#objects--interfaces)
6. [Union Types](#union-types)
7. [Functions](#functions)
8. [Best Practices](#best-practices)

---

## What is TypeScript?

**TypeScript** is JavaScript with **static types**. It helps catch errors during development before running your code.

### Why Use TypeScript?

| Feature | JavaScript | TypeScript |
|---------|------------|------------|
| Type checking | ❌ Runtime only | ✅ Development time |
| Error detection | ❌ After running | ✅ While coding |
| IDE support | Basic | Advanced (autocomplete, hints) |
| Refactoring | Risky | Safe |

### Key Concept

```typescript
// JavaScript - No error until runtime
let age = 21
age = "Twenty one"  // ✅ Allowed, but may cause bugs later

// TypeScript - Error immediately
let age: number = 21
age = "Twenty one"  // ❌ Error: Type 'string' not assignable to 'number'
```

---

## Setup & Running TypeScript

### Step-by-Step Setup

#### 1. Initialize Node.js Project

```bash
# Create project folder
mkdir my-typescript-project
cd my-typescript-project

# Initialize package.json
npm init -y
```

#### 2. Install TypeScript

```bash
# Install TypeScript as dev dependency
npm install typescript --save-dev

# Install ts-node (optional - run TS directly)
npm install ts-node --save-dev
```

**Why `--save-dev`?**
- TypeScript is only needed during development
- Production uses compiled JavaScript
- Keeps production dependencies clean

#### 3. Initialize TypeScript Config

```bash
# Create tsconfig.json with default settings
npx tsc --init
```

This creates `tsconfig.json` with TypeScript configuration.

#### 4. Create Your First TypeScript File

```bash
# Create index.ts
touch index.ts
```

```typescript
// index.ts
let message: string = "Hello TypeScript!"
console.log(message)
```

### Running TypeScript

#### Method 1: Compile then Run (Standard)

```bash
# Compile TS → JS
npx tsc

# Run the compiled JS
node index.js
```

#### Method 2: Direct Run with ts-node

```bash
# Run TypeScript directly (no compilation step)
npx ts-node index.ts
```

**Benefit:** No need to compile manually!

#### Method 3: Watch Mode (Recommended for Development)

```bash
# Terminal 1: Auto-compile on save
npx tsc -w

# Terminal 2: Run the compiled output
node index.js
```

### Project Structure

After setup, your project looks like:

```
my-typescript-project/
├── node_modules/         # Dependencies
├── index.ts             # Your TypeScript code
├── index.js             # Compiled JavaScript (auto-generated)
├── package.json         # Project config
└── tsconfig.json        # TypeScript config
```

### Package.json Scripts

Add these scripts to `package.json` for easier commands:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "ts-node index.ts",
    "watch": "tsc -w",
    "start": "node index.js"
  }
}
```

Now you can use:

```bash
npm run build    # Compile TypeScript
npm run dev      # Run with ts-node
npm run watch    # Watch mode
npm start        # Run compiled JS
```

### Development Workflow

**Option A: Compile + Run**
```bash
# 1. Write code in index.ts
# 2. Compile
npx tsc
# 3. Run
node index.js
```

**Option B: Direct Run (Faster for Testing)**
```bash
# Write code in index.ts and run directly
npx ts-node index.ts
```

**Option C: Watch Mode (Best for Active Development)**
```bash
# Terminal 1: Keep this running
npx tsc -w

# Terminal 2: Run after each save
node index.js
```

### Quick Setup Commands Summary

```bash
# Complete setup in 4 commands:
npm init -y
npm install typescript --save-dev
npm install ts-node --save-dev
npx tsc --init

# Then create your file and run:
npx ts-node index.ts
```

---

## Basic Types

### 1. String

```typescript
let name: string = "Ilma"
console.log(name)  // Ilma

// ❌ Error
// name = 123  // Type 'number' is not assignable to type 'string'
```

### 2. Number

```typescript
let age: number = 21
console.log(age)  // 21

// ❌ Error
// age = "21"  // Type 'string' is not assignable to type 'number'
```

### 3. Boolean

```typescript
let isAdmin: boolean = true
console.log(isAdmin)  // true

// ❌ Error
// isAdmin = "true"  // Type 'string' is not assignable to type 'boolean'
```

### 4. Any (Avoid When Possible)

```typescript
let anything: any = "text"
console.log(anything)  // text

anything = 123
console.log(anything)  // 123

anything = true
console.log(anything)  // true
```

**⚠️ Warning:** `any` disables type checking. Use sparingly!

### Type Inference

TypeScript can automatically infer types:

```typescript
// Explicit type
let age: number = 21

// Type inference (TypeScript knows it's a number)
let age = 21  // Inferred as number

// Both are equivalent!
```

---

## Arrays & Tuples

### Arrays

```typescript
// Number array
let numbers: number[] = [1, 2, 3, 4, 5]
console.log(numbers)

// String array
let names: string[] = ["Alice", "Bob", "Charlie"]
console.log(names)

// Alternative syntax
let fruits: Array<string> = ["Apple", "Banana", "Orange"]
console.log(fruits)

// Any array (not recommended)
let mixed: any[] = [1, "text", true]
console.log(mixed)
```

**Array Operations:**

```typescript
let numbers: number[] = [1, 2, 3]

numbers.push(4)        // ✅ Allowed
// numbers.push("5")   // ❌ Error: string not assignable to number
```

### Tuples (Fixed-Length Arrays)

```typescript
// Tuple: [string, number]
let user: [string, number] = ["Ilma", 21]
console.log(user)  // ["Ilma", 21]

// ❌ Wrong order
// let user: [string, number] = [21, "Ilma"]  // Error!

// ❌ Wrong length
// let user: [string, number] = ["Ilma", 21, 21]  // Error!

// ✅ Correct for 3 elements
let user: [string, number, number] = ["Ilma", 21, 100]
```

**Key Points:**
- Fixed length
- Each position has specific type
- Order matters

---

## Objects & Interfaces

### Simple Object

```typescript
let person: { name: string; age: number } = {
  name: "Ilma",
  age: 21
}
console.log(person)
```

**Note:** Object properties separated by semicolons (`;`)

### Interface

```typescript
// Define structure
interface User {
  name: string
  age: number
  email: string
}

// Use interface
let userData: User = {
  name: "Ilma",
  age: 21,
  email: "ilma@example.com"
}
console.log(userData)

// ❌ Missing property
// let user: User = { name: "Ilma", age: 21 }  // Error: missing 'email'
```

### Optional Properties

```typescript
interface User {
  name: string
  age: number
  email?: string  // Optional (marked with ?)
}

// ✅ Valid without email
let user1: User = {
  name: "Ilma",
  age: 21
}

// ✅ Valid with email
let user2: User = {
  name: "Ilma",
  age: 21,
  email: "ilma@example.com"
}
```

### Type Alias

```typescript
type Student = {
  name: string
  school?: string  // Optional
}

let student1: Student = { name: "Ilma" }
console.log(student1)

let student2: Student = { name: "Ilma", school: "KMBMV" }
console.log(student2)
```

### Interface vs Type

| Feature | Interface | Type |
|---------|-----------|------|
| **Purpose** | Object shapes | Any type definition |
| **Can extend** | ✅ Yes | Limited |
| **Primitives** | ❌ No | ✅ Yes |
| **Unions** | ❌ No | ✅ Yes |
| **Best for** | Objects, classes | Everything else |

```typescript
// ✅ Interface for objects
interface User {
  name: string
  age: number
}

// ✅ Type for unions, primitives
type ID = string | number
type Status = "active" | "inactive"
```

### Enum

```typescript
enum Colors {
  RED,    // 0
  GREEN,  // 1
  BLUE    // 2
}

let bookColor: Colors = Colors.RED
console.log(bookColor)         // 0
console.log(Colors.RED)        // 0
console.log(Colors.GREEN)      // 1
console.log(Colors.BLUE)       // 2

// Custom values
enum Status {
  Active = 1,
  Inactive = 0,
  Pending = 2
}
```

---

## Union Types

### Single Variable Union

```typescript
let id: string | number | null

id = "A123"
console.log(id)  // A123

id = 456
console.log(id)  // 456

id = null
console.log(id)  // null

// ❌ Error
// id = true  // Type 'boolean' is not assignable
```

### Array Union

```typescript
let mixed: (number | string)[] = [1, 2, 3, "A", "B"]

mixed.push(4)      // ✅ Allowed
mixed.push("C")    // ✅ Allowed
// mixed.push(true)  // ❌ Error: boolean not allowed
console.log(mixed)
```

### Common Use Cases

```typescript
// API response that can be data or error
type Response = { data: string } | { error: string }

// ID that can be string or number
type ID = string | number

// Status with specific strings
type Status = "loading" | "success" | "error"
```

---

## Functions

### Basic Function

```typescript
// Define parameter types
function add(num1: number, num2: number) {
  return num1 + num2
}

let result = add(2, 3)
console.log(result)  // 5

// ❌ Error
// add("2", "3")  // Argument of type 'string' not assignable
```

### Function with Return Type

```typescript
// Explicit return type
function sum(num1: number, num2: number): number {
  return num1 + num2
}

let result: number = sum(5, 5)
console.log(result)  // 10

// ❌ Error
// function sum(): number {
//   return "10"  // Type 'string' not assignable to type 'number'
// }
```

### Optional Parameters

```typescript
// age? means optional
function greet(name: string, age?: number): string {
  return `Name: ${name} | Age: ${age ?? "Not provided"}`
}

console.log(greet("Ilma"))          // Name: Ilma | Age: Not provided
console.log(greet("Ilma", 21))      // Name: Ilma | Age: 21
```

**Arrow Function:**

```typescript
const greet = (name: string, age?: number): string => {
  return `Name: ${name} | Age: ${age ?? "Not provided"}`
}

console.log(greet("Ilma"))
console.log(greet("Ilma", 21))
```

### Default Parameters

```typescript
function multiply(a: number, b: number = 2): number {
  return a * b
}

console.log(multiply(6))        // 12 (6 * 2)
console.log(multiply(10, 5))    // 50 (10 * 5)
```

### Function Type Annotations

```typescript
// Function that takes two numbers and returns number
let calculator: (a: number, b: number) => number

calculator = (x, y) => x + y
console.log(calculator(5, 3))  // 8

calculator = (x, y) => x * y
console.log(calculator(5, 3))  // 15
```

### Void Return Type

```typescript
// Function that doesn't return anything
function logMessage(message: string): void {
  console.log(message)
  // No return statement
}

logMessage("Hello")
```

---

## Best Practices

### 1. Use Explicit Types When Needed

```typescript
// ✅ Good - Clear intent
function calculateTotal(price: number, tax: number): number {
  return price + tax
}

// ❌ Avoid any
function process(data: any) {
  return data
}
```

### 2. Prefer Interfaces for Objects

```typescript
// ✅ Good
interface User {
  name: string
  email: string
  age?: number
}

// ❌ Less readable
let user: { name: string; email: string; age?: number }
```

### 3. Use Union Types for Specific Values

```typescript
// ✅ Good - Limited options
type Status = "pending" | "approved" | "rejected"

// ❌ Too flexible
type Status = string
```

### 4. Avoid any When Possible

```typescript
// ❌ Bad - Loses type safety
function process(data: any) {
  return data.value
}

// ✅ Better - Use unknown or specific type
function process(data: unknown) {
  if (typeof data === "object" && data !== null) {
    return (data as { value: string }).value
  }
}
```

### 5. Use Type Inference

```typescript
// ❌ Redundant
let age: number = 21

// ✅ Better - TypeScript infers
let age = 21

// ✅ Explicit when needed
let age: number  // Declare without assignment
age = 21
```

### 6. Optional vs Undefined

```typescript
// ✅ Optional parameter
function greet(name: string, age?: number) {
  console.log(name, age)
}

// ✅ Undefined union
function greet(name: string, age: number | undefined) {
  console.log(name, age)
}

// Note: Optional is cleaner for parameters
```

---

## Quick Reference

### Type Syntax

```typescript
// Basic types
let str: string = "text"
let num: number = 123
let bool: boolean = true

// Arrays
let nums: number[] = [1, 2, 3]
let strs: Array<string> = ["a", "b"]

// Tuple
let tuple: [string, number] = ["text", 123]

// Union
let union: string | number = "text"

// Object
let obj: { name: string; age: number } = { name: "Ilma", age: 21 }

// Function
function fn(a: number, b: number): number {
  return a + b
}

// Optional
function fn(a: string, b?: number) {}

// Default
function fn(a: number, b: number = 10) {}
```

### Common Commands

```bash
# Compile single file
npx tsc index.ts

# Compile all files
npx tsc

# Watch mode (auto-compile)
npx tsc -w

# Run compiled JS
node index.js

# Initialize tsconfig.json
npx tsc --init
```

### tsconfig.json Basics

```json
{
  "compilerOptions": {
    "target": "ES6",           // Output JavaScript version
    "module": "commonjs",      // Module system
    "strict": true,            // Enable strict type checking
    "outDir": "./dist",        // Output directory
    "rootDir": "./src",        // Source directory
    "esModuleInterop": true    // Better module compatibility
  }
}
```

---

## Summary

### Key Takeaways

1. **TypeScript = JavaScript + Types**
   - Catches errors during development
   - Better IDE support and autocomplete

2. **Basic Types:**
   - `string`, `number`, `boolean`, `any`
   - Arrays: `number[]`, `string[]`
   - Tuples: `[string, number]`

3. **Structures:**
   - Interfaces for objects
   - Type aliases for flexibility
   - Unions for multiple types

4. **Functions:**
   - Type parameters and return types
   - Optional and default parameters

5. **Best Practices:**
   - Avoid `any` when possible
   - Use type inference
   - Prefer interfaces for objects
   - Use union types for specific values

### Remember

**TypeScript doesn't run in the browser or Node.js directly!**
- Write `.ts` files
- Compile to `.js` with `tsc`
- Run `.js` files

---

## Resources

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Try online
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Cheatsheet](https://www.typescriptlang.org/cheatsheets)

---

**Made with ❤️ for TypeScript Developers**

*Last Updated: 2025*

Happy coding! 🚀