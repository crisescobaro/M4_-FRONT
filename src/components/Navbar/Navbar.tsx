/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Smartphone, House , ShoppingBag, Search, Menu, X , Info, LogIn, ArchiveRestore } from 'lucide-react'
import { useAuth } from '@/contexts/ContextAuht'
import UserAvatar from '../AvatarUser/UserAvatar'
import CartStatus from "../StatusCart/CartStatus"

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSearchOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed w-full z-50">
      <div className="bg-black dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-light text-gray-300 neon-text">Noah Store</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/home" className="text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Dashboard
              </Link>
              <Link href="/iphone" className="text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Products
              </Link>
              <UserAvatar />
              <CartStatus />
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className="text-gray-300 hover:text-white neon-text focus:outline-none transition-colors duration-200"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link href="/cart" className="text-gray-300 hover:text-white neon-text focus:outline-none transition-colors duration-200 relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-gray-700 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-300 hover:text-white neon-text focus:outline-none transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-900 shadow-md p-4">
              <form onSubmit={(e) => { e.preventDefault(); /* Aquí iría la lógica de búsqueda */ }} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="flex-grow p-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <button
                  type="submit"
                  className="bg-gray-700 text-white p-2 rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900">
              <Link href="/home" className="flex items-center text-gray-300 hover:text-white neon-text hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">
                <House className="mr-3 h-5 w-5" />
                Home
              </Link>
              <Link href="/dashboard" className="flex items-center text-gray-300 hover:text-white neon-text hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">
                <Info className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/iphone" className="flex items-center text-gray-300 hover:text-white neon-text hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">
                <Smartphone className="mr-3 h-5 w-5" />
                Products
              </Link>
              <Link href="/login" className="flex items-center text-gray-300 hover:text-white neon-text hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">
                <LogIn className="mr-3 h-5 w-5" />
                Login
              </Link>
              <Link href="/register" className="flex items-center text-gray-300 hover:text-white neon-text hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">
                <ArchiveRestore className="mr-3 h-5 w-5" />
                Register
              </Link>
              <UserAvatar />
              <CartStatus />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .dark-gradient-background {
          background: linear-gradient(45deg, 
            #000000, #0a0a0a, #141414, #1e1e1e, #282828, 
            #323232, #3c3c3c, #464646, #505050, #5a5a5a 
          );
          background-size: 400% 400%;
          animation: subtleWave 15s ease infinite;
        }
        @keyframes subtleWave {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .neon-text {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </nav>
  )
}

export default Navbar
