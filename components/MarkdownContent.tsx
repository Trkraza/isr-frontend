import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
  className?: string
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={`prose prose-invert prose-slate max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-3xl font-bold text-white mb-4 gradient-text" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl font-bold text-white mb-3 mt-6" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xl font-semibold text-slate-200 mb-2 mt-4" {...props} />
          ),
          p: ({ ...props }) => <p className="text-slate-300 mb-4 leading-relaxed" {...props} />,
          a: ({ ...props }) => (
            <a
              className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ ...props }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2" {...props} />,
          li: ({ ...props }) => <li className="ml-4" {...props} />,
          code: ({ className, ...props }) => {
            const isInline = !className
            return isInline ? (
              <code
                className="px-1.5 py-0.5 rounded bg-slate-800 text-primary-400 text-sm font-mono"
                {...props}
              />
            ) : (
              <code
                className="block px-4 py-3 rounded-lg bg-slate-900 text-slate-300 text-sm font-mono overflow-x-auto"
                {...props}
              />
            )
          },
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-primary-500 pl-4 italic text-slate-400 my-4"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}