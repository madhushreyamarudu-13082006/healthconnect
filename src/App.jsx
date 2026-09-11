import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './firebase'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Camps from './components/Camps'
import About from './components/About'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setCheckingAuth(false)

      if (currentUser) {
        setPage('dashboard')
      }
    })

    return () => unsubscribe()
  }, [])

  const showHome = () => {
    setPage('home')
    window.scrollTo(0, 0)
  }

  const showLogin = () => {
    setPage('login')
    window.scrollTo(0, 0)
  }

  const showRegister = () => {
    setPage('register')
    window.scrollTo(0, 0)
  }

  const showDashboard = () => {
    setPage('dashboard')
    window.scrollTo(0, 0)
  }

  const showCamps = () => {
    setPage('home')

    setTimeout(() => {
      document.getElementById('camps')?.scrollIntoView({
        behavior: 'smooth'
      })
    }, 100)
  }

  if (checkingAuth) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        Loading HealthConnect...
      </div>
    )
  }

  return (
    <>
      <Navbar
        onHome={showHome}
        onLogin={showLogin}
      />

      {page === 'login' ? (
        <Login
          onRegister={showRegister}
          onLoginSuccess={showDashboard}
        />
      ) : page === 'register' ? (
        <Register
          onLogin={showLogin}
        />
      ) : page === 'dashboard' && user ? (
        <Dashboard
          onExploreCamps={showCamps}
        />
      ) : (
        <>
          <Hero />
          <Features />
          <Camps />
          <About />
        </>
      )}

      <Footer />
    </>
  )
}

export default App