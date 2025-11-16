import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import Header from './pages/Header'
import Layout from "../components/Layout";

const Register = lazy(() => import("../pages/Register"))
const Login = lazy(() => import("../pages/Login"))
const Default = lazy(() => import("../pages/Welcome"))
const Home = lazy(() => import("../pages/Home"))

export default function Router() {
  return (
    <BrowserRouter>

        {/* <Header /> */}
        
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>

              <Route path="/" element={<Layout />}>
                <Route index element={<Default />} />
                <Route path="home" element={<Home />} />
              </Route>

              {/* <Route path="/" element={<Default />} />
              <Route path="home" element={<Home />} /> */}

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          
            </Routes>
          </Suspense>
        </BrowserRouter>
  )
}
