"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      color: "#2073E6",
      badge: "Step 1 of 4",
      title: "Select your favorite front-end technology",
      desc: (
        <div>
          <p className="mb-2">
            Demonstrate to your team the efficiency and adaptability you bring
            by working seamlessly across different front-end technologies.
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Tailwind CSS</li>
            <li>Bootstrap</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-indigo-700 hover:text-white hover:bg-indigo-700 px-6 min-h-11 rounded-full text-[13px] transition-all"
          >
            Try Demo
          </Link>
        </div>
      ),
      image: "/images/Features/lg_1.webp",
    },
    {
      color: "#FFD104",
      badge: "Step 2 of 4",
      title: "Pick UI components or create new with AI",
      desc: (
        <div>
          <p className="mb-4">
            Shuffle offloads your company&rsquo;s design team. Build layouts
            from 13,400+ UI components grouped into categories such as
            navigations, headers, features, and more.
          </p>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-indigo-700 hover:text-white hover:bg-indigo-700 px-6 min-h-11 rounded-full text-[13px] transition-all"
          >
            Try Demo
          </Link>
        </div>
      ),
      image: "/images/Features/lg_2.webp",
    },
    {
      color: "#8A6EE4",
      badge: "Step 3 of 4",
      title: "Customize styles",
      desc: (
        <div>
          <p className="mb-4">
            A client asks to make the logo bigger? Don&rsquo;t worry! You will
            get a lot of configuration options to help you customize your
            templates.
          </p>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-indigo-700 hover:text-white hover:bg-indigo-700 px-6 min-h-11 rounded-full text-[13px] transition-all"
          >
            Try Demo
          </Link>
        </div>
      ),
      image: "/images/Features/lg_3.webp",
    },
    {
      color: "#4190FE",
      badge: "Step 4 of 4",
      title: "Publish anywhere or download the source code",
      desc: (
        <div>
          <p className="mb-4">
            Click export and download the project with all sources. There are no
            external dependencies and no vendor lock-in. You can also deploy
            code to Git or via SSH if needed!
          </p>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-indigo-700 hover:text-white hover:bg-indigo-700 px-6 min-h-11 rounded-full text-[13px] transition-all"
          >
            Try Demo
          </Link>
        </div>
      ),
      image: "/images/Features/lg_4.webp",
    },
  ];

  return (
    <section id="features" className="py-20 px-6 w-full clear-both">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-5">
            Build stunning layouts quickly
          </h2>
          <p className="text-base md:text-lg text-slate-400">
            Speed up your workflow in a few simple steps.
          </p>
        </div>

        {/* CONTAINER HOLDING THE STACK */}
        <div className="w-full flex flex-col items-center gap-y-24 pb-[15vh]">
          {features.map(({ color, badge, title, desc, image }, index) => {
            // Generates staggered stacking margins exactly like your screenshot
            const dynamicTop = 80 + index * 36;

            return (
              <motion.div
                key={title}
                className="sticky w-full"
                style={{
                  top: `${dynamicTop}px`,
                  zIndex: index + 1,
                }}
                // Smooth hardware-accelerated entrance to ensure layout consistency
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* INTERIOR VISUAL CARD BLOCK */}
                <div
                  className="w-full min-h-115 md:h-125 flex flex-col md:flex-row overflow-hidden rounded-[32px] shadow-2xl border border-black/5 transform-gpu"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex h-full w-full flex-col md:flex-row">
                    {/* Copy Details */}
                    <div className="flex mb-auto md:mb-0 shrink-0 flex-col items-center md:items-start md:text-left gap-5 md:gap-12 pt-8 px-6 md:p-12 lg:pl-16 text-white">
                      <div className="flex max-w-70 md:max-w-85 lg:max-w-110 flex-col gap-3 md:gap-4">
                        <span className="text-xs uppercase tracking-widest font-semibold opacity-75">
                          {badge}
                        </span>
                        <h3 className="text-2xl font-bold tracking-tight md:text-[32px] md:leading-10 lg:text-[40px] lg:leading-12">
                          {title}
                        </h3>
                        <div className="text-sm md:text-base opacity-90">
                          {desc}
                        </div>
                      </div>
                    </div>

                    {/* Mockup Display */}
                    <div className="relative h-55 md:h-full w-full min-w-0 md:flex-1 p-0 flex items-end justify-center">
                      <div className="relative w-full h-full max-h-95">
                        <Image
                          src={image}
                          alt={title}
                          priority
                          fill
                          className="object-contain object-bottom"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
