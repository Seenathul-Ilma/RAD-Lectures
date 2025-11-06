# React Router - Component-Based Routing

A simple example showing how to add multiple pages to your React app using React Router.

## Overview

This project showcases **Part 01** of React routing: basic component-based routing using JSX declarations. Routes are defined directly in the component tree, making them easy to understand and maintain for small to medium-sized applications.

## What This Project Does

This project shows you how to create a **multi-page React app** without page reloads. When you click a link, the content changes instantly without refreshing the browser.

**Example:**
- Click "Home" → Shows Home page
- Click "About" → Shows About page
- Click "Login" → Shows Login page

All without reloading! 🚀

## Features

- **Declarative Routing**: Routes defined as JSX elements
- **Nested Routes**: Layout wrapper with shared header
- **Dynamic Parameters**: URL parameter extraction with `useParams()`
- **Client-Side Navigation**: Link components for SPA navigation

## What You'll Learn

1. How to set up React Router
2. How to create different pages
3. How to add navigation links
4. How to share a header across multiple pages
5. How to use dynamic URLs (like `/contact/123`)

## File Structure

```
src/
├── App.tsx                 # Main routing configuration (Where you define all routes)
├── components/
│   ├── Header.tsx         # Navigation bar with Links (Home, About, etc.)
│   └── Layout.tsx         # Wrapper component with Outlet (Adds Header to pages)
└── pages/
    ├── Default.tsx        # Index route (/) - The first page you see
    ├── Home.tsx           # Home page (/home)
    ├── About.tsx          # About page (/about)
    ├── Login.tsx          # Login page (/login) - No layout
    └── Contact.tsx        # Contact page with dynamic ID (/contact/:id)
```

## How It Works

### Step 1: Set Up Routes (App.tsx)

Think of routes like a map:
- "If user goes to `/home`, show the Home page"
- "If user goes to `/about`, show the About page"

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Default />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/contact/:id" element={<Contact />} />
  </Routes>
</BrowserRouter>
```

**What's happening here:**
- `<BrowserRouter>` wraps everything and watches the URL
- `<Routes>` is the container holding all your routes
- Nested `<Route>` elements inside `<Layout />` will share the header
- Independent routes like `/login` stand alone without the layout

### Step 2: Create a Shared Layout (Layout.tsx)

Some pages need a header, some don't. The Layout component adds a header automatically:

```typescript
<div>
  <Header />
  <main>
    <Outlet />
  </main>
</div>
```

**How it works:**
- `<Header />` appears on every page using this Layout
- `<Outlet />` is a placeholder that renders the matched child route
- When you visit `/home`, the `<Home />` component appears inside `<Outlet />`

**Pages with Header:** Default, Home, About  
**Pages without Header:** Login, Contact

### Step 3: Add Navigation Links (Header.tsx)

Use `<Link>` instead of regular `<a>` tags. This changes the page **without reloading**:

```typescript
<Link to="/">Default</Link>
<Link to="/home">Home</Link>
<Link to="/about">About</Link>
```

**Why `<Link>` instead of `<a>`?**
- `<Link>` updates the URL without refreshing the browser
- Your app feels instant and smooth
- React Router handles everything behind the scenes

### Step 4: Use Dynamic URLs (Contact.tsx)

Sometimes you need URLs like `/contact/123` or `/contact/456`. The number changes!

```typescript
<Route path="/contact/:id" element={<Contact />} />

const { id } = useParams();
```

**In practice:**
- URL: `/contact/123` → `id = "123"`
- URL: `/contact/abc` → `id = "abc"`
- Perfect for user profiles, product pages, blog posts, etc.

## Route Configuration

### Layout Routes (with Header)
- `/` - Default landing page
- `/home` - Home page
- `/about` - About page

### Independent Routes (without Layout)
- `/login` - Login page
- `/contact/:id` - Contact page with dynamic ID parameter

## Getting Started

1. **Install React Router:**
```bash
npm install react-router-dom
```

2. **Run your app:**
```bash
npm run dev
```

3. **Try it out:**
   - Go to `http://localhost:5173/`
   - Click the navigation links
   - Try typing `/contact/999` in the URL

## URL Examples

| URL | What You See |
|-----|--------------|
| `/` | Default page (with header) |
| `/home` | Home page (with header) |
| `/about` | About page (with header) |
| `/login` | Login page (NO header) |
| `/contact/123` | Contact page showing "Contact: 123" |
| `/contact/abc` | Contact page showing "Contact: abc" |

## Key Concepts Explained

### `<BrowserRouter>`
The boss component that wraps your entire app and keeps the UI in sync with the URL.

### `<Routes>`
Container holding all your route definitions. Like a phone book for pages.

### `<Route>`
Maps a URL path to a component.
```typescript
<Route path="/about" element={<About />} />
```

### `<Link>`
Like `<a>` but doesn't reload the page. Provides smooth client-side navigation.
```typescript
<Link to="/home">Home</Link>
```

### `<Outlet>`
Placeholder that renders the matched child route. Used inside Layout to show different pages.

### `useParams()`
Hook that reads dynamic parts from the URL.
```typescript
const { id } = useParams();
```

## Common Patterns

### Pattern 1: Index Route
```typescript
<Route index element={<Default />} />
```
Shows `<Default />` when the path exactly matches the parent route (`/`)

### Pattern 2: Nested Routes
```typescript
<Route path="/" element={<Layout />}>
  <Route path="home" element={<Home />} />
</Route>
```
`<Home />` appears inside `<Layout />`'s `<Outlet />` - inheriting the shared header

### Pattern 3: Independent Route
```typescript
<Route path="/login" element={<Login />} />
```
`<Login />` stands alone without using Layout (no header)

## Flow Summary

1. `<BrowserRouter>` listens to URL changes
2. `<Routes>` contains all route definitions
3. `<Route>` with `<Layout />` acts as a wrapper for nested routes
4. `<Outlet />` in Layout dynamically renders the matched child component
5. `<Link>` components update URLs without page reloads
6. `useParams()` extracts dynamic URL parameters

## When to Use This Pattern

✅ **Perfect for:**
- Your first routing project
- Simple routing setups
- Small to medium-sized projects (5-20 pages)
- Learning React Router basics
- Quick prototypes and demos
- Personal projects and portfolios

❌ **Consider alternatives when you need:**
- Data loaders before rendering pages
- Form actions and mutations
- Code splitting and lazy loading
- Building large apps (50+ pages)
- Advanced data fetching patterns
- Authentication flows

## Troubleshooting

**Problem:** Links don't work  
**Solution:** Make sure `<BrowserRouter>` wraps your `<Routes>`

**Problem:** Page reloads when clicking links  
**Solution:** Use `<Link>` not `<a>` tags

**Problem:** "Cannot GET /home" error  
**Solution:** Your server needs to redirect all routes to index.html (Vite does this automatically in dev mode)

**Problem:** Header shows on Login page  
**Solution:** Move Login route outside the `<Layout>` route

**Problem:** `useParams()` returns undefined  
**Solution:** Make sure your route path includes the parameter (`:id`) and matches the URL

---

**Note:** This is a learning project demonstrating fundamental React Router concepts. For production applications with complex routing needs, consider the Data Router API with loaders and actions.

**Remember:** Master these basics first before moving to advanced patterns. Happy routing! 🎉