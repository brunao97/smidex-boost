"use client"

import React, { CSSProperties, useEffect, useRef } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  lightWidth?: number
  duration?: number
  lightColor?: string
  borderWidth?: number
  className?: string
  [key: string]: unknown
}

export function BorderBeam({
  lightWidth = 200,
  duration = 10,
  lightColor = "#FAFAFA",
  borderWidth = 1,
  className,
  ...props
}: BorderBeamProps) {
  const pathRef = useRef<HTMLDivElement>(null)

  const updatePath = () => {
    if (pathRef.current) {
      const div = pathRef.current
      div.style.setProperty(
        "--path",
        `path("M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0")`
      )
    }
  }

  useEffect(() => {
    updatePath()
    window.addEventListener("resize", updatePath)

    return () => {
      window.removeEventListener("resize", updatePath)
    }
  }, [])

  return (
    <div
      style={
        {
          "--duration": duration,
          "--border-width": `${borderWidth}px`,
        } as CSSProperties
      }
      ref={pathRef}
      className={cn(
        `absolute inset-0 z-10 h-full w-full rounded-[inherit] pointer-events-none`,
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute aspect-square bg-[radial-gradient(ellipse_at_center,var(--light-color),transparent,transparent)]"
        style={
          {
            "--light-color": lightColor,
            "--light-width": `${lightWidth}px`,
            width: "var(--light-width)",
            offsetPath: "var(--path)",
          } as CSSProperties
        }
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}