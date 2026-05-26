'use client'

import { useState } from 'react'
import { Undo2, Redo2, Trash2, Copy, ClipboardPaste, Code2, Download, ChevronRight, MousePointer2, Hand, Type } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { cn } from '@/lib/utils'
import type { EditorTool } from '@/types/editor'

function buildBreadcrumb(nodes: import('@/types/editor').EditorNode[], targetId: string): import('@/types/editor').EditorNode[] {
  for (const node of nodes) {
    if (node.id === targetId) return [node]
    if (node.children) {
      const path = buildBreadcrumb(node.children, targetId)
      if (path.length > 0) return [node, ...path]
    }
  }
  return []
}

function generateHTML(nodes: import('@/types/editor').EditorNode[], indent = 0): string {
  const pad = '  '.repeat(indent)
  const voidTags = new Set(['input', 'img', 'br', 'hr', 'meta', 'link'])
  return nodes.map((node) => {
    const attrs = [
      node.className ? `class="${node.className}"` : '',
      ...Object.entries(node.props || {}).map(([k, v]) => `${k}="${v}"`),
    ].filter(Boolean).join(' ')
    if (voidTags.has(node.tag)) return `${pad}<${node.tag}${attrs ? ' ' + attrs : ''} />`
    const open = `<${node.tag}${attrs ? ' ' + attrs : ''}>`
    if (node.children?.length) return `${pad}${open}\n${generateHTML(node.children, indent + 1)}\n${pad}</${node.tag}>`
    return `${pad}${open}${node.content || ''}</${node.tag}>`
  }).join('\n')
}

function IconBtn({
  onClick, disabled = false, title, danger = false, children,
}: {
  onClick: () => void; disabled?: boolean; title?: string; danger?: boolean; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'p-1.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
        danger
          ? 'text-gray-500 dark:text-[#7A7A7A] hover:bg-red-500/10 hover:text-red-400'
          : 'text-gray-500 dark:text-[#7A7A7A] hover:bg-gray-100 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E8E8E8]'
      )}
    >
      {children}
    </button>
  )
}

function ExportModal({ onClose }: { onClose: () => void }) {
  const { nodes } = useEditorStore()
  const code = generateHTML(nodes)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl border bg-white dark:bg-[#1D1D1D] border-gray-200 dark:border-[#2A2A2A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#2A2A2A]">
          <h2 className="font-semibold text-sm flex items-center gap-2 text-gray-900 dark:text-[#E8E8E8]">
            <Code2 className="w-4 h-4 text-indigo-600 dark:text-[#CEFF00]" />
            Export HTML
          </h2>
          <button
            onClick={onClose}
            className="text-xl leading-none transition-colors text-gray-500 dark:text-[#7A7A7A] hover:text-gray-900 dark:hover:text-[#E8E8E8]"
          >
            ×
          </button>
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="text-xs font-mono rounded-xl p-4 overflow-auto bg-gray-50 dark:bg-[#131313] text-gray-600 dark:text-[#A0A0A0]">
            {code || '<!-- No elements on canvas -->'}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-[#2A2A2A] flex gap-3 justify-end">
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              copied
                ? 'bg-green-500 text-black'
                : 'bg-indigo-600 dark:bg-[#CEFF00] text-white dark:text-black hover:bg-indigo-700 dark:hover:bg-[#D4FF1A]'
            )}
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={() => {
              const blob = new Blob([code], { type: 'text/html' })
              const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'page.html'; a.click()
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
              bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-[#A0A0A0]
              border border-gray-200 dark:border-[#2A2A2A]
              hover:border-indigo-500 dark:hover:border-[#CEFF00]"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BottomToolbar() {
  const { selectedId, nodes, undo, redo, canUndo, canRedo, removeNode, copyNode, pasteNode, clearCanvas, activeTool, setActiveTool, clipboard } = useEditorStore()
  const [showExport, setShowExport] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const breadcrumb = selectedId ? buildBreadcrumb(nodes, selectedId) : []

  const tools: { id: EditorTool; icon: React.ElementType; label: string }[] = [
    { id: 'select', icon: MousePointer2, label: 'Select (V)' },
    { id: 'hand', icon: Hand, label: 'Pan (H)' },
    { id: 'text', icon: Type, label: 'Text (T)' },
  ]

  return (
    <>
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowClearConfirm(false)}>
          <div
            className="rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl border bg-white dark:bg-[#1D1D1D] border-gray-200 dark:border-[#2A2A2A]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-[#E8E8E8]">Clear canvas?</h3>
            <p className="text-sm mb-5 text-gray-500 dark:text-[#A0A0A0]">All elements will be removed. You can undo this.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 rounded-lg text-sm transition-colors
                  bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-[#A0A0A0]
                  border border-gray-200 dark:border-[#2A2A2A]"
              >
                Cancel
              </button>
              <button
                onClick={() => { clearCanvas(); setShowClearConfirm(false) }}
                className="flex-1 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 h-10 flex items-center px-3 gap-1 border-t bg-white dark:bg-[#1D1D1D] border-gray-200 dark:border-[#2A2A2A]">
        {/* Tool switcher */}
        <div className="flex items-center gap-0.5 rounded-md p-0.5 mr-1 bg-gray-100 dark:bg-[#252525]">
          {tools.map(({ id, icon: Icon, label }) => {
            const active = activeTool === id
            return (
              <button
                key={id}
                onClick={() => setActiveTool(id)}
                title={label}
                className={cn(
                  'p-1.5 rounded transition-colors',
                  active
                    ? 'bg-indigo-600 dark:bg-[#CEFF00] text-white dark:text-black'
                    : 'text-gray-500 dark:text-[#7A7A7A]'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 mx-0.5 bg-gray-200 dark:bg-[#2A2A2A]" />

        {/* Undo / Redo */}
        <IconBtn onClick={undo} disabled={!canUndo} title="Undo (⌘Z)"><Undo2 className="w-3.5 h-3.5" /></IconBtn>
        <IconBtn onClick={redo} disabled={!canRedo} title="Redo (⌘⇧Z)"><Redo2 className="w-3.5 h-3.5" /></IconBtn>

        {/* Selected actions */}
        {selectedId && (
          <>
            <div className="w-px h-5 mx-0.5 bg-gray-200 dark:bg-[#2A2A2A]" />
            <IconBtn onClick={() => copyNode(selectedId)} title="Copy"><Copy className="w-3.5 h-3.5" /></IconBtn>
            <IconBtn onClick={() => removeNode(selectedId)} title="Delete" danger><Trash2 className="w-3.5 h-3.5" /></IconBtn>
          </>
        )}
        {clipboard && (
          <IconBtn onClick={() => pasteNode()} title="Paste"><ClipboardPaste className="w-3.5 h-3.5" /></IconBtn>
        )}

        {/* Breadcrumb */}
        <div className="flex-1 flex items-center gap-0.5 overflow-hidden mx-2 min-w-0">
          {breadcrumb.length > 0 ? (
            breadcrumb.map((node, i) => (
              <span key={node.id} className="flex items-center gap-0.5 min-w-0">
                {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-500 dark:text-[#7A7A7A]" />}
                <button
                  onClick={() => useEditorStore.getState().selectNode(node.id)}
                  className="text-xs font-mono truncate max-w-[72px] transition-colors text-gray-500 dark:text-[#7A7A7A] hover:text-indigo-600 dark:hover:text-[#CEFF00]"
                  title={node.type}
                >
                  {node.tag}
                </button>
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500 dark:text-[#7A7A7A]">No selection</span>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1.5">
          {nodes.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-2.5 py-1 rounded text-xs transition-colors text-gray-500 dark:text-[#7A7A7A] hover:text-red-400 hover:bg-red-500/8"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all
              bg-indigo-600 dark:bg-[#CEFF00] text-white dark:text-black
              hover:bg-indigo-700 dark:hover:bg-[#D4FF1A]"
          >
            <Code2 className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>
    </>
  )
}
