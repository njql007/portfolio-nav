import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'

export type Language = 'zh' | 'en'

interface Project {
  id: number
  title: Record<Language, string>
  description: Record<Language, string>
  longDescription: Record<Language, string>
  icon: ReactNode
  tags: string[]
  link: string
  color: string       // main neon color hex
  colorRgb: string    // RGB values for rgba()
  category: 'game' | 'entertainment'
}

// ============================
// SVG Icon Components
// ============================
function IconDice({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="8" r="1.5" fill={color} />
      <circle cx="16" cy="8" r="1.5" fill={color} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="8" cy="16" r="1.5" fill={color} />
      <circle cx="16" cy="16" r="1.5" fill={color} />
    </svg>
  )
}

function IconQuill({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7">
      <path d="M20 2C15 4 11 9 9 13L11 15C15 13 20 9 22 4L20 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={`${color}22`} />
      <path d="M9 13L6 20L11 15" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 20L4 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 17C3 17 5 16 6 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function IconTerminal({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7">
      <rect x="2" y="3" width="20" height="18" rx="2.5" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="2" y1="7" x2="22" y2="7" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="5" cy="5" r="0.8" fill={color} opacity="0.5" />
      <circle cx="7.5" cy="5" r="0.8" fill={color} opacity="0.5" />
      <circle cx="10" cy="5" r="0.8" fill={color} opacity="0.5" />
      <path d="M6 11L9 13.5L6 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="11" y1="16" x2="16" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

function IconPixelGrid({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7">
      <rect x="3" y="3" width="5" height="5" rx="0.5" fill={color} opacity="0.8" />
      <rect x="10" y="3" width="5" height="5" rx="0.5" fill={color} opacity="0.4" />
      <rect x="17" y="3" width="4" height="5" rx="0.5" fill={color} opacity="0.6" />
      <rect x="3" y="10" width="5" height="5" rx="0.5" fill={color} opacity="0.3" />
      <rect x="10" y="10" width="5" height="5" rx="0.5" fill={color} opacity="0.9" />
      <rect x="17" y="10" width="4" height="5" rx="0.5" fill={color} opacity="0.5" />
      <rect x="3" y="17" width="5" height="4" rx="0.5" fill={color} opacity="0.5" />
      <rect x="10" y="17" width="5" height="4" rx="0.5" fill={color} opacity="0.6" />
      <rect x="17" y="17" width="4" height="4" rx="0.5" fill={color} opacity="0.3" />
    </svg>
  )
}

const translations = {
  zh: {
    subtitle: '探索我的创意项目',
    viewProject: '访问项目',
    close: '返回',
    techStack: '技术栈',
    categoryGame: '游戏',
    categoryEntertainment: '娱乐',
  },
  en: {
    subtitle: 'Explore my creative projects',
    viewProject: 'Visit Project',
    close: 'Back',
    techStack: 'Tech Stack',
    categoryGame: 'Games',
    categoryEntertainment: 'Entertainment',
  },
}

const projects: Project[] = [
  {
    id: 1,
    title: { zh: 'Gen RPG', en: 'Gen RPG' },
    description: {
      zh: 'AI 驱动 · 多人实时冒险 · 无限故事',
      en: 'AI-driven · Multiplayer · Infinite stories',
    },
    longDescription: {
      zh: `让 AI 成为你的游戏主持人——由 Gemini 2.5 Flash 驱动的程序化战旗 RPG。

• 🌍 AI 生成独特世界：每局游戏都是崭新的冒险，拥有专属世界观、职业体系、敌人与装备
• ⚔️ 深度战斗系统：回合制策略战斗，含技能冷却、状态效果（中毒/冰冻/燃烧等）、暴击闪避机制
• 🎭 动态属性系统：每个世界拥有独特属性，如武侠世界的「内力修为」、科幻世界的「神经同步率」
• 🤝 多人实时协作：Firebase 实时同步，邀请好友共闯地牢，支持断线重连
• 🎯 装备词条系统：五档稀有度、随机属性加成、等级门槛要求
• 🏰 五大预设主题：经典奇幻、东方修仙、蒸汽朋克、克苏鲁、末日废土`,
      en: `Let AI be your Game Master — a procedural turn-based RPG powered by Gemini 2.5 Flash.

• 🌍 Procedural World Generation: Every playthrough is unique with custom lore, classes, enemies & equipment
• ⚔️ Deep Combat System: Turn-based tactical battles with skill cooldowns, status effects (poison/freeze/burn), critical hits & evasion
• 🎭 Dynamic Attribute System: Each world features unique stats like "Inner Cultivation" (wuxia) or "Neural Sync Rate" (sci-fi)
• 🤝 Real-time Multiplayer: Firebase sync for seamless co-op adventures with reconnection support
• 🎯 Equipment Affix System: 5 rarity tiers, random stat bonuses, and level requirements
• 🏰 5 Preset Themes: Classic Fantasy, Eastern Cultivation, Steampunk, Lovecraftian, Post-Apocalyptic`,
    },
    icon: <IconDice color="#34d399" />,
    tags: ['React', 'Gemini AI', 'Firebase'],
    link: 'https://gen-rpg-game.web.app',
    color: '#34d399',
    colorRgb: '52, 211, 153',
    category: 'game',
  },
  {
    id: 2,
    title: { zh: 'Story Weaver', en: 'Story Weaver' },
    description: {
      zh: '编织故事 · TRPG 骰子 · 双语叙事',
      en: 'Weave tales · TRPG dice · Bilingual',
    },
    longDescription: {
      zh: `让 AI 成为你的游戏主持人——多人协作的沉浸式叙事引擎。

• 🎭 AI Game Master：Gemini 驱动的智能叙事，实时生成角色、剧情与场景图片
• 🎲 TRPG 骰子机制：D20 技能检定，难度等级 5-20，充满不确定性
• 🎨 17 种故事风格：现代都市、武侠修仙、科幻末日等 3 大类别
• 🤖 AI 托管系统：断线自动接管，游戏永不中断
• 📊 玩家评价：游戏结束时 AI 评估角色扮演还原度、创造力和贡献
• 🖼️ 电影级场景：AI 生成 16:9 场景画面，仅在剧情转折时触发`,
      en: `Let AI be your Game Master — a collaborative immersive storytelling engine.

• 🎭 AI Game Master: Gemini-powered intelligent narration, real-time character, plot & scene image generation
• 🎲 TRPG Dice Mechanics: D20 skill checks with DC 5-20, full of uncertainty
• 🎨 17 Story Styles: Modern city, wuxia cultivation, sci-fi wasteland across 3 categories
• 🤖 AI Takeover: Auto-pilot when disconnected, game never stops
• 📊 Player Evaluation: AI rates roleplay fidelity, creativity & contribution at game end
• 🖼️ Cinematic Scenes: AI generates 16:9 scene images, triggered only at plot twists`,
    },
    icon: <IconQuill color="#fbbf24" />,
    tags: ['React', 'Gemini AI', 'Firebase'],
    link: 'https://story-weaver-proj.web.app',
    color: '#fbbf24',
    colorRgb: '251, 191, 36',
    category: 'game',
  },
  {
    id: 3,
    title: { zh: 'Moyu Reader', en: 'Moyu Reader' },
    description: {
      zh: '伪装阅读 · 12+ 资讯源 · AI 翻译',
      en: 'Stealth mode · 12+ feeds · AI translate',
    },
    longDescription: {
      zh: `老板来了？按 B 键一键变身终端——专为职场摸鱼设计的隐秘阅读器。

• 🕶️ Boss 模式：按 B 键瞬间切换为仿真终端界面，显示滚动编译日志
• 📡 多源聚合：中文科技媒体（CnBeta/IT之家/爱范儿等）+ 国际突发新闻（BBC/Guardian/NPR）
• 🤖 渐进式翻译：Gemini AI 智能翻译，先显示标题和前几段，再逐步翻译全文
• 🎮 游戏化系统：10 级摸鱼称号，从「摸鱼实习生」到「宇宙级摸鱼大帝」
• 👥 实时社交：查看在线摸鱼人数和其他用户的阅读动态`,
      en: `Boss coming? Press B to instantly transform into a terminal — the stealth reader for office slackers.

• 🕶️ Boss Mode: Press B to switch to a realistic terminal interface with scrolling build logs
• 📡 Multi-source Aggregation: Chinese tech media (CnBeta/IT Home/iFanr) + Breaking news (BBC/Guardian/NPR)
• 🤖 Progressive Translation: Gemini AI smart translation — shows title & first paragraphs first, then progressively translates the rest
• 🎮 Gamification: 10-level slacker titles, from "Slacking Intern" to "Cosmic Slacking Emperor"
• 👥 Real-time Social: See online users and their reading activities`,
    },
    icon: <IconTerminal color="#22d3ee" />,
    tags: ['React', 'Gemini AI', 'Firebase'],
    link: 'https://reader.momoyu.lol',
    color: '#22d3ee',
    colorRgb: '34, 211, 238',
    category: 'entertainment',
  },
  {
    id: 4,
    title: { zh: 'Pixel Verse', en: 'Pixel Verse' },
    description: {
      zh: '像素世界 · 视频同步 · 实时社交',
      en: 'Pixel world · Video sync · Social',
    },
    longDescription: {
      zh: `在 AI 生成的像素世界里和朋友一起看视频、聊天、修仙。

• 🎨 AI 像素世界：用自然语言描述场景，Gemini 2.5 Flash 实时生成俯视像素地图
• 🎬 多平台视频同步：支持 YouTube 和 Bilibili，Socket.io 实现毫秒级播放同步
• 💬 实时聊天：全局聊天室 + 头顶气泡，消息 4 秒自动消失
• ⚡ 修仙社交：玩家靠近自动获得修炼加成，从「凡人」修炼到「化神」
• 👾 化身装备：商店购买帽子/上衣/裤子，稀有度分普通/稀有/传奇三档
• 🖼️ 8 种艺术风格：SNES 16-bit、GBA 32-bit、HD-2D、水彩、动漫、写实、哥特、Q版`,
      en: `Watch videos, chat, and cultivate together in AI-generated pixel worlds.

• 🎨 AI Pixel World: Describe scenes in natural language, Gemini 2.5 Flash generates top-down pixel maps in real-time
• 🎬 Multi-platform Video Sync: YouTube + Bilibili support, millisecond-level sync via Socket.io
• 💬 Real-time Chat: Global chatroom + overhead bubbles, messages auto-dismiss after 4 seconds
• ⚡ Cultivation Social: Players near each other gain cultivation bonuses, progress from "Mortal" to "Divinity"
• 👾 Avatar Equipment: Shop for hats/tops/pants with Common/Rare/Legendary rarity tiers
• 🖼️ 8 Art Styles: SNES 16-bit, GBA 32-bit, HD-2D, Watercolor, Anime, Realistic, Gothic, Chibi`,
    },
    icon: <IconPixelGrid color="#a78bfa" />,
    tags: ['React', 'Socket.io', 'GCP'],
    link: 'https://pixel-verse.momoyu.lol',
    color: '#a78bfa',
    colorRgb: '167, 139, 250',
    category: 'entertainment',
  },
]

// ============================
// Particle Background Component
// ============================
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLE_COUNT = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))
    const CONNECTION_DISTANCE = 150

    // Init particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update & draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 200, 255, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

// ============================
// Typewriter Hook
// ============================
function useTypewriter(text: string, speed = 120, startDelay = 500) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ============================
// 3D Tilt Card
// ============================
function TiltCard({
  project,
  language,
  onClick,
  index,
}: {
  project: Project
  language: Language
  onClick: () => void
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }) // percentage

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const tiltX = ((y - 50) / 50) * -12
    const tiltY = ((x - 50) / 50) * 12
    setTilt({ x: tiltX, y: tiltY })
    setMousePos({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
      style={{
        perspective: '1000px',
        animation: `fade-in 0.7s ease-out ${index * 0.12}s both`,
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(${project.colorRgb}, 0.06) 0%, rgba(15,15,25,0.95) 50%, rgba(${project.colorRgb}, 0.03) 100%)`,
          }}
        />

        {/* Glassmorphism border */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-500"
          style={{
            border: `1px solid rgba(${project.colorRgb}, ${isHovered ? 0.5 : 0.15})`,
            boxShadow: isHovered
              ? `0 0 30px rgba(${project.colorRgb}, 0.15), inset 0 0 30px rgba(${project.colorRgb}, 0.05)`
              : `0 0 0px rgba(${project.colorRgb}, 0)`,
          }}
        />

        {/* Mouse-following spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(${project.colorRgb}, 0.12) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Card content */}
        <div className="relative p-4 md:p-5 flex flex-col h-full min-h-[150px] md:min-h-[170px]">
          {/* Top row: icon + number */}
          <div className="flex items-start justify-between mb-auto">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-2xl md:text-2xl transition-transform duration-500 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, rgba(${project.colorRgb}, 0.2), rgba(${project.colorRgb}, 0.05))`,
                border: `1px solid rgba(${project.colorRgb}, 0.2)`,
                animation: isHovered ? 'float 3s ease-in-out infinite' : 'none',
              }}
            >
              {project.icon}
            </div>
            <span
              className="text-xs font-mono tracking-widest opacity-30 group-hover:opacity-60 transition-opacity duration-500"
              style={{ color: project.color }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Bottom: title + description + tags */}
          <div className="mt-6">
            <h3
              className="text-sm md:text-base font-bold mb-1 transition-colors duration-300"
              style={{ color: isHovered ? project.color : '#ffffff' }}
            >
              {project.title[language]}
            </h3>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-2 leading-relaxed">
              {project.description[language]}
            </p>

            {/* Tags — slide in on hover */}
            <div
              className="flex flex-wrap gap-1.5 transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide"
                  style={{
                    background: `rgba(${project.colorRgb}, 0.1)`,
                    border: `1px solid rgba(${project.colorRgb}, 0.2)`,
                    color: project.color,
                    animation: isHovered ? `tag-enter 0.3s ease-out ${i * 0.05}s both` : 'none',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow indicator */}
          <div
            className="absolute bottom-5 right-5 md:bottom-7 md:right-7 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: `rgba(${project.colorRgb}, ${isHovered ? 0.15 : 0})`,
              border: `1px solid rgba(${project.colorRgb}, ${isHovered ? 0.3 : 0})`,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.7)',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke={project.color} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================
// Fullscreen Project Detail
// ============================
function ProjectDetail({
  project,
  language,
  t,
  onClose,
}: {
  project: Project
  language: Language
  t: typeof translations['zh']
  onClose: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ animation: 'detail-bg-enter 0.3s ease-out' }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${project.colorRgb}, 0.08) 0%, rgba(5,5,8,0.97) 70%)`,
          backdropFilter: 'blur(20px)',
        }}
      />

      {/* Content card */}
      <div
        className="relative max-w-xl w-full rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'detail-enter 0.5s ease-out',
          background: 'rgba(12, 12, 20, 0.95)',
          border: `1px solid rgba(${project.colorRgb}, 0.25)`,
          boxShadow: `0 0 60px rgba(${project.colorRgb}, 0.1), 0 25px 50px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Top accent line */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl shrink-0"
              style={{
                background: `linear-gradient(135deg, rgba(${project.colorRgb}, 0.2), rgba(${project.colorRgb}, 0.05))`,
                border: `1px solid rgba(${project.colorRgb}, 0.2)`,
              }}
            >
              {project.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: project.color }}>
                {project.title[language]}
              </h2>
              <p className="text-gray-400 text-sm">{project.description[language]}</p>
            </div>
          </div>

          {/* Long description */}
          <div className="mb-6 text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {project.longDescription[language]}
          </div>

          {/* Tech stack */}
          <div className="mb-6">
            <p className="text-xs font-mono tracking-widest text-gray-500 mb-2 uppercase">{t.techStack}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: `rgba(${project.colorRgb}, 0.08)`,
                    border: `1px solid rgba(${project.colorRgb}, 0.15)`,
                    color: project.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:brightness-110 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${project.color}, rgba(${project.colorRgb}, 0.7))`,
                color: '#000',
                boxShadow: `0 4px 20px rgba(${project.colorRgb}, 0.3)`,
              }}
            >
              {t.viewProject} →
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 text-gray-300 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================
// App
// ============================
function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [language, setLanguage] = useState<Language>('zh')

  const title = 'PORTFOLIO'
  const { displayed, done } = useTypewriter(title, 100, 300)
  const t = translations[language]

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col" style={{ background: '#050508' }}>
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Ambient gradient orbs */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            top: '-15%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            bottom: '-15%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '1.5s',
          }}
        />
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '3s',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Main two-column layout */}
      <div className="flex h-full relative" style={{ zIndex: 10 }}>
        {/* Left side — title area */}
        <div className="hidden md:flex flex-1 items-center justify-center px-12">
          <div style={{ animation: 'fade-in 0.8s ease-out 0.3s both' }}>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-[0.2em] text-white leading-tight">
              {displayed}
              <span
                className="inline-block w-[3px] h-[0.9em] ml-1 align-middle"
                style={{
                  background: '#22d3ee',
                  animation: done ? 'typewriter-cursor 1s step-end infinite' : 'none',
                  opacity: done ? undefined : 1,
                  boxShadow: '0 0 8px rgba(34, 211, 238, 0.5)',
                }}
              />
            </h1>
            <p
              className="text-base text-gray-500 mt-3 tracking-wide font-light"
              style={{ animation: 'fade-in 0.8s ease-out 1.5s both' }}
            >
              {t.subtitle}
            </p>
            <div
              className="mt-6 flex items-center gap-4"
              style={{ animation: 'fade-in 0.6s ease-out 2s both' }}
            >
              <p className="text-xs text-gray-600 tracking-widest font-mono">
                BUILT WITH <span style={{ color: '#22d3ee' }}>♥</span> AND CODE
              </p>
              <button
                onClick={() => setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'))}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
        </div>

        {/* Right side — vertical card strip */}
        <div className="w-full md:w-[520px] lg:w-[600px] xl:w-[640px] shrink-0 h-full overflow-y-auto px-4 md:px-5 py-6 md:py-8">
          {/* Mobile title — only visible on small screens */}
          <div className="md:hidden mb-6" style={{ animation: 'fade-in 0.8s ease-out 0.3s both' }}>
            <h1 className="text-3xl font-bold tracking-[0.2em] text-white">
              {displayed}
              <span
                className="inline-block w-[3px] h-[0.9em] ml-1 align-middle"
                style={{
                  background: '#22d3ee',
                  animation: done ? 'typewriter-cursor 1s step-end infinite' : 'none',
                  opacity: done ? undefined : 1,
                  boxShadow: '0 0 8px rgba(34, 211, 238, 0.5)',
                }}
              />
            </h1>
            <p className="text-sm text-gray-500 mt-1 tracking-wide font-light">
              {t.subtitle}
            </p>
          </div>

          {/* Cards Grouped by Category */}
          <div className="flex flex-col gap-8">
            {/* Entertainment Category */}
            <div>
              <h2 className="text-xl font-bold tracking-widest text-white mb-4 flex items-center gap-3" style={{ animation: 'fade-in 0.8s ease-out 0.4s both' }}>
                <span className="w-1.5 h-5 bg-[#22d3ee] rounded-full inline-block" />
                {t.categoryEntertainment}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {projects.filter(p => p.category === 'entertainment').map((project, index) => (
                  <TiltCard
                    key={project.id}
                    project={project}
                    language={language}
                    onClick={() => setSelectedProject(project)}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Games Category */}
            <div>
              <h2 className="text-xl font-bold tracking-widest text-white mb-4 flex items-center gap-3" style={{ animation: 'fade-in 0.8s ease-out 0.6s both' }}>
                <span className="w-1.5 h-5 bg-[#34d399] rounded-full inline-block" />
                {t.categoryGame}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {projects.filter(p => p.category === 'game').map((project, index) => (
                  <TiltCard
                    key={project.id}
                    project={project}
                    language={language}
                    onClick={() => setSelectedProject(project)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile signature */}
          <div
            className="md:hidden text-center mt-6 pb-4"
            style={{ animation: 'fade-in 0.6s ease-out 2s both' }}
          >
            <p className="text-xs text-gray-600 tracking-widest font-mono">
              BUILT WITH <span style={{ color: '#22d3ee' }}>♥</span> AND CODE
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Project Detail */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          language={language}
          t={t}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default App