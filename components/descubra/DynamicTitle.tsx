"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DynamicTitleProps {
    title?: string;
    className?: string;
}

export default function DynamicTitle({ title, className }: DynamicTitleProps) {
    const [dynamicWord, setDynamicWord] = useState("Conectada")
    const words = ["Conectada", "Acessível", "Inteligente"]
    const colors = ["text-blue-600", "text-green-600", "text-purple-600"]

    useEffect(() => {
        const interval = setInterval(() => {
            setDynamicWord((prevWord) => {
                const currentIndex = words.indexOf(prevWord)
                return words[(currentIndex + 1) % words.length]
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 ${className || ''}`}>
            {title || "Aveiro Mais Conectada"}
            <AnimatePresence mode="wait">
                <motion.span
                    key={dynamicWord}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`${colors[words.indexOf(dynamicWord)]}`}
                >
                    {dynamicWord}
                </motion.span>
            </AnimatePresence>
        </h2>
    )
}

