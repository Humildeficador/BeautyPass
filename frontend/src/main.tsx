import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './Home.tsx'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.tsx'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>
  // </StrictMode>
)
