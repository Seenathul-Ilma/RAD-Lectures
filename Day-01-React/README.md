# React Basics & Project Structure - Complete Guide

A comprehensive guide to React fundamentals, props, components, styling, and understanding every file in your React project! 🚀

---

## 📑 Table of Contents

1. [React Project Setup](#react-project-setup)
2. [Project Structure Explained](#project-structure-explained)
3. [React Basics](#react-basics)
4. [Props & Children](#props--children)
5. [Styling in React](#styling-in-react)
6. [Component Communication](#component-communication)
7. [Quick Reference](#quick-reference)

---

## React Project Setup

### Prerequisites

Before starting, make sure you have:
- **Node.js** installed (v16 or higher) - [Download here](https://nodejs.org/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)
- Basic command line knowledge

Check Node.js installation:
```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show v8.x.x or higher
```

---

### Step-by-Step Setup Guide

#### Step 1: Open Command Prompt/Terminal

```bash
# Navigate to where you want to create your project
# Example: Desktop, Documents, or a Projects folder
cd Desktop
```

Or **right-click in folder** → **Open in Terminal** (Windows 11) or **Git Bash Here**

---

#### Step 2: Create Vite Project

```bash
npm create vite@latest
```

You'll be prompted with questions:

```
? Project name: › vite-project
```
**Type your project name:** `my-react-app` (or any name you want)

```
? Select a framework: › 
  Vanilla
  Vue
❯ React      ← Select this (use arrow keys)
  Preact
  Lit
  Svelte
  Solid
  Qwik
  Others
```
**Select:** `React` (press Enter)

```
? Select a variant: › 
  TypeScript
❯ TypeScript + SWC    ← Select this (recommended)
  JavaScript
  JavaScript + SWC
```
**Select:** `TypeScript + SWC` (press Enter)

**Result:**
```
Scaffolding project in /Desktop/my-react-app...

Done. Now run:

  cd my-react-app
  npm install
  npm run dev
```

---

#### Step 3: Navigate to Project Folder

```bash
cd my-react-app
```

---

#### Step 4: Install Dependencies

```bash
npm install
```

**What happens:**
- Downloads all required packages
- Creates `node_modules/` folder
- Creates `package-lock.json`
- Takes 30-60 seconds

**Output:**
```
added 150 packages in 45s
```

---

#### Step 5: Open Project in VS Code

```bash
code .
```

**Alternative methods:**
- Open VS Code → File → Open Folder → Select your project
- Drag project folder into VS Code

---

#### Step 6: Start Development Server

In VS Code terminal (or command prompt):

```bash
npm run dev
```

**Output:**
```
  VITE v6.0.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

#### Step 7: Open in Browser

Open your browser and go to:
```
http://localhost:5173/
```

You should see the default Vite + React page! 🎉

---

### Complete Setup Commands (Quick Copy)

```bash
# 1. Create project
npm create vite@latest

# Answer prompts:
# - Project name: my-react-app
# - Framework: React
# - Variant: TypeScript + SWC

# 2. Navigate to project
cd my-react-app

# 3. Install dependencies
npm install

# 4. Open in VS Code
code .

# 5. Start dev server
npm run dev
```

---

### One-Line Alternative (Advanced)

```bash
# Create project with all options in one command
npm create vite@latest my-react-app -- --template react-ts

# Then:
cd my-react-app
npm install
code .
npm run dev
```

---

### Verify Installation

After running `npm run dev`, you should see:

✅ **Terminal shows:**
```
VITE v6.0.1  ready in 500 ms
➜  Local:   http://localhost:5173/
```

✅ **Browser shows:**
- Vite + React logo
- "Vite + React" heading
- Counter button that increments

✅ **VS Code shows:**
```
my-react-app/
├── node_modules/
├── public/
├── src/
├── index.html
├── package.json
└── vite.config.ts
```

---

### Common Commands After Setup

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint (check code quality)
npm run lint

# Install new package
npm install package-name

# Install dev dependency
npm install package-name --save-dev

# Stop development server
# Press: Ctrl + C (in terminal)
```

---

### Troubleshooting

#### Port 5173 Already in Use

```bash
# Error: Port 5173 is already in use
# Solution 1: Kill the process using that port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <process-id> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill

# Solution 2: Use different port
npm run dev -- --port 3000
```

#### Permission Denied

```bash
# Windows: Run as administrator
# Mac/Linux: Use sudo
sudo npm install
```

#### Module Not Found

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Vite Command Not Found

```bash
# Install Vite globally
npm install -g vite

# Or use npx
npx vite
```

---

### VS Code Extensions (Recommended)

Install these for better React development:

1. **ES7+ React/Redux/React-Native snippets**
   - Quick component creation with `rfc`, `rafce`

2. **ESLint**
   - Real-time error detection

3. **Prettier - Code formatter**
   - Auto-format on save

4. **Auto Rename Tag**
   - Auto-rename paired HTML/JSX tags

5. **Path Intellisense**
   - Autocomplete file paths

**Install from:** VS Code Extensions panel (Ctrl+Shift+X)

---

### Project Created! What's Next?

1. **Clean up default files** (optional)
   ```bash
   # Delete unnecessary files
   rm src/App.css
   rm public/vite.svg
   ```

2. **Start coding in `src/App.tsx`**

3. **Create components** in `src/components/`

4. **Add styles** in `src/index.css`

5. **Check browser** - changes appear instantly!

---

### Development Workflow

```
1. Edit code in VS Code
   ↓
2. Save file (Ctrl+S)
   ↓
3. Browser auto-refreshes (Hot Module Replacement)
   ↓
4. See changes instantly!
```

**No manual refresh needed!** Vite's HMR updates instantly.

---

## Project Structure Explained

### Complete Project Structure

```
my-react-app/
├── node_modules/          # Dependencies (auto-generated)
├── public/                # Static files
├── src/                   # Source code
│   ├── components/        # Reusable components
│   │   └── Details.tsx
│   ├── App.tsx           # Main app component
│   ├── App.css           # App component styles
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Project metadata & scripts
├── package-lock.json     # Exact dependency versions
├── tsconfig.json         # TypeScript config (main)
├── tsconfig.app.json     # TypeScript config (app)
├── tsconfig.node.json    # TypeScript config (node)
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

### File-by-File Explanation

#### 📁 **node_modules/**
**Purpose:** Contains all installed npm packages/dependencies

**Details:**
- Auto-generated when you run `npm install`
- Never manually edit files here
- Can be deleted and regenerated with `npm install`
- Listed in `.gitignore` (not committed to Git)
- Can be very large (100-500MB+)

**Why it exists:** Your project needs external libraries (React, TypeScript, etc.). These are stored here.

---

#### 📁 **public/**
**Purpose:** Static assets that don't need processing

**Details:**
- Files served as-is to the browser
- Typically contains: images, fonts, favicon
- Access files via absolute path: `/logo.png`
- Not processed by Vite/Webpack

**Example:**
```
public/
├── favicon.ico       # Browser tab icon
├── logo.png          # Company logo
└── robots.txt        # SEO rules for crawlers
```

---

#### 📁 **src/**
**Purpose:** All your React source code

**Details:**
- Main working directory
- Contains components, styles, logic
- Files here are processed/bundled by Vite
- Hot Module Replacement (HMR) works here

---

#### 📁 **src/components/**
**Purpose:** Reusable React components

**Details:**
- Keep components organized
- One component per file
- Use PascalCase for filenames: `Details.tsx`, `Header.tsx`

**Example:**
```typescript
// src/components/Details.tsx
export default function Details(props: any) {
  return (
    <div>
      <h1>This is the Detail component</h1>
      {props.children}
      <h5>{props.name}</h5>
      <h5>{props.age}</h5>
    </div>
  )
}
```

---

#### 📄 **src/App.tsx**
**Purpose:** Main application component (root component)

**Details:**
- Entry point for your React app
- Imports and uses other components
- Renders the main UI structure

**Key Points:**
- Use `className` instead of `class` (reserved keyword in JS)
- JSX = JavaScript XML (HTML-like syntax in JS)
- Import components at the top

```typescript
import Details from './components/Details'

export default function App() {
  return (
    <>
      <Details name="Ilma" age={21} />
      <h1>Hello, React!</h1>
    </>
  )
}
```

---

#### 📄 **src/App.css**
**Purpose:** Styles specific to App component

**Details:**
- Scoped to App.tsx (by convention, not enforced)
- Can be imported in App.tsx
- Uses regular CSS syntax

```css
.app-container {
  max-width: 1200px;
  margin: 0 auto;
}
```

---

#### 📄 **src/index.css**
**Purpose:** Global styles for entire application

**Details:**
- Applied to all components
- Good for: resets, global fonts, variables
- Imported in main.tsx

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.test {
  background-color: aquamarine;
  color: blue;
}
```

---

#### 📄 **src/main.tsx**
**Purpose:** Application entry point (connects React to HTML)

**Details:**
- Renders React app into HTML
- Imports App component
- Sets up React root
- Wraps app in StrictMode (development checks)

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Flow:**
1. Finds `<div id="root">` in index.html
2. Renders `<App />` component inside it
3. StrictMode adds development warnings

---

#### 📄 **.gitignore**
**Purpose:** Tells Git which files to ignore

**Details:**
- Prevents committing unnecessary files
- Common ignores: node_modules, build files, env files

```
# dependencies
node_modules/

# build output
dist/
build/

# environment files
.env
.env.local

# IDE files
.vscode/
.idea/
```

---

#### 📄 **eslint.config.js**
**Purpose:** Code quality and style rules

**Details:**
- Catches common errors
- Enforces coding standards
- Works with VS Code ESLint extension

```javascript
export default {
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off'
  }
}
```

**Benefits:**
- Catches bugs before runtime
- Consistent code style across team
- Integrated with IDE

---

#### 📄 **index.html**
**Purpose:** HTML template for your app

**Details:**
- Entry point for the browser
- Contains `<div id="root"></div>` where React mounts
- Only HTML file in the project

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Key Points:**
- `<div id="root">` is where React renders
- `<script>` loads main.tsx (React entry point)
- Vite handles the module loading

---

#### 📄 **package.json**
**Purpose:** Project metadata and configuration

**Details:**
- Project name, version, description
- Dependencies (production)
- DevDependencies (development only)
- Scripts for common tasks

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "typescript": "~5.6.2",
    "vite": "^6.0.1"
  }
}
```

**Key Sections:**
- `dependencies` - Required for production
- `devDependencies` - Only needed during development
- `scripts` - Commands you can run with `npm run`

---

#### 📄 **package-lock.json**
**Purpose:** Locks exact versions of dependencies

**Details:**
- Auto-generated by npm
- Ensures everyone installs same versions
- Never manually edit this file
- Commit to Git for consistency

**Why it matters:**
- Prevents "works on my machine" issues
- Reproducible builds
- Security through version control

---

#### 📄 **tsconfig.json**
**Purpose:** Main TypeScript configuration

**Details:**
- Compiler options
- Which files to include/exclude
- Module resolution settings

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

---

#### 📄 **tsconfig.app.json**
**Purpose:** TypeScript config for application code

**Details:**
- Extends base tsconfig.json
- Specific settings for src/ code
- Used by Vite during build

```json
{
  "extends": "./tsconfig.json",
  "include": ["src"]
}
```

---

#### 📄 **tsconfig.node.json**
**Purpose:** TypeScript config for Node.js scripts

**Details:**
- Used for build scripts and config files
- Different from app code (no DOM)

```json
{
  "extends": "./tsconfig.json",
  "include": ["vite.config.ts"]
}
```

---

#### 📄 **vite.config.ts**
**Purpose:** Vite bundler configuration

**Details:**
- Build settings
- Plugin configuration
- Development server options

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // Change dev server port
  }
})
```

**What is Vite?**
- Modern build tool (faster than Webpack)
- Hot Module Replacement (instant updates)
- Optimized production builds

---

#### 📄 **README.md**
**Purpose:** Project documentation

**Details:**
- Project description
- Setup instructions
- Usage guide
- Contributing guidelines

---

## React Basics

### What is React?

React is a JavaScript library for building user interfaces using **components**.

### Key Concepts

#### 1. Components

Components are reusable pieces of UI:

```typescript
// Function component (modern)
export default function MyComponent() {
  return <h1>Hello!</h1>
}
```

#### 2. JSX (JavaScript XML)

HTML-like syntax in JavaScript:

```typescript
const element = <h1>Hello, React!</h1>

// JSX allows JavaScript expressions
const name = "Ilma"
const greeting = <h1>Hello, {name}!</h1>
```

#### 3. Fragments

Group elements without extra DOM nodes:

```typescript
// Using <> ... </>
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
)

// Full syntax
return (
  <React.Fragment>
    <h1>Title</h1>
    <p>Content</p>
  </React.Fragment>
)
```

---

## Props & Children

### What are Props?

Props (properties) pass data from parent to child components.

### Basic Props

```typescript
// Parent component (App.tsx)
export default function App() {
  return (
    <Details name="Ilma Musawwir" age={21} />
  )
}

// Child component (Details.tsx)
export default function Details(props: any) {
  return (
    <div>
      <h5>{props.name}</h5>    {/* Ilma Musawwir */}
      <h5>{props.age}</h5>     {/* 21 */}
    </div>
  )
}
```

### Props with TypeScript

```typescript
// Define prop types
interface DetailsProps {
  name: string
  age: number
}

export default function Details({ name, age }: DetailsProps) {
  return (
    <div>
      <h5>{name}</h5>
      <h5>{age}</h5>
    </div>
  )
}
```

### props.children

`props.children` is a special prop that represents content between component tags:

```typescript
// Parent (App.tsx)
export default function App() {
  return (
    <Details>
      {/* This content becomes props.children */}
      <ul>
        <li>Java</li>
        <li>Python</li>
        <li>C#</li>
      </ul>
    </Details>
  )
}

// Child (Details.tsx)
export default function Details(props: any) {
  return (
    <div>
      <h1>This is the detail component</h1>
      {/* Renders the <ul> list from parent */}
      {props.children}
    </div>
  )
}
```

### Props Flow Visualization

```
App (Parent)
  ↓ props: name="Ilma", age=21
Details (Child)
  ↓ renders
<div>
  <h5>Ilma</h5>
  <h5>21</h5>
</div>
```

### Props with Children Example

```typescript
// Parent
<Details name="Ilma" age={21}>
  <p>This is children content</p>
</Details>

// Child receives:
// props.name = "Ilma"
// props.age = 21
// props.children = <p>This is children content</p>
```

---

## Styling in React

### Three Ways to Style Components

#### 1. Inline Styles

```typescript
export default function App() {
  return (
    <h1 style={{
      backgroundColor: "red",    // camelCase, not kebab-case
      color: "aquamarine",
      padding: "20px"
    }}>
      Hello, React!
    </h1>
  )
}
```

**Key Points:**
- Use camelCase: `backgroundColor` not `background-color`
- Double curly braces: `{{ }}` (outer = JSX expression, inner = object)
- Values as strings: `"20px"` or numbers: `{20}`

#### 2. CSS Classes (External Stylesheet)

```typescript
// App.tsx
import './index.css'

export default function App() {
  let username = "Ilma"
  
  return (
    <>
      {/* className, NOT class (reserved keyword) */}
      <h2 className="test">My Web Application</h2>
      <h2 className="test">{username}</h2>
    </>
  )
}
```

```css
/* index.css */
.test {
  background-color: aquamarine;
  color: blue;
  padding: 10px;
}
```

**Why `className` instead of `class`?**
- `class` is a reserved keyword in JavaScript
- React uses `className` to avoid conflicts

#### 3. CSS Modules (Scoped Styles)

```typescript
// App.module.css
.container {
  background-color: lightblue;
}

// App.tsx
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.container}>
      Scoped styles!
    </div>
  )
}
```

### Styling Comparison

| Method | Scope | Use Case |
|--------|-------|----------|
| Inline | Single element | Quick styles, dynamic values |
| External CSS | Global | Site-wide styles, reusable classes |
| CSS Modules | Component | Component-specific styles |

---

## Component Communication

### Parent → Child (Props)

```typescript
// Parent sends data down
<Details name="Ilma" age={21} />
```

### Child → Parent (Callback Functions)

```typescript
// Parent
function App() {
  const handleClick = (message: string) => {
    console.log(message)
  }
  
  return <Child onButtonClick={handleClick} />
}

// Child
function Child({ onButtonClick }: any) {
  return (
    <button onClick={() => onButtonClick("Hello from child!")}>
      Click Me
    </button>
  )
}
```

### Sibling Communication

Use common parent to share state:

```typescript
function Parent() {
  const [data, setData] = useState("")
  
  return (
    <>
      <ChildA onUpdate={setData} />
      <ChildB data={data} />
    </>
  )
}
```

---

## Quick Reference

### Component Template

```typescript
import React from 'react'

interface Props {
  // Define props here
}

export default function MyComponent({ }: Props) {
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
```

### Common JSX Rules

```typescript
// ✅ Correct
<div className="container">Content</div>
<input type="text" />
<img src="/logo.png" alt="Logo" />

// ❌ Wrong
<div class="container">Content</div>  // Use className
<input type="text">                   // Self-closing tags need />
<img src="/logo.png">                 // Must be self-closed
```

### Props Patterns

```typescript
// Basic props
<Component name="Ilma" age={21} />

// Props with children
<Component>
  <p>Content</p>
</Component>

// Spread props
const props = { name: "Ilma", age: 21 }
<Component {...props} />

// Conditional props
<Component isActive={true} data={condition ? "yes" : "no"} />
```

---

## Summary

### Key Takeaways

**Project Structure:**
- `src/` - Your code
- `public/` - Static files
- `node_modules/` - Dependencies
- Config files - Setup and rules

**React Basics:**
- Components = Reusable UI pieces
- JSX = HTML-like syntax in JS
- Props = Data from parent to child
- props.children = Content between tags

**Styling:**
- Inline: `style={{}}` with camelCase
- External: `className` with CSS files
- CSS Modules: Scoped styles

**Best Practices:**
- Use `className` not `class`
- One component per file
- Props flow down (parent → child)
- Keep components small and focused

---

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript + React](https://react-typescript-cheatsheet.netlify.app)

---

**Made with ❤️ for React Developers**

*Last Updated: 2025*

Happy coding! 🚀