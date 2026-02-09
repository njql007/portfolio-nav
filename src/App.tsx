import { useState, useEffect } from 'react'
import ProjectCard from './components/ProjectCard'

export type Language = 'zh' | 'en'

interface Project {
  id: number
  title: Record<Language, string>
  description: Record<Language, string>
  longDescription: Record<Language, string>
  image: string
  tags: string[]
  github: string
  gradient: string
  iconGradient: string
}

const translations = {
  zh: {
    title: '我的项目集',
    subtitle: '精选项目展示',
    viewDetails: '查看详情',
    projectDetails: '项目详情',
    visitWebsite: '访问网站',
    builtWith: 'Built with React + TypeScript + Tailwind CSS',
  },
  en: {
    title: 'My Projects',
    subtitle: 'Featured Projects',
    viewDetails: 'View Details',
    projectDetails: 'Project Details',
    visitWebsite: 'Visit Website',
    builtWith: 'Built with React + TypeScript + Tailwind CSS',
  },
}

const projects: Project[] = [
  {
    id: 1,
    title: {
      zh: 'Moyu Reader 摸鱼神器',
      en: 'Moyu Reader',
    },
    description: {
      zh: '隐秘式RSS阅读器，专为"摸鱼"场景设计的现代化资讯获取工具',
      en: 'A stealthy RSS reader designed for discreet news reading at work',
    },
    longDescription: {
      zh: `Moyu Reader 是一款专为技术爱好者打造的隐秘式RSS阅读器，采用暗色IDE风格界面设计，让您在办公时也能优雅地获取技术资讯而不会被察觉。

核心特性：
🎯 老板模式 - 一键切换（按B键），瞬间变身代码编辑器，完美融入开发环境
🌐 多源聚合 - 汇集CnBeta、IT之家、少数派、Hacker News、V2EX等12+热门技术资讯源
🤖 AI翻译 - 基于Google Gemini的智能翻译，英文内容无缝阅读
📖 智能阅读 - 自动提取文章正文，屏蔽广告和干扰元素
🎮 游戏化 - 阅读获得XP经验值，升级解锁称号，让阅读变得更有趣
📱 响应式设计 - 完美支持桌面和移动设备`,
      en: `Moyu Reader is a stealthy, feature-rich RSS reader designed for tech enthusiasts who want to stay updated with tech news without drawing attention. Built with a dark IDE-style interface that blends seamlessly into developer environments.

Key Features:
🎯 Boss Mode - One-click toggle (press B) to transform into a code editor, perfect for discreet reading
🌐 Multi-Source Aggregation - 12+ popular tech sources including CnBeta, IT之家, 少数派, Hacker News, V2EX
🤖 AI Translation - Intelligent translation powered by Google Gemini for seamless English reading
📖 Smart Reading - Auto-extract article content, block ads and distractions
🎮 Gamification - Earn XP from reading, level up and unlock titles, making reading more engaging
📱 Responsive Design - Works perfectly on desktop and mobile devices`,
    },
    image: '📚',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Google Gemini AI', 'Firebase'],
    github: 'https://reader.momoyu.lol',
    gradient: 'from-blue-500 to-cyan-500',
    iconGradient: 'from-blue-400 to-cyan-400',
  },
  {
    id: 2,
    title: {
      zh: 'Pixel Verse Social',
      en: 'Pixel Verse Social',
    },
    description: {
      zh: '多人在线像素艺术社交平台，支持YouTube视频同步观看和实时聊天',
      en: 'A multiplayer pixel art social platform with synchronized YouTube video watching and real-time chat',
    },
    longDescription: {
      zh: `Pixel Verse Social 是一个创新的多人在线像素艺术社交平台，支持多人同步观看视频、实时聊天、虚拟世界探索和互动。在这个2D像素空间中，您可以与其他用户一起观看视频、分享音乐、即时交流，打造独特的虚拟社交体验。

核心特性：
🎬 视频同步 - 支持 YouTube 和 Bilibili 视频多人实时同步观看，所有人进度一致
💬 实时聊天 - 内置聊天室，边看视频边交流讨论
🎨 AI 世界生成 - 使用 Google Gemini 生成游戏背景，支持多种艺术风格
🎵 音乐播放器 - 支持视频播放和播放队列管理，内置环境音效库
👤 像素化身 - 可自定义的像素头像，支持换装系统和稀有度分级
🎮 游戏模式 - 修炼系统、抽奖、商店等多种游戏化玩法`,
      en: `Pixel Verse Social is an innovative multiplayer online pixel art social platform supporting synchronized video watching, real-time chat, virtual world exploration, and interaction. In this 2D pixel space, watch videos together with others, share music, chat in real-time, and create a unique virtual social experience.

Key Features:
🎬 Video Sync - Supports YouTube and Bilibili video synchronized watching for everyone
💬 Live Chat - Built-in chat room for discussions while watching videos
🎨 AI World Generation - Generate game backgrounds using Google Gemini, supports multiple art styles
🎵 Music Player - Video playback with playlist management and ambient sound effects library
👤 Pixel Avatar - Customizable pixel avatars with costume system and rarity tiers
🎮 Game Modes - Cultivation system, lottery, shop, and various gamified features`,
    },
    image: '🎮',
    tags: ['React 19', 'Socket.io', 'Express', 'Node.js 22', 'Google Gemini AI', 'GCP Cloud Run'],
    github: 'https://pixel-verse.momoyu.lol',
    gradient: 'from-purple-500 to-pink-500',
    iconGradient: 'from-purple-400 to-pink-400',
  },
]

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [language, setLanguage] = useState<Language>('zh')

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh')
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-darker text-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.03]" 
           style={{
             backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}
      />

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl relative z-10">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            {t.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
              title={language === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {language === 'zh' ? '🌐 EN' : '🌐 中文'}
            </button>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </header>

        {/* Projects List */}
        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              language={language}
              translations={t}
              onClick={() => setSelectedProject(project)}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-white/10">
          <p className="mb-2">{t.builtWith}</p>
          <p className="text-xs text-gray-600">
            ✨ 自动部署测试 - {new Date().toLocaleDateString('zh-CN')}
          </p>
        </footer>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-modal-in"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative bg-dark/90 backdrop-blur-xl rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 z-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh]">
              {/* Header */}
              <div className="flex items-start gap-4 md:gap-6 mb-6">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${selectedProject.iconGradient} flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-${selectedProject.gradient.split('-')[1]}/30`}>
                  <span className="animate-float">{selectedProject.image}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 id="modal-title" className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {selectedProject.title[language]}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-lg text-xs md:text-sm text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-300">{t.projectDetails}</h3>
                <div className="whitespace-pre-line text-gray-400 leading-relaxed text-sm md:text-base">
                  {selectedProject.longDescription[language]}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center py-3 md:py-4 bg-gradient-to-r ${selectedProject.gradient} rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]`}
                >
                  {t.visitWebsite} →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
