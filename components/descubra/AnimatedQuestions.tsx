"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const questions = [
    {
        text: "Quais eventos que irão acontecer neste final de semana?",
        persona: "elder",
        label: "Idoso",
        color: "from-purple-500/20 to-purple-500/10",
        textColor: "text-purple-300",
        glowColor: "purple",
        borderColor: "border-purple-500/30"
    },
    {
        text: "Quais beneficios a cidade oferece para estudantes?",
        persona: "student",
        label: "Estudante",
        color: "from-blue-500/20 to-blue-500/10",
        textColor: "text-blue-300",
        glowColor: "blue",
        borderColor: "border-blue-500/30"
    },
    {
        text: "Onde devo visitar?",
        persona: "tourist",
        label: "Turista",
        color: "from-yellow-500/20 to-yellow-500/10",
        textColor: "text-yellow-300",
        glowColor: "yellow",
        borderColor: "border-yellow-500/30"
    },
    {
        text: "Como está o trânsito no centro?",
        persona: "localtraffic",
        label: "Locais",
        color: "from-red-500/20 to-red-500/10",
        textColor: "text-red-300",
        glowColor: "red",
        borderColor: "border-red-500/30"
    },
    {
        text: "Quais documentos preciso para abrir minha empresa?",
        persona: "resident",
        label: "Empreendedor",
        color: "from-green-500/20 to-green-500/10",
        textColor: "text-green-300",
        glowColor: "green",
        borderColor: "border-green-500/30"
    }
]

export default function AnimatedQuestions() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % questions.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full max-w-lg">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center space-y-6"
                >
                    <Card className={`
                        w-full p-6 
                        bg-gradient-to-br from-gray-700 to-gray-800 
                        backdrop-blur-sm 
                        border-2 ${questions[currentIndex].borderColor}
                        shadow-xl rounded-xl 
                        relative overflow-hidden
                    `}>
                        {/* Background blur effects */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className={`absolute w-[200px] h-[200px] -top-20 -right-20 ${questions[currentIndex].color} rounded-full blur-3xl opacity-20`} />
                            <div className={`absolute w-[200px] h-[200px] -bottom-20 -left-20 ${questions[currentIndex].color} rounded-full blur-3xl opacity-20`} />
                        </div>

                        <div className="flex flex-col items-center space-y-6 relative z-10">
                            <div className="relative w-full px-2">
                                <div 
                                    className={`
                                        bg-gray-700/80 
                                        p-5 rounded-2xl shadow-lg relative mb-6
                                        border border-gray-600
                                        backdrop-blur-sm
                                    `}
                                >
                                    <p className="text-base md:text-lg font-medium text-gray-200 text-center leading-relaxed">
                                        &ldquo;{questions[currentIndex].text}&rdquo;
                                    </p>
                                    {/* Speech bubble triangle */}
                                    <div 
                                        className={`
                                            absolute -bottom-3 left-1/2 transform -translate-x-1/2 
                                            w-6 h-6 rotate-45
                                            bg-gray-700/80
                                            border-b border-r border-gray-600
                                            backdrop-blur-sm
                                        `} 
                                    />
                                </div>
                            </div>
                            <div className={`
                                relative w-28 h-28 
                                transition-transform duration-300 
                                hover:scale-105
                                after:absolute 
                                after:inset-0 
                                after:bg-${questions[currentIndex].glowColor}-500/10 
                                after:blur-xl 
                                after:rounded-full
                            `}>
                                <Image
                                    src={`/personas/${questions[currentIndex].persona}.svg`}
                                    alt={questions[currentIndex].label}
                                    fill
                                    className="object-contain drop-shadow-lg relative z-10"
                                />
                            </div>
                            <p className={`
                                text-sm font-medium px-3 py-1.5 
                                rounded-full backdrop-blur-sm 
                                border ${questions[currentIndex].borderColor}
                                bg-gray-800/80 
                                ${questions[currentIndex].textColor}
                                shadow-sm
                                transition-colors
                            `}>
                                {questions[currentIndex].label}
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-4 space-x-2">
                {questions.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                            index === currentIndex 
                                ? questions[currentIndex].textColor.replace('text', 'bg')
                                : 'bg-gray-300'
                        }`}
                        animate={{
                            scale: index === currentIndex ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
        </div>
    )
}

