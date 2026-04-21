
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Leaf } from "lucide-react"

const photoCaptions = [
  "Gracias por las risas",
  "Momentos inolvidables",
  "Siempre en mi corazón",
  "Las mejores aventuras",
  "Explorando juntos",
  "Noches de música y alegría",
  "Arte y buena compañía",
  "Pizza y risas",
  "Siempre buscando aventura",
  "Momentos mágicos"
]

const photoModules = import.meta.glob<string>("@/src/img/*.jpg", {
  eager: true,
  import: "default",
})

const photos = Object.entries(photoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], index) => ({
  src,
  caption: photoCaptions[index] ?? `Recuerdo ${index + 1}`
}))

type SlideType = 
  | { type: "intro" }
  | { type: "photo"; photo: typeof photos[0]; index: number }
  | { type: "exotic1" }
  | { type: "exotic2" }
  | { type: "message" }
  | { type: "final" }

const slides: SlideType[] = [
  { type: "intro" },
  ...photos.map((photo, index) => ({ type: "photo" as const, photo, index })),
  { type: "exotic1" },
  { type: "exotic2" },
  { type: "message" },
  { type: "final" }
]

function TropicalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900" />
      
      {/* Floating leaves */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-500/30"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
            y: -100,
            rotate: 0,
            scale: 0.5 + Math.random() * 1
          }}
          animate={{ 
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
            x: `+=${Math.sin(i) * 100}`,
            rotate: 360 * (i % 2 === 0 ? 1 : -1)
          }}
          transition={{ 
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear"
          }}
        >
          <Leaf size={40 + Math.random() * 40} />
        </motion.div>
      ))}
      
      {/* Organic shapes */}
      <motion.div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl ${className}`}>
      {children}
    </div>
  )
}

function EntryGate({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TropicalBackground />
      
      <GlassCard className="relative z-10 p-8 text-center max-w-sm mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Gift className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Tienes un regalo especial
        </motion.h1>
        
        <motion.p 
          className="text-white/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Preparado con mucho cariño
        </motion.p>
        
        <motion.button
          onClick={onStart}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-emerald-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Abrir Regalo 🎁
        </motion.button>
      </GlassCard>
    </motion.div>
  )
}

function IntroSlide() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <GlassCard className="p-8 text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4 text-balance leading-tight">
            ¡Por una amistad bonita y momentos geniales!
          </h2>
          <div className="flex justify-center gap-2 text-4xl">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🌴
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              ☀️
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              🌿
            </motion.span>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  )
}

function PhotoSlide({ photo, index }: { photo: typeof photos[0]; index: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.2, x: index % 2 === 0 ? 20 : -20 }}
        transition={{ duration: 5, ease: "linear" }}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
      </motion.div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      
      {/* Caption */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <GlassCard className="p-4">
          <p className="text-xl font-semibold text-white text-center">
            {photo.caption}
          </p>
        </GlassCard>
      </motion.div>
      
      {/* Photo counter */}
      <div className="absolute top-2 right-3 md:top-6 md:right-6">
        <GlassCard className="px-3 py-1">
          <span className="text-sm text-white/90 font-medium">
            {index + 1} / {photos.length}
          </span>
        </GlassCard>
      </div>
    </div>
  )
}

function Exotic1Slide() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <GlassCard className="p-8 text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-2xl text-white leading-relaxed">
            {`A veces me dicen: "qué personaje tan exótico"...`}
          </p>
          <motion.span 
            className="inline-block mt-4 text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤔
          </motion.span>
        </motion.div>
      </GlassCard>
    </div>
  )
}

function Exotic2Slide() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      >
        <GlassCard className="p-8 text-center max-w-md bg-gradient-to-br from-yellow-400/30 to-orange-500/30">
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ¡Es correcto! 😂
          </motion.h2>
          <div className="flex justify-center gap-2">
            {["🎉", "✨", "🌟", "🎊"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

function MessageSlide() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <GlassCard className="p-8 text-center max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p 
            className="text-xl text-white leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Aunque en este momento no estemos cerca o seamos como uña y mugre, te guardo un espaciecito de mucho cariño...
          </motion.p>
          <motion.span 
            className="inline-block mt-6 text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            💚
          </motion.span>
        </motion.div>
      </GlassCard>
    </div>
  )
}

function FinalSlide() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <GlassCard className="p-8 text-center max-w-md bg-gradient-to-br from-yellow-400/20 to-teal-500/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-6 text-balance"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ¡Feliz cumpleaños a una aventurera de corazón!
          </motion.h2>
          <div className="flex justify-center gap-3 text-4xl">
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌿
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ☀️
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎂
            </motion.span>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 p-2">
      {slides.map((_, index) => (
        <div 
          key={index} 
          className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: index < progress ? "100%" : index === progress ? "100%" : "0%"
            }}
            transition={{ 
              duration: index === progress ? 5 : 0.3,
              ease: index === progress ? "linear" : "easeOut"
            }}
          />
        </div>
      ))}
    </div>
  )
}

function SpotifyPlayer({ visible }: { visible: boolean }) {
  if (!visible) return null
  
  return (
    <motion.div
      className="fixed top-16 left-4 right-4 z-20 md:top-auto md:bottom-6 md:left-auto md:right-6 md:w-80"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="h-20 md:h-[152px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl">
        <iframe
          src="https://open.spotify.com/embed/track/57NbelD7NoWpb6dXVcOEbM?utm_source=generator&theme=0"
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="h-full rounded-xl"
        />
      </div>
    </motion.div>
  )
}

export default function BirthdayPresentation() {
  const START_INDEX_AFTER_INTRO = 1
  const [started, setStarted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleStart = useCallback(() => {
    setStarted(true)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    if (!started) return

    const timer = setInterval(() => {
      setCurrentSlide(prev => {
        const next = prev + 1
        // Loop back to first photo slide after final slide
        if (next >= slides.length) {
          return START_INDEX_AFTER_INTRO
        }
        return next
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [started, START_INDEX_AFTER_INTRO])

  const renderSlide = (slide: SlideType) => {
    switch (slide.type) {
      case "intro":
        return <IntroSlide />
      case "photo":
        return <PhotoSlide photo={slide.photo} index={slide.index} />
      case "exotic1":
        return <Exotic1Slide />
      case "exotic2":
        return <Exotic2Slide />
      case "message":
        return <MessageSlide />
      case "final":
        return <FinalSlide />
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <TropicalBackground />

      <AnimatePresence mode="wait">
        {!started ? (
          <EntryGate key="gate" onStart={handleStart} />
        ) : (
          <motion.div
            key={currentSlide}
            className="relative h-full w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <ProgressBar progress={currentSlide} />
            {renderSlide(slides[currentSlide])}
          </motion.div>
        )}
      </AnimatePresence>

      {started && <SpotifyPlayer visible={true} />}
    </div>
  )
}
