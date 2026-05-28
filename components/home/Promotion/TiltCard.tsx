import React, { useState, useRef, useEffect } from "react";

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
  }
);

export default TiltCard;