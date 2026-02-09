import type { Language } from '../App'

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

interface ProjectCardProps {
  project: Project
  language: Language
  translations: {
    viewDetails: string
  }
  onClick: () => void
  index: number
}

export default function ProjectCard({ project, language, translations, onClick, index }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10 cursor-pointer hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      {/* Gradient Glow Effect on Hover */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10 blur-xl`}
      />
      
      {/* Border Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg -z-20`}
      />

      <div className="flex items-start gap-4 md:gap-6">
        {/* Icon with Floating Animation */}
        <div 
          className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${project.iconGradient} flex items-center justify-center text-3xl md:text-4xl shrink-0 shadow-lg shadow-${project.gradient.split('-')[1]}/30 group-hover:scale-110 transition-transform duration-300`}
        >
          <span className="animate-float">{project.image}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.title[language]}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-4 line-clamp-2 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
            {project.description[language]}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-lg text-xs md:text-sm text-gray-300 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-lg text-xs md:text-sm text-gray-400 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className={`flex items-center gap-2 text-sm text-gray-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-1`}>
            <span className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent font-medium`}>
              {translations.viewDetails}
            </span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
