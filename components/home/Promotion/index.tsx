import React, { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Layers,
  Eye,
  Search,
  Zap,
  ChevronRight,
  Sliders,
  RotateCcw,
  Info,
  Maximize2,
  Cpu,
  MousePointer,
  Sparkles,
  ExternalLink,
  Target,
} from "lucide-react";

// Custom inline SVG icons for referrers for pixel-perfect match
const GoogleIcon = () => (
  <svg
    className="w-4 h-4 text-white opacity-80"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const ChatGptIcon = () => (
  <svg
    className="w-4 h-4 text-white opacity-80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 0 1 10 10c0 1.25-.23 2.45-.65 3.56l-1.12-1.12a8 8 0 0 0 .77-2.44 8 8 0 0 0-14 0c.2.8.46 1.63.77 2.44l-1.12 1.12A10 10 0 0 1 12 2z" />
    <path d="M12 22a10 10 0 0 1-10-10c0-1.25.23-2.45.65-3.56l1.12 1.12A8 8 0 0 0 3 12a8 8 0 0 0 14 0c-.2-.8-.46-1.63-.77-2.44l1.12-1.12A10 10 0 0 1 12 22z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    className="w-4 h-4 text-white opacity-80"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    className="w-4 h-4 text-white opacity-80"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.524 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.864.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.866.502-5.837.502-5.837s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const BingIcon = () => (
  <svg
    className="w-4 h-4 text-white opacity-80"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M5 3c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H5zm6.81 12.16l-1.31-1.31c.21-.29.53-.45.88-.45.61 0 1.1.49 1.1 1.1 0 .28-.11.53-.29.7l-.38-.04zm-.51-4.22c-.61 0-1.1-.49-1.1-1.1s.49-1.1 1.1-1.1 1.1.49 1.1 1.1-.49 1.1-1.1 1.1zm-4.3 1.06c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5-4.5-2.02-4.5-4.5z" />
  </svg>
);

const XIcon = () => (
  <svg
    className="w-4 h-4 text-white opacity-80"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Framer Tool Spotlight & 3D Tilt Component wrapper
const TiltCard = React.forwardRef(
  ({ children, className = "", debugMode = false }, ref) => {
    const internalRef = useRef(null);
    const cardRef = ref || internalRef;
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();

      // Relative coordinates
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      setIsHovered(true);

      // Calculate rotation (-10deg to 10deg max)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      setTilt({ x: rotateX, y: rotateY });

      // Set CSS properties for the interactive spotlight spotlight
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
      setIsHovered(false);
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s ease-out",
        }}
        className={`relative rounded-[24px] border border-white/10 bg-[#0a0a0a] overflow-hidden group/card ${className}`}
      >
        {/* Spotlight overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 80%)`,
          }}
        />

        {/* Shiny border spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.12), transparent 50%)`,
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {children}

        {/* Interactive visualizer overlay for testing purposes */}
        {debugMode && (
          <div className="absolute top-4 right-4 pointer-events-none z-50 bg-black/80 border border-yellow-500/50 rounded-lg p-2 text-[10px] font-mono text-yellow-500 select-none space-y-1">
            <div>Tilt X: {tilt.x.toFixed(2)}°</div>
            <div>Tilt Y: {tilt.y.toFixed(2)}°</div>
            <div>X: {Math.round(mousePos.x)}px</div>
            <div>Y: {Math.round(mousePos.y)}px</div>
          </div>
        )}
      </div>
    );
  },
);

export default function App() {
  // Playground State
  const [debugMode, setDebugMode] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(420);

  // Lighthouse Score States initialized to 0 for the entry count-up effect
  const [lighthouseSEO, setLighthouseSEO] = useState(0);
  const [lighthousePerformance, setLighthousePerformance] = useState(0);
  const [lighthouseAccessibility, setLighthouseAccessibility] = useState(0);

  // Default target scores
  const targetSEO = useRef(99);
  const targetPerformance = useRef(100);
  const targetAccessibility = useRef(98);

  const [selectedABVersion, setSelectedABVersion] = useState("B"); // 'A', 'B', 'C'
  const [abActiveTab, setAbActiveTab] = useState("Pages"); // 'Pages', 'Layers', 'Assets'

  // Hover states for the Analytics graph to simulate mouse moving tooltip
  const [hoverIndex, setHoverIndex] = useState(4); // default centered index
  const chartContainerRef = useRef(null);

  // SEO section reference for Intersection Observer
  const seoSectionRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Mock static values for referrers
  const referrers = [
    { name: "google.com", count: "436K", icon: <GoogleIcon /> },
    { name: "chatgpt.com", count: "189K", icon: <ChatGptIcon /> },
    { name: "linkedin.com", count: "96K", icon: <LinkedinIcon /> },
    { name: "youtube.com", count: "82K", icon: <YoutubeIcon /> },
    { name: "bing.com", count: "71K", icon: <BingIcon /> },
    { name: "x.com", count: "49K", icon: <XIcon /> },
  ];

  // Data series representing the line graphs
  const graphData = [
    { label: "May 24", visitors: 65000, pageviews: 210000 },
    { label: "May 25", visitors: 72000, pageviews: 225000 },
    { label: "May 26", visitors: 81000, pageviews: 242000 },
    { label: "May 27", visitors: 78000, pageviews: 230000 },
    { label: "May 28", visitors: 85458, pageviews: 258156 }, // Active focal point
    { label: "May 29", visitors: 92000, pageviews: 275000 },
    { label: "May 30", visitors: 88000, pageviews: 265000 },
    { label: "May 31", visitors: 96000, pageviews: 290000 },
    { label: "Jun 01", visitors: 104000, pageviews: 312000 },
  ];

  // Observe SEO card view entry to trigger / reset Countup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          // When it goes out of focus/view, reset scores to 0 so they count up fresh next time
          setIsIntersecting(false);
          setLighthouseSEO(0);
          setLighthousePerformance(0);
          setLighthouseAccessibility(0);
        }
      },
      { threshold: 0.15 }, // Trigger when 15% of the card is in view
    );

    if (seoSectionRef.current) {
      observer.observe(seoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle the countup animation on visibility/focus toggles
  useEffect(() => {
    if (!isIntersecting) return;

    // Reset scores to 0 before starting the countup to ensure it starts clean
    setLighthouseSEO(0);
    setLighthousePerformance(0);
    setLighthouseAccessibility(0);

    let isAnimatingSEO = true;
    let isAnimatingPerf = true;
    let isAnimatingAccess = true;

    // SEO countup speed scale
    let currentSeo = 0;
    const seoInterval = setInterval(() => {
      if (currentSeo < targetSEO.current && isAnimatingSEO) {
        currentSeo++;
        setLighthouseSEO(currentSeo);
      } else {
        isAnimatingSEO = false;
        clearInterval(seoInterval);
      }
    }, 12);

    // Performance countup speed scale
    let currentPerf = 0;
    const perfInterval = setInterval(() => {
      if (currentPerf < targetPerformance.current && isAnimatingPerf) {
        currentPerf++;
        setLighthousePerformance(currentPerf);
      } else {
        isAnimatingPerf = false;
        clearInterval(perfInterval);
      }
    }, 10);

    // Accessibility countup speed scale
    let currentAccess = 0;
    const accessInterval = setInterval(() => {
      if (currentAccess < targetAccessibility.current && isAnimatingAccess) {
        currentAccess++;
        setLighthouseAccessibility(currentAccess);
      } else {
        isAnimatingAccess = false;
        clearInterval(accessInterval);
      }
    }, 13);

    return () => {
      isAnimatingSEO = false;
      isAnimatingPerf = false;
      isAnimatingAccess = false;
      clearInterval(seoInterval);
      clearInterval(perfInterval);
      clearInterval(accessInterval);
    };
  }, [isIntersecting]);

  const handleChartMouseMove = (e) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, relativeX / width));
    const rawIndex = Math.round(percentage * (graphData.length - 1));
    setHoverIndex(rawIndex);
  };

  const handleReset = () => {
    setLiveVisitors(420);
    setLighthouseSEO(0);
    setLighthousePerformance(0);
    setLighthouseAccessibility(0);
    targetSEO.current = 99;
    targetPerformance.current = 100;
    targetAccessibility.current = 98;
    setIsIntersecting(false);

    // Quick re-evaluation of intersection state after a short tick
    setTimeout(() => {
      if (seoSectionRef.current) {
        const rect = seoSectionRef.current.getBoundingClientRect();
        const isCurrentlyVisible =
          rect.top < window.innerHeight && rect.bottom >= 0;
        if (isCurrentlyVisible) {
          setIsIntersecting(true);
        }
      }
    }, 50);

    setSelectedABVersion("B");
    setHoverIndex(4);
    setAbActiveTab("Pages");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-neutral-800 selection:text-white pb-24">
      {/* Playground Utility Header */}
      <div className="w-full bg-neutral-900/60 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 p-1 rounded-lg">
            <Cpu className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-semibold text-sm text-neutral-200">
              Interactive Canvas Sandbox
            </span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 font-mono px-1.5 py-0.5 rounded ml-2">
              Framer-Spec v4.2
            </span>
          </div>
        </div>

        {/* Live Controller Dashboard */}
        <div className="flex items-center gap-4 flex-wrap text-sm text-neutral-400">
          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-xs font-mono">Live Visitors:</span>
            <input
              type="number"
              value={liveVisitors}
              onChange={(e) => setLiveVisitors(Number(e.target.value))}
              className="w-14 bg-transparent border-none text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded text-center"
            />
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-xs font-mono">Performance:</span>
            <input
              type="range"
              min="1"
              max="100"
              value={lighthousePerformance}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLighthousePerformance(val);
                targetPerformance.current = val;
              }}
              className="w-20 accent-cyan-500 h-1 rounded"
            />
            <span className="text-white font-mono font-bold text-xs w-6">
              {lighthousePerformance}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDebugMode(!debugMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${debugMode ? "bg-yellow-500 text-black font-semibold" : "bg-neutral-800 text-white hover:bg-neutral-700"}`}
            >
              <MousePointer className="w-3.5 h-3.5" />
              {debugMode ? "Debug ON" : "Debug Off"}
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 text-white hover:bg-neutral-700 transition-all flex items-center gap-1.5"
              title="Reset metrics"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mt-16">
        {/* Component Header Block */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-neutral-500 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
            <span>Framer Landing Section Replica</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-none text-white">
            Scale without <br className="hidden sm:inline" />
            switching tools
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg mt-4 max-w-xl">
            A meticulously crafted high-fidelity representation of Framer's
            landing presentation. Hover any card to explore spotlight glows, 3D
            tilt effects, and real-time state manipulation.
          </p>
        </div>

        {/* 2-Column Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* ================= COLUMN 1: ANALYTICS & INSIGHTS (LARGE CARD) ================= */}
          <TiltCard
            debugMode={debugMode}
            className="p-8 flex flex-col min-h-[740px]"
          >
            <div className="space-y-2 mb-6">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                Module 01
              </span>
              <h2 className="text-xl font-medium tracking-tight mt-2 text-white">
                Analytics & insights
              </h2>
              <p className="text-neutral-400 text-sm max-w-sm">
                Track traffic, measure performance, and monitor conversions in a
                clean overview.
              </p>
              <a
                href="#learn-more-analytics"
                className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors pt-2 group"
              >
                Learn more
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Inner Interactive Visual Panel */}
            <div className="bg-[#050505] rounded-[18px] border border-white/5 p-6 flex-grow flex flex-col justify-between relative">
              {/* Overview Header */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold tracking-wide text-neutral-200">
                    Overview
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] bg-neutral-900 border border-white/5 px-2 py-1 rounded text-neutral-400">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
                    <span>Real-time tracking</span>
                  </div>
                </div>

                {/* Visitor Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <span>Live Visitors</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1da1f2] inline-block animate-pulse" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
                      {liveVisitors}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-neutral-500">
                      Unique Visitors
                    </div>
                    <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
                      1.7M
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-neutral-500">
                      Total Pageviews
                    </div>
                    <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
                      3.2M
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Sparkline Graph - Fully Interactive Hover */}
              <div className="relative my-4 flex-grow flex flex-col justify-end min-h-[160px]">
                <div className="absolute top-0 left-0 text-[11px] text-neutral-600 font-mono">
                  330k
                </div>

                {/* SVG Visual Paths */}
                <div
                  ref={chartContainerRef}
                  onMouseMove={handleChartMouseMove}
                  className="w-full h-32 relative cursor-crosshair"
                >
                  <svg
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    {/* Definitions for Gradients */}
                    <defs>
                      <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#2563eb"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#2563eb"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient
                        id="purpleGlow"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#c084fc"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#c084fc"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Pageviews Area & Line (Blue) */}
                    <path
                      d={`
                        M 0 ${120 - (graphData[0].pageviews / 330000) * 100}
                        L ${50} ${120 - (graphData[1].pageviews / 330000) * 100}
                        L ${100} ${120 - (graphData[2].pageviews / 330000) * 100}
                        L ${150} ${120 - (graphData[3].pageviews / 330000) * 100}
                        L ${200} ${120 - (graphData[4].pageviews / 330000) * 100}
                        L ${250} ${120 - (graphData[5].pageviews / 330000) * 100}
                        L ${300} ${120 - (graphData[6].pageviews / 330000) * 100}
                        L ${350} ${120 - (graphData[7].pageviews / 330000) * 100}
                        L ${400} ${120 - (graphData[8].pageviews / 330000) * 100}
                      `}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Visitors Area & Line (Purple) */}
                    <path
                      d={`
                        M 0 ${120 - (graphData[0].visitors / 330000) * 100}
                        L ${50} ${120 - (graphData[1].visitors / 330000) * 100}
                        L ${100} ${120 - (graphData[2].visitors / 330000) * 100}
                        L ${150} ${120 - (graphData[3].visitors / 330000) * 100}
                        L ${200} ${120 - (graphData[4].visitors / 330000) * 100}
                        L ${250} ${120 - (graphData[5].visitors / 330000) * 100}
                        L ${300} ${120 - (graphData[6].visitors / 330000) * 100}
                        L ${350} ${120 - (graphData[7].visitors / 330000) * 100}
                        L ${400} ${120 - (graphData[8].visitors / 330000) * 100}
                      `}
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Interactive Guideline */}
                    {hoverIndex !== null && (
                      <line
                        x1={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                        y1="0"
                        x2={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                        y2="100%"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Interactive highlight anchors */}
                    {hoverIndex !== null && (
                      <>
                        {/* Pageviews Dot */}
                        <circle
                          cx={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                          cy={`${120 - (graphData[hoverIndex].pageviews / 330000) * 100}`}
                          r="5"
                          fill="#3b82f6"
                          stroke="white"
                          strokeWidth="2.5"
                          className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                        />
                        {/* Visitors Dot */}
                        <circle
                          cx={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                          cy={`${120 - (graphData[hoverIndex].visitors / 330000) * 100}`}
                          r="5"
                          fill="#c084fc"
                          stroke="white"
                          strokeWidth="2.5"
                          className="drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                        />
                      </>
                    )}
                  </svg>

                  {/* Dynamic Tooltip following target point */}
                  <div
                    className="absolute z-10 bg-black/90 border border-white/10 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs w-[170px] pointer-events-none transition-all duration-75"
                    style={{
                      left: `${Math.max(5, Math.min(65, (hoverIndex / (graphData.length - 1)) * 100))}%`,
                      bottom: "50px",
                    }}
                  >
                    <div className="text-[10px] text-neutral-500 font-mono mb-1.5">
                      {graphData[hoverIndex].label}, 2026
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
                          Pageviews
                        </span>
                        <span className="font-mono font-semibold text-white">
                          {graphData[hoverIndex].pageviews.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                          Visitors
                        </span>
                        <span className="font-mono font-semibold text-white">
                          {graphData[hoverIndex].visitors.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referrer Sources Listing */}
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
                  <span className="font-medium">Sources</span>
                  <span className="text-[10px] text-neutral-500">Referrer</span>
                </div>

                <div className="space-y-1.5">
                  {referrers.map((ref, idx) => (
                    <div
                      key={idx}
                      className="group/row flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded bg-neutral-900 border border-white/5 flex items-center justify-center group-hover/row:border-white/20 transition-all">
                          {ref.icon}
                        </div>
                        <span className="text-neutral-300 group-hover/row:text-white transition-colors">
                          {ref.name}
                        </span>
                      </div>
                      <span className="font-mono text-neutral-400 font-semibold">
                        {ref.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          {/* ================= COLUMN 2: SPLIT STACKED CARDS ================= */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* CARD 2: A/B TESTING & OPTIMIZATION */}
            <TiltCard
              debugMode={debugMode}
              className="p-8 flex flex-col justify-between min-h-[380px]"
            >
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                  Module 02
                </span>
                <h2 className="text-xl font-medium tracking-tight mt-2 text-white">
                  A/B Testing & optimization
                </h2>
                <p className="text-neutral-400 text-sm">
                  Run high performance experiments. Tailor pages with seamless
                  variation control.
                </p>
                <a
                  href="#learn-more-ab"
                  className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors pt-1 group"
                >
                  Learn more
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Mock Framer Tool Designer Visual */}
              <div className="bg-[#050505] rounded-[18px] border border-white/5 overflow-hidden flex flex-col max-h-[220px]">
                {/* Visual Top Bar / Controls */}
                <div className="bg-neutral-950 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>

                  {/* Design Tool Navigation Mocks */}
                  <div className="flex items-center gap-3 bg-neutral-900 px-3 py-1 rounded-md border border-white/5">
                    <button
                      onClick={() => setAbActiveTab("Pages")}
                      className={`text-[10px] font-semibold tracking-wider uppercase transition-colors px-1.5 py-0.5 rounded ${abActiveTab === "Pages" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                      Pages
                    </button>
                    <button
                      onClick={() => setAbActiveTab("Layers")}
                      className={`text-[10px] font-semibold tracking-wider uppercase transition-colors px-1.5 py-0.5 rounded ${abActiveTab === "Layers" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                      Layers
                    </button>
                    <button
                      onClick={() => setAbActiveTab("Assets")}
                      className={`text-[10px] font-semibold tracking-wider uppercase transition-colors px-1.5 py-0.5 rounded ${abActiveTab === "Assets" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                      Assets
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-4 w-[1px] bg-white/10" />
                    <Target className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
                  </div>
                </div>

                {/* Left/Right visual splitter layout */}
                <div className="flex flex-row flex-grow h-[160px]">
                  {/* Navigation tree panel */}
                  <div className="w-1/3 bg-neutral-950 p-3.5 border-r border-white/5 flex flex-col gap-2 font-mono overflow-y-auto">
                    {abActiveTab === "Pages" && (
                      <>
                        <div className="text-[10px] text-neutral-500 font-semibold mb-1 tracking-wider uppercase">
                          Active Tree
                        </div>

                        {/* Interactive Page Switchers */}
                        <div className="space-y-1 text-[11px]">
                          <div className="flex items-center gap-1.5 text-neutral-300 px-1 py-0.5">
                            <span className="text-neutral-600">▾</span>{" "}
                            <span>Home</span>
                          </div>

                          {/* Variations */}
                          <button
                            onClick={() => setSelectedABVersion("A")}
                            className={`w-full text-left flex items-center justify-between pl-4 pr-1.5 py-1 rounded transition-all ${selectedABVersion === "A" ? "bg-blue-600/20 text-blue-400 font-bold border-l-2 border-blue-500" : "text-neutral-500 hover:bg-white/5"}`}
                          >
                            <span>A: Control</span>
                            <span className="text-[9px] bg-neutral-900 border border-white/5 px-1 rounded">
                              20%
                            </span>
                          </button>

                          <button
                            onClick={() => setSelectedABVersion("B")}
                            className={`w-full text-left flex items-center justify-between pl-4 pr-1.5 py-1 rounded transition-all ${selectedABVersion === "B" ? "bg-cyan-600/20 text-cyan-400 font-bold border-l-2 border-cyan-500" : "text-neutral-500 hover:bg-white/5"}`}
                          >
                            <span>B: Version B</span>
                            <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1 rounded">
                              60%
                            </span>
                          </button>

                          <button
                            onClick={() => setSelectedABVersion("C")}
                            className={`w-full text-left flex items-center justify-between pl-4 pr-1.5 py-1 rounded transition-all ${selectedABVersion === "C" ? "bg-purple-600/20 text-purple-400 font-bold border-l-2 border-purple-500" : "text-neutral-500 hover:bg-white/5"}`}
                          >
                            <span>C: Version C</span>
                            <span className="text-[9px] bg-neutral-900 border border-white/5 px-1 rounded">
                              20%
                            </span>
                          </button>
                        </div>
                      </>
                    )}

                    {abActiveTab === "Layers" && (
                      <div className="space-y-1.5 text-[11px] text-neutral-400">
                        <div>■ Layout.Header</div>
                        <div className="pl-3">□ Header.Logo</div>
                        <div className="pl-3">□ Header.NavList</div>
                        <div>■ MainHero</div>
                        <div className="pl-3 text-cyan-400">
                          ■ InteractiveHeroText
                        </div>
                        <div className="pl-6 text-cyan-500">
                          └─ Variation: {selectedABVersion}
                        </div>
                        <div>■ Footer</div>
                      </div>
                    )}

                    {abActiveTab === "Assets" && (
                      <div className="space-y-1.5 text-[11px] text-neutral-400">
                        <div>⚡ GoogleAnalyticsAPI</div>
                        <div>⚡ StripeElementsEngine</div>
                        <div>◈ neonGlowBackground.png</div>
                        <div>◈ brandFontBold.woff2</div>
                      </div>
                    )}
                  </div>

                  {/* Desktop Preview Frame representing variations */}
                  <div className="w-2/3 bg-neutral-900 p-4 relative overflow-hidden flex flex-col justify-between">
                    {/* Tiny header address indicator */}
                    <div className="flex items-center justify-between text-[8px] text-neutral-500 font-mono bg-black/40 px-2 py-1 rounded border border-white/5">
                      <span className="truncate">
                        https://preview.voiceai.platform/
                      </span>
                      <span className="text-cyan-400">
                        Preview: {selectedABVersion}
                      </span>
                    </div>

                    {/* Varying visual headline depending on Selected Version */}
                    <div className="my-auto space-y-1.5">
                      <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
                        Dynamic Sandbox Website
                      </div>

                      {selectedABVersion === "A" && (
                        <div className="text-sm font-semibold tracking-tight text-white leading-tight animate-fade-in">
                          The absolute fastest voice AI platform on earth.
                        </div>
                      )}

                      {selectedABVersion === "B" && (
                        <div className="text-sm font-semibold tracking-tight text-white leading-tight animate-fade-in bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          The fastest, ultra-realistic voice AI platform.
                        </div>
                      )}

                      {selectedABVersion === "C" && (
                        <div className="text-sm font-semibold tracking-tight text-white leading-tight animate-fade-in">
                          Deploy high-performance voice AI agents in seconds.
                        </div>
                      )}

                      <div className="text-[9px] text-neutral-400 flex items-center gap-1.5">
                        <span className="bg-white/10 px-1 py-0.5 rounded">
                          60fps rendering
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded font-mono">
                          204ms TTFB
                        </span>
                      </div>
                    </div>

                    {/* Funnel conversion simulation */}
                    <div className="absolute bottom-2 right-2 bg-neutral-950/90 border border-white/10 px-2 py-1 rounded text-[9px] font-mono flex items-center gap-1.5 shadow-md">
                      <span className="text-neutral-500">Conversion Rate:</span>
                      {selectedABVersion === "A" && (
                        <span className="text-neutral-400">3.14%</span>
                      )}
                      {selectedABVersion === "B" && (
                        <span className="text-cyan-400 font-bold">
                          5.82% (Winner)
                        </span>
                      )}
                      {selectedABVersion === "C" && (
                        <span className="text-purple-400">4.11%</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* CARD 3: SEO & PERFORMANCE */}
            <TiltCard
              ref={seoSectionRef}
              debugMode={debugMode}
              className="p-8 flex flex-col justify-between min-h-[340px]"
            >
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                  Module 03
                </span>
                <h2 className="text-xl font-medium tracking-tight mt-2 text-white">
                  SEO & performance
                </h2>
                <p className="text-neutral-400 text-sm">
                  Optimize every page with built-in SEO settings, metadata, and
                  blazing-fast performance.
                </p>
                <a
                  href="#learn-more-seo"
                  className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors pt-1 group"
                >
                  Learn more
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Google Lighthouse Score Visual */}
              <div className="bg-[#050505] rounded-[18px] border border-white/5 p-6 flex flex-col items-center justify-center">
                {/* Header label with lighthouse brand mark */}
                <div className="flex items-center gap-2 mb-6 self-start">
                  <span className="text-xs text-neutral-400 font-mono tracking-wider">
                    Lighthouse Metrics Engine
                  </span>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>

                {/* Score meters grid */}
                <div className="flex items-center justify-around w-full gap-4 max-w-[360px]">
                  {/* SEO Circle Progress */}
                  <div className="flex flex-col items-center gap-2 group/meter">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="32"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="32"
                          stroke="#3b82f6"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - lighthouseSEO / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        />
                      </svg>
                      <span className="font-mono text-base sm:text-lg font-bold text-white group-hover/meter:scale-110 transition-transform">
                        {lighthouseSEO}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-medium font-sans mt-1">
                      SEO
                    </span>
                  </div>

                  {/* Performance Circle Progress */}
                  <div className="flex flex-col items-center gap-2 group/meter">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="40"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="40"
                          stroke="#10b981"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - lighthousePerformance / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                        />
                      </svg>
                      <span className="font-mono text-lg sm:text-2xl font-black text-white group-hover/meter:scale-110 transition-transform">
                        {lighthousePerformance}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-bold font-sans tracking-wide mt-1">
                      Performance
                    </span>
                  </div>

                  {/* Accessibility Circle Progress */}
                  <div className="flex flex-col items-center gap-2 group/meter">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="32"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="32"
                          stroke="#a855f7"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - lighthouseAccessibility / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                        />
                      </svg>
                      <span className="font-mono text-base sm:text-lg font-bold text-white group-hover/meter:scale-110 transition-transform">
                        {lighthouseAccessibility}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-medium font-sans mt-1">
                      Accessibility
                    </span>
                  </div>
                </div>

                {/* Score Adjuster Slider Console - for Sandbox interactiveness */}
                <div className="w-full mt-6 grid grid-cols-2 gap-3 text-[10px] text-neutral-500 font-mono border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between">
                    <span>Adjust SEO:</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={lighthouseSEO}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLighthouseSEO(val);
                        targetSEO.current = val;
                      }}
                      className="w-16 accent-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Adjust Access:</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={lighthouseAccessibility}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLighthouseAccessibility(val);
                        targetAccessibility.current = val;
                      }}
                      className="w-16 accent-purple-500"
                    />
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Feature Highlights Grid at Bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 border-t border-white/10 pt-10">
          <div className="flex gap-3">
            <div className="p-2 h-fit rounded-lg bg-neutral-900 border border-white/5 text-cyan-500">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Full SEO Metadata Controls
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Customize titles, descriptions, OpenGraph tags, and canonical
                maps directly in our visual suite.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 h-fit rounded-lg bg-neutral-900 border border-white/5 text-emerald-500">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Global Edge Cache Network
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Your site is automatically hosted and compiled instantly on high
                speed edge nodes globally.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 h-fit rounded-lg bg-neutral-900 border border-white/5 text-indigo-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Collaborative Funnel Tools
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Share layouts and variant pages with design colleagues and
                clients with one single preview link.
              </p>
            </div>
          </div>
        </div>

        {/* Informational Interactive Note Footer */}
        <div className="mt-16 bg-neutral-950 rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-2.5 bg-neutral-900 rounded-xl border border-white/10 text-cyan-400">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">
                How the Interactive Effects work:
              </h4>
              <p className="text-xs text-neutral-500 max-w-xl mt-1">
                This recreation tracks the exact vector offset from the center
                of each card on mouse move, applying immediate CSS perspective
                transforms and rotating coordinate metrics in real-time.
                Hovering over the analytics chart updates the dual-path SVG
                nodes instantly.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setDebugMode(true);
              setLiveVisitors(1337);
              setLighthousePerformance(100);
              setLighthouseSEO(100);
            }}
            className="w-full md:w-auto px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs font-semibold rounded-xl text-neutral-300 transition-all flex items-center justify-center gap-2 shrink-0 group"
          >
            <span>Activate Super-Debug Mode</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
