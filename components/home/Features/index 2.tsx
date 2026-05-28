"use client";

import Image from "next/image";
import Link from "next/link";

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
          <ul className="list-disc pl-5 space-y-1">
            <li>Tailwind CSS</li>
            <li>Bootstrap</li>
          </ul>
          <p>
            Export or deploy code in Next.js, HTML, Pug, Symfony, or Laravel.
          </p>
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
          <p className="mb-2">
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
          <p className="mb-2">
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
          <p className="mb-2">
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
    <section id="features" className="py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-5 leading-20">
            Build stunning layouts quickly
          </h2>
          <p className="text-base md:text-md text-slate-400">
            Speed up your workflow in a few simple steps.
          </p>
        </div>
        <div className="w-full relative">
          {features.map(({ color, badge, title, desc, image }, index) => {
            const dynamicTop = 120 + index * 40;
            return (
              <div
                key={title}
                className="sticky flex h-120 md:h-120 lg:h-175 items-start justify-center"
                style={{ top: `${dynamicTop}px` }}
              >
                <div
                  className={`w-full h-120 flex flex-col overflow-hidden rounded-[32px] md:h-120 md:flex-row lg:h-124.5`}
                  style={{ backgroundColor: color }}
                >
                  <div className="flex h-full w-full flex-col md:flex-row">
                    <div className="flex mb-auto md:mb-0 shrink-0 flex-col items-center md:items-start md:text-left gap-5 md:gap-12 pt-5 px-5 md:p-10 lg:pl-15 lg:py-25 text-white-700-landing">
                      <div className="flex max-w-62 md:max-w-80.5 lg:max-w-105 flex-col gap-4 md:gap-4 lg:gap-5">
                        {badge}
                        <h3 className="whitespace-pre-line text-2xl font-bold tracking-[-0.48px] md:text-[32px] md:leading-10 md:tracking-[-0.64px] lg:text-[40px] lg:leading-12 lg:tracking-[-0.8px]">
                          {title}
                        </h3>
                        <div>{desc}</div>
                      </div>
                    </div>
                    <div className="relative h-[40%] w-full min-w-0 px-3 md:h-full md:min-w-0 md:flex-1 md:basis-0 md:p-0">
                      <div className="relative h-full w-full">
                        <Image
                          src={image}
                          alt={title}
                          priority
                          width={660}
                          height={520}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Features;
