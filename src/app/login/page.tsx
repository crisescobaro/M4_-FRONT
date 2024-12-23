'use client'

import { useState, useEffect } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Home() {
  
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <main className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ease-in-out bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full transition-colors duration-300 ease-in-out"
          >
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
