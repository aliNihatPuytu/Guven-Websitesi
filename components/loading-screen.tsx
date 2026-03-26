"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Wait for window load event to ensure all resources are loaded
    const handleLoad = () => {
      // Start fade out animation
      setIsFading(true)
      // Remove loading screen after fade animation completes
      setTimeout(() => {
        setIsLoading(false)
      }, 600)
    }

    // Check if already loaded
    if (document.readyState === "complete") {
      // Add minimum display time for brand presence
      setTimeout(handleLoad, 800)
    } else {
      window.addEventListener("load", () => {
        setTimeout(handleLoad, 800)
      })
    }

    return () => {
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-[600ms] ease-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo Container */}
      <div className="flex flex-col items-center gap-6 px-4">
        {/* Company Logo */}
        <div className="relative w-48 h-16 sm:w-64 sm:h-20 md:w-80 md:h-24 lg:w-96 lg:h-28">
          <Image
            src="/images/logo-blue.png"
            alt="GÜVEN İş ve İstif Makinaları"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Loading Animation - Thin Progress Bar */}
        <div className="w-48 md:w-64 h-0.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1E5AA8] rounded-full animate-loading-bar"
          />
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
