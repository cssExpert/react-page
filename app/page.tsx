import Link from 'next/link'
import { ArrowRight, Layers, Code2, Zap, Paintbrush } from 'lucide-react'

export default function HomePage() {
  const features = [
    { icon: Layers, title: 'Drag & Drop', desc: 'Drag pre-built sections onto your canvas and rearrange them instantly.' },
    { icon: Paintbrush, title: 'Live Styling', desc: 'Edit Tailwind classes in real-time. Every change renders instantly.' },
    { icon: Code2, title: 'Export Clean Code', desc: 'Export semantic HTML with proper structure and Tailwind classes.' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Built with Next.js 15, optimized for the fastest DX possible.' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            VisualEditor
          </span>
          <Link
            href="/editor"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            Open Editor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            Next.js 15 · Tailwind · dnd-kit · Framer Motion
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
            Build websites{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              visually
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A production-grade visual editor with drag-and-drop, live Tailwind editing,
            responsive preview, and clean HTML export.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/editor"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
            >
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Preview mockup */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="mx-auto text-xs text-slate-500">localhost:3000/editor</div>
            </div>
            <div className="grid grid-cols-12 h-80">
              <div className="col-span-2 bg-slate-900 border-r border-slate-800 p-3 space-y-1">
                {['Hero', 'Features', 'Pricing', 'FAQ', 'Footer', 'Cards', 'Buttons'].map((cat) => (
                  <div key={cat} className="text-xs text-slate-500 bg-slate-800/50 rounded px-2 py-1.5">{cat}</div>
                ))}
              </div>
              <div className="col-span-8 bg-white p-4 overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl h-28 mb-3 flex items-center justify-center ring-2 ring-indigo-400">
                  <div className="text-center text-white">
                    <div className="font-bold text-lg">Hero Section</div>
                    <div className="text-xs opacity-75 mt-1">Selected</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-xs text-gray-400">Feature {i}</div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 bg-slate-900 border-l border-slate-800 p-3 space-y-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">Inspector</div>
                {['Classes', 'Typography', 'Layout', 'Spacing', 'Borders', 'Background'].map((s) => (
                  <div key={s} className="text-xs text-slate-500 bg-slate-800/50 rounded px-2 py-1">{s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">ship faster</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to build?</h2>
        <p className="text-slate-400 mb-8">Start creating beautiful pages in minutes.</p>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105"
        >
          Open Editor <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  )
}
