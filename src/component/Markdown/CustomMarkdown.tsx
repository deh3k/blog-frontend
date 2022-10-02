import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './CustomMarkdown.scss'

export default function CustomMarkdown({text}: {text: string}) {
  return (
    <div className="post-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >{text}</ReactMarkdown>
    </div>
  )
}

