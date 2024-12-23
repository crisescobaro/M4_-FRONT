"use client";

import { useAuth } from "../../contexts/ContextAuht";
import Image from "next/image";


export default function UserAvatar() {
    const { isAuthenticated , user, logout } = useAuth();

    return isAuthenticated ? (
        <div className="hidden md:flex items-center space-x-8">
          
          <Image
          src={"https://th.bing.com/th/id/R.7ea4af7d8401d2b43ee841bfa2abe89d?rik=xidyUKdveUKULQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-download-icons-logos-emojis-users-2240.png&ehk=2%2bOqgdMZqFkKaBclc%2fPL9B86vLju3iBGiFmH64kXaTM%3d&risl=&pid=ImgRaw&r=0"}
          width={30}
          height={30}
          alt={"userAvatar"}
          />


        <p className="text-2xl font-light text-gray-300 neon-text text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >Bienvenido {user?.name}!</p>
        <button className="text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        onClick={() => {
            logout();
        }}
        >
            Logout
        </button>
        <style jsx>{`
          
          .neon-text {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3);
          }
        `}</style>
        </div>
    ) : (
        <div className="hidden md:flex items-center space-x-8">
            <a href="/login" className="text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Login
            </a>
            <a href="/register" className="text-gray-300 hover:text-white neon-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Register
            </a>
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
        </div>
        
    );
}