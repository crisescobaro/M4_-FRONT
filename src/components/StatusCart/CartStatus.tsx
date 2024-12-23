"use client"


import { useCart } from "../../contexts/ContextCart";

export default function CartStatus() {
    const { items } = useCart();
    return <p className="text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Productos: {items.length} 
    
    <style jsx>{`
           
          .neon-text {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3);
          }
        `}</style>
    </p>
}