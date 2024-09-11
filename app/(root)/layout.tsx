import React from 'react'
import NavBar from './components/nav-bar'
import Footer from './components/footer'
import AuthProvider from '../context/AuthProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <NavBar />
        {children}
        <Footer />
      </AuthProvider>
    </>
  )
}
