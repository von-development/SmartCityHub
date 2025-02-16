"use client"

// Importing necessary components and libraries
import Image from "next/image" // Image component for optimized images
import { motion } from "framer-motion" // For animations
import { Badge } from "@/components/ui/badge" // Badge component for labels
import { Button } from "@/components/ui/button" // Button component for actions
import { Card } from "@/components/ui/card" // Card component for displaying features
import { ArrowRight, MapPin, MessageSquare, Zap } from "lucide-react" // Icons for UI
import AnimatedQuestions from "@/components/descubra/AnimatedQuestions" // Animated questions component
import DynamicTitle from "@/components/descubra/DynamicTitle" // Dynamic title component
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const SECTION_BASE = "w-full relative"
const CONTAINER_BASE = "container px-4 md:px-6 relative z-10"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

// Update all buttons with this consistent, enhanced style
const buttonStyles = `
  w-fit bg-gradient-to-r from-blue-600 to-blue-700 
  hover:from-blue-500 hover:to-blue-600
  text-white font-medium
  px-8 py-3 rounded-full 
  flex items-center gap-3
  shadow-lg shadow-blue-500/20
  hover:shadow-xl hover:shadow-blue-500/30
  transform hover:-translate-y-0.5
  transition-all duration-300
  backdrop-blur-sm
`

export default function DescubraPage() {
  const [activeMap, setActiveMap] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMap((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Container 1: Introdução */}
      <section className={`${SECTION_BASE} py-32 md:py-40 lg:py-52 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-30`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-40 -left-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -right-40 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={CONTAINER_BASE}
        >
          <div className="flex flex-col items-center space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 shadow-sm hover:bg-gray-800/90 transition-colors">
              Descubra
            </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Conectando as pessoas
                <br />
                e cidades
            </h1>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/10 rounded-full blur-xl" />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-[700px] text-gray-400 md:text-lg lg:text-xl relative z-10"
            >
                          Facilitando a vida de quem mora, trabalha e explora Aveiro.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Container 2: O Desafio */}
      <section className={`${SECTION_BASE} py-20 md:py-32 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 -mt-20 z-20`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={CONTAINER_BASE}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-6 lg:w-1/2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="w-fit rounded-full px-4 py-1.5 text-xs font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 shadow-sm">
                  Desafio
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                E se encontrar informações sobre sua cidade fosse simples?
              </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-[600px] text-gray-400 md:text-lg"
              >
                Hoje, acessar serviços, transporte, eventos e informações municipais exige navegar por múltiplos sites e aplicativos.
                <span className="text-gray-300"> Isso torna tudo confuso, demorado e pouco intuitivo.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  onClick={() => router.push('/project')}
                  className={`
                    bg-gradient-to-r from-blue-600 to-blue-700 
                    hover:from-blue-500 hover:to-blue-600
                    text-white font-medium
                    px-8 py-3 rounded-full 
                    flex items-center gap-3
                    shadow-lg shadow-blue-500/20
                    hover:shadow-xl hover:shadow-blue-500/30
                    transform hover:-translate-y-0.5
                    transition-all duration-300
                    backdrop-blur-sm
                  `}
                >
                  <span>Entenda mais sobre as motivações</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center lg:w-1/2"
            >
              <AnimatedQuestions />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Container 3: Aveiro Mais Conectada */}
      <section className={`${SECTION_BASE} py-20 md:py-32 bg-white z-10`}>
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[1000px] h-[1000px] -top-[500px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-50/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] top-1/2 -translate-y-1/2 -right-40 bg-blue-50/30 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] top-1/2 -translate-y-1/2 -left-40 bg-purple-50/30 rounded-full blur-3xl" />
        </div>

        <motion.div
          {...fadeInUp}
          className={CONTAINER_BASE}
        >
          <div className="flex flex-col items-center space-y-6 text-center relative">
            <Badge className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-600 shadow-sm">
              Conheça AveiroConnect
            </Badge>
            <div className="space-y-4">
              <DynamicTitle 
                title="Aveiro + "
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
              />
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg lg:text-xl">
              Com a tecnologia certa, podemos transformar a experiência urbana, tornando o acesso à informação simples, rapido e intuitivo para todos.
            </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Container 4: Principais Recursos */}
      <section className={`${SECTION_BASE} py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.02] pointer-events-none" />
        </div>

          <motion.div
          {...fadeInUp}
          className={CONTAINER_BASE}
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            <Badge className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 shadow-sm">
              Recursos Principais
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Transformamos dados em experiências 
              <span className="text-blue-400"> inteligentes</span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {[
              {
                icon: Zap,
                title: "Integração de Dados",
                description: "Conectamos diversas plataformas e fontes de informação para oferecer uma experiência fluida e intuitiva.",
                color: "blue",
                gradient: "from-blue-500/20 to-blue-500/5"
              },
              {
                icon: MapPin,
                title: "Mapa Inteligente",
                description: "Saiba tudo sobre mobilidade urbana em um único lugar: trânsito, transporte público e estacionamento disponíveis.",
                color: "purple",
                gradient: "from-purple-500/20 to-purple-500/5"
              },
              {
                icon: MessageSquare,
                title: "IAs Especializadas",
                description: "Assistentes inteligentes para serviços públicos, turismo, transporte e muito mais — sempre prontos para te ajudar.",
                color: "green",
                gradient: "from-green-500/20 to-green-500/5"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`
                  group flex flex-col items-center space-y-4 p-6 h-full 
                  bg-gradient-to-br from-gray-800 to-gray-900
                  backdrop-blur-sm border border-gray-700
                  hover:border-${feature.color}-500/50
                  shadow-xl hover:shadow-2xl
                  hover:shadow-${feature.color}-500/10
                  transition-all duration-300
                  relative overflow-hidden
                `}>
                  {/* Background gradient */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-br ${feature.gradient}
                    transition-opacity duration-300
                  `} />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center space-y-4">
                    <div className={`
                      p-3 rounded-xl
                      bg-gradient-to-br from-gray-700 to-gray-800
                      group-hover:from-${feature.color}-500/20 group-hover:to-${feature.color}-500/5
                      transition-colors duration-300
                    `}>
                      <feature.icon className={`
                        h-8 w-8 
                        text-gray-400 
                        group-hover:text-${feature.color}-400
                        transition-colors duration-300
                      `} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 text-center transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Container 5: Interface Simples e Personalizada */}
      <section className={`${SECTION_BASE} py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`}>
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.02] pointer-events-none" />
        </div>

        <motion.div
          {...fadeInUp}
          className={CONTAINER_BASE}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              {...fadeInLeft}
              className="flex flex-col justify-center space-y-6"
            >
              <Badge className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 shadow-sm">
                Experiência Intuitiva
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Uma interface moderna e adaptada para todos
              </h2>
              <p className="text-gray-400 md:text-lg">
                Navegue com facilidade por serviços, eventos e informações essenciais, tudo de forma
                <span className="text-gray-300"> acessível e personalizada.</span>
              </p>
              <div className="grid gap-4 py-4">
                {[
                  {
                    title: "Navegação Simplificada",
                    description: "Encontre rapidamente o que precisa sem burocracia",
                    icon: "layout",
                    color: "blue"
                  },
                  {
                    title: "Personalização Avançada",
                    description: "Seções adaptadas ao seu perfil e necessidades",
                    icon: "users",
                    color: "purple"
                  },
                  {
                    title: "Acesso Rápido",
                    description: "Serviços mais usados sempre à mão",
                    icon: "zap",
                    color: "green"
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                      flex items-start gap-4 p-4 
                      rounded-xl bg-gray-800/50 
                      backdrop-blur-sm border border-gray-700
                      hover:bg-gray-800/70 hover:border-${item.color}-500/50
                      transition-all duration-300
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg 
                      bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-500/5
                      text-${item.color}-400
                    `}>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-200">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button 
                onClick={() => router.push('/home')}
                className={buttonStyles}
              >
                <span>Explorar Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              {...fadeInRight}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Dashboard Preview */}
                <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full" />
                        <div className="space-y-1">
                          <div className="h-2 w-24 bg-gray-700 rounded" />
                          <div className="h-2 w-16 bg-gray-700/50 rounded" />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-6 h-6 bg-gray-700 rounded" />
                        <div className="w-6 h-6 bg-gray-700 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    {/* Weather Widget */}
                    <div className="bg-gray-700/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-3 w-20 bg-gray-600 rounded" />
                          <div className="h-6 w-32 bg-gray-600 rounded" />
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full" />
                      </div>
                    </div>

                    {/* Service Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-700/50 p-3 rounded-xl space-y-2">
                          <div className="w-8 h-8 bg-gray-600 rounded" />
                          <div className="h-2 w-16 bg-gray-600 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Container 6: Mobilidade Inteligente */}
      <section className={`${SECTION_BASE} py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`}>
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.02] pointer-events-none" />
        </div>

        <motion.div
          {...fadeInUp}
          className={CONTAINER_BASE}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              {...fadeInLeft}
              className="flex items-center justify-center order-2 lg:order-1"
            >
              <div className="relative w-full max-w-lg">
                {/* Map Preview */}
                <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Map Header */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 w-24 bg-gray-700 rounded" />
                          <div className="h-2 w-16 bg-gray-700/50 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map Content */}
                  <div className="p-4 space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMap}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="aspect-video bg-gray-700/50 rounded-xl overflow-hidden relative"
                      >
                        {/* Map Grid Lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />
                        
                        {activeMap === 0 && (
                          // Parking View
                          <div className="absolute inset-4">
                            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                              <div className="text-xs text-green-400">12</div>
                            </div>
                            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                              <div className="text-xs text-yellow-400">5</div>
                            </div>
                            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center">
                              <div className="text-xs text-red-400">0</div>
                            </div>
                          </div>
                        )}

                        {activeMap === 1 && (
                          // Traffic View
                          <div className="absolute inset-4">
                            <div className="absolute top-1/3 left-1/4 w-32 h-3 bg-green-500/40 rounded-full" />
                            <div className="absolute top-1/3 right-1/4 w-32 h-3 bg-yellow-500/40 rounded-full rotate-45" />
                            <div className="absolute bottom-1/3 left-1/3 w-32 h-3 bg-red-500/40 rounded-full -rotate-45" />
                            <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ top: '40%', left: '45%' }} />
                          </div>
                        )}

                        {activeMap === 2 && (
                          // Alerts View
                          <div className="absolute inset-4">
                            <div className="absolute top-1/4 left-1/4 animate-pulse">
                              <div className="w-8 h-8 bg-yellow-500/30 rounded-full flex items-center justify-center">
                                <span className="text-yellow-400 text-xs">!</span>
                              </div>
                            </div>
                            <div className="absolute bottom-1/3 right-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}>
                              <div className="w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center">
                                <span className="text-red-400 text-xs">!</span>
                              </div>
                            </div>
                            <div className="absolute top-1/2 right-1/3 animate-pulse" style={{ animationDelay: '1s' }}>
                              <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                                <span className="text-blue-400 text-xs">i</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Indicators */}
                    <div className="flex justify-between items-center px-2">
                      <div className="flex space-x-4">
                        {activeMap === 0 && (
                          <>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <div className="text-xs text-gray-400">Disponível</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500" />
                              <div className="text-xs text-gray-400">Limitado</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <div className="text-xs text-gray-400">Lotado</div>
                            </div>
                          </>
                        )}
                        {activeMap === 1 && (
                          <>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <div className="text-xs text-gray-400">Fluindo</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500" />
                              <div className="text-xs text-gray-400">Moderado</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <div className="text-xs text-gray-400">Lento</div>
                            </div>
                          </>
                        )}
                        {activeMap === 2 && (
                          <>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500" />
                              <div className="text-xs text-gray-400">Obras</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <div className="text-xs text-gray-400">Incidente</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              <div className="text-xs text-gray-400">Evento</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>

            <motion.div
              {...fadeInRight}
              className="flex flex-col justify-center space-y-6 order-1 lg:order-2"
            >
              <Badge className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 shadow-sm">
                Mobilidade Inteligente
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Tráfego e transporte em
                <span className="text-blue-400"> tempo real</span>
              </h2>
              <p className="text-gray-400 md:text-lg">
                Todas as informações de mobilidade da cidade disponíveis em um único lugar,
                <span className="text-gray-300"> sempre atualizadas.</span>
              </p>
              <div className="grid gap-4 py-4">
                {[
                  {
                    title: "Mapa Interativo",
                    description: "Visualize em tempo real o tráfego e vagas disponíveis na cidade",
                    icon: "map",
                    color: "blue"
                  },
                  {
                    title: "Alertas e Notificações",
                    description: "Receba avisos sobre eventos e mudanças no estacionamento",
                    icon: "bell",
                    color: "purple"
                  },
                  {
                    title: "Estacionamento Inteligente",
                    description: "Encontre vagas disponíveis próximas ao seu destino",
                    icon: "parking",
                    color: "green"
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                      flex items-start gap-4 p-4 
                      rounded-xl bg-gray-800/50 
                      backdrop-blur-sm border border-gray-700
                      hover:bg-gray-800/70 hover:border-${item.color}-500/50
                      transition-all duration-300
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg 
                      bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-500/5
                      text-${item.color}-400
                    `}>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-200">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button 
                onClick={() => router.push('/map')}
                className={buttonStyles}
              >
                <span>Ver Mapa em Tempo Real</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Container 7: Assistentes de IA */}
      <section className={`${SECTION_BASE} py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.02] pointer-events-none" />
        </div>

        <motion.div
          {...fadeInUp}
          className={CONTAINER_BASE}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              {...fadeInLeft}
              className="flex flex-col justify-center space-y-6"
            >
              <Badge className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 shadow-sm">
                Assistentes Inteligentes
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                IA especializada para cada
                <span className="text-blue-400"> necessidade</span>
              </h2>
              <p className="text-gray-400 md:text-lg">
                Nossos assistentes de IA ajudam em tudo, desde serviços públicos até planejamento de viagens,
                <span className="text-gray-300"> com respostas rápidas e precisas.</span>
              </p>
              <div className="grid gap-4 py-4">
                {[
                  {
                    title: "Turismo & Eventos",
                    description: "Descubra eventos, atrações e roteiros personalizados",
                    icon: "map-pin",
                    color: "blue"
                  },
                  {
                    title: "Serviços Municipais",
                    description: "Tire dúvidas sobre documentos e processos",
                    icon: "building",
                    color: "purple"
                  },
                  {
                    title: "Mobilidade Urbana",
                    description: "Informações sobre transporte e trânsito",
                    icon: "bus",
                    color: "green"
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    {...fadeInLeft}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-start gap-4 p-4 
                      rounded-xl bg-gray-800/50 
                      backdrop-blur-sm border border-gray-700
                      hover:bg-gray-800/70 hover:border-${item.color}-500/50
                      transition-all duration-300
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg 
                      bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-500/5
                      text-${item.color}-400
                    `}>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-200">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => router.push('/agents')}
                  className={buttonStyles}
                >
                  <span>Experimentar Assistentes</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={() => router.push('/chat')}
                  className={`
                    w-fit bg-transparent
                    text-gray-300 font-medium
                    px-8 py-3 rounded-full 
                    flex items-center gap-3
                    border border-gray-700
                    hover:bg-gray-800/50 hover:border-blue-500/50
                    transform hover:-translate-y-0.5
                    transition-all duration-300
                    backdrop-blur-sm
                  `}
                >
                  <span>Saber Mais</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              {...fadeInRight}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Chat Interface */}
                <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">Assistente Virtual</div>
                        <div className="text-xs text-gray-400">Online agora</div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 h-[400px] overflow-y-auto">
                    {[
                      {
                        question: "Quais documentos preciso para abrir uma empresa?",
                        answer: "Para abrir uma empresa em Aveiro, você precisará de:\n\n1. Cartão de Cidadão\n2. NIF\n3. Certificado de Admissibilidade\n4. Pacto Social\n\nPosso ajudar você com o processo passo a passo!",
                        type: "documents"
                      },
                      {
                        question: "Onde posso encontrar eventos culturais este fim de semana?",
                        answer: "Este fim de semana temos vários eventos:\n\n🎭 Festival de Teatro - Centro Cultural\n🎵 Concerto na Praça\n🎨 Exposição de Arte Moderna\n\nQuer saber mais detalhes sobre algum deles?",
                        type: "events"
                      },
                      {
                        question: "Qual o melhor horário para visitar o centro da cidade?",
                        answer: "Com base no tráfego atual:\n\n🟢 Manhã (9h-11h): Pouco movimento\n🟡 Tarde (14h-16h): Moderado\n🔴 Noite (18h-19h): Intenso\n\nRecomendo visitar pela manhã para maior conforto!",
                        type: "traffic"
                      }
                    ].map((chat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-end">
                          <div className="bg-blue-600/20 text-gray-200 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                            {chat.question}
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-700/50 text-gray-200 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] whitespace-pre-line">
                            {chat.answer}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 bg-gray-700/50 rounded-xl px-4 py-2">
                      <input
                        type="text"
                        placeholder="Digite sua pergunta..."
                        className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
                      />
                      <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Container 8: Contact Section */}
      <section className={`${SECTION_BASE} py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.02] pointer-events-none" />
        </div>

        <motion.div
          {...fadeInUp}
          className={CONTAINER_BASE}
        >
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 shadow-sm">
              Quer Saber Mais?
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Vamos conversar sobre o Connect Aveiro?
            </h2>
            
            <p className="text-gray-400 md:text-lg">
              Sobre questões técnicas, sugestões ou qualquer dúvida, não hesite em entrar em contato.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-4">
              <motion.a
                href="https://www.linkedin.com/in/victor-von-sohsten-165741194/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="text-gray-300 font-medium">LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://api.whatsapp.com/send/?phone=393513208000&text=Oi+Victor%2C&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-green-500/50 hover:bg-gray-800/70 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="p-2 rounded-lg bg-green-500/10">
                  <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="text-gray-300 font-medium">WhatsApp</span>
              </motion.a>

              <motion.a
                href="mailto:victorvon@ua.pt"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/70 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300 font-medium">Email</span>
              </motion.a>
            </div>

            <div className="pt-8">
              <p className="text-gray-400">
                Desenvolvido por{" "}
                <span className="text-blue-400 font-medium">Victor von Sohsten</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
