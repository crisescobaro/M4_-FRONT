"use client"


import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PageLanding() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0

    const colors = ['#ff00ff', '#00ffff', '#ff00aa', '#aa00ff', '#00ffaa']
    const particles: Particle[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1 // Reduced size for subtler effect
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX + (mouseX - canvas.width / 2) * 0.005
        this.y += this.speedY + (mouseY - canvas.height / 2) * 0.005

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    for (let i = 0; i < 150; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)' // This creates a trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
            Noah Store
          </h1>
          <p className="text-xl mb-8 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">
            El futuro del comercio electrónico está aquí
          </p>
          <Link href="/home" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white bg-opacity-10 backdrop-blur-md rounded-full text-lg font-semibold transition-all duration-300 hover:bg-opacity-20 hover:shadow-lg hover:shadow-white/30"
            >
              Bienvenido a la Experiencia
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-4 left-4 right-4 flex justify-between text-sm text-white text-opacity-70"
        >
          <span>© 2024 Noah Store</span>
          <span>Innovación • Calidad • Futuro</span>
        </motion.div>
      </div>
    </div>
  )
}

