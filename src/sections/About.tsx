import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VelocityBlurText from '../components/VelocityBlurText';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: 'C++', level: 'Advanced' },
  { name: 'HTML/CSS', level: 'Advanced' },
  { name: 'JavaScript', level: 'Intermediate' },
  { name: 'React', level: 'Intermediate' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Problem Solving', level: 'Advanced' },
  { name: 'Web Development', level: 'Advanced' },
];

const experienceData = [
  {
    org: 'Enactus Organization Member',
    duration: '2021 \u2013 2023',
    desc: 'Collaborated on innovative solutions for community challenges, developing teamwork and critical thinking abilities.',
  },
  {
    org: 'ALX Egypt Student',
    duration: '2022 \u2013 2024',
    desc: 'Studied C and JavaScript programming. Built a strong foundation in software engineering principles.',
  },
  {
    org: 'Ahram Canadian University EXPO',
    duration: '2024',
    desc: 'Presented a face recognition system project.',
  },
  {
    org: 'Code Camp Participant',
    duration: 'Aug 2023 \u2013 Present',
    desc: 'Focused on responsive web development and JavaScript. Enhanced skills in creating user-friendly web applications.',
  },
];

const educationData = [
  {
    org: 'Bachelor of Computer Engineering',
    duration: 'ACU University, Egypt',
    desc: 'Comprehensive program covering software engineering, algorithms, data structures, and system design.',
  },
  {
    org: 'Relevant Coursework',
    duration: '',
    desc: 'Data Structures, Algorithms, Web Development, Software Engineering, Database Systems, Computer Architecture',
  },
];

const tabs = ['Skills', 'Experience', 'Education'];

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (bioRef.current) {
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    // Move indicator
    const activeBtn = tabBtnsRef.current[activeTab];
    const indicator = indicatorRef.current;
    if (activeBtn && indicator && tabsRef.current) {
      const tabRect = activeBtn.getBoundingClientRect();
      const containerRect = tabsRef.current.getBoundingClientRect();
      indicator.style.transform = `translateX(${tabRect.left - containerRect.left}px)`;
      indicator.style.width = `${tabRect.width}px`;
    }
  }, [activeTab]);

  useEffect(() => {
    // Tab content animation
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [activeTab]);

  function switchTab(index: number) {
    if (index === activeTab) return;
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setActiveTab(index),
      });
    } else {
      setActiveTab(index);
    }
  }

  return (
    <section id="about" ref={sectionRef} className="py-[60px] md:py-[120px] bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <VelocityBlurText
          text="About Me"
          className="sub-title font-display text-4xl md:text-5xl lg:text-[60px] font-bold tracking-[-1.5px] text-text-primary"
          as="h2"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-[60px] mt-16">
          {/* Photo Column */}
          <div className="animated-border">
            <div className="img-zoom-container rounded-[7px]">
              <img
                src="/images/about.png"
                alt="Abdullah"
                className="w-full aspect-[3/4] object-cover rounded-[7px]"
              />
            </div>
          </div>

          {/* Content Column */}
          <div>
            <p
              ref={bioRef}
              className="font-body text-base md:text-lg leading-relaxed text-text-primary"
            >
              I am a 4th-year Computer Engineering student at ACU University with a passion
              for software development and engineering. Experienced in competitive programming
              with a strong foundation in C++. Adept at analytical thinking, problem
              decomposition, and writing optimized code. Enthusiastic about continuous
              learning, staying current with industry trends, and building impactful software
              solutions.
            </p>

            {/* Tab Interface */}
            <div ref={tabsRef} className="relative flex gap-8 mt-12 mb-8">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  ref={(el) => { tabBtnsRef.current[index] = el; }}
                  onClick={() => switchTab(index)}
                  className={`font-body text-sm font-semibold tracking-wide uppercase pb-2 transition-colors duration-300 ${
                    activeTab === index ? 'text-cyan-bright' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <div ref={indicatorRef} className="tab-indicator" />
            </div>

            {/* Tab Content */}
            <div ref={contentRef}>
              {activeTab === 0 && (
                <div className="flex flex-col">
                  {skillsData.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex justify-between items-center py-4 border-b border-[rgba(138,141,147,0.15)]"
                    >
                      <span className="font-body text-base font-medium text-text-primary">
                        {skill.name}
                      </span>
                      <span className="font-body text-sm text-text-secondary">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 1 && (
                <div className="flex flex-col">
                  {experienceData.map((exp, i) => (
                    <div
                      key={i}
                      className="relative py-5 pl-6 border-l-2 border-blue-neon"
                    >
                      <div className="timeline-dot" />
                      <h4 className="font-display text-lg font-semibold text-text-primary">
                        {exp.org}
                      </h4>
                      <p className="font-body text-sm text-text-secondary mt-1">
                        {exp.duration}
                      </p>
                      <p className="font-body text-base text-text-secondary mt-2 leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 2 && (
                <div className="flex flex-col">
                  {educationData.map((edu, i) => (
                    <div
                      key={i}
                      className="relative py-5 pl-6 border-l-2 border-blue-neon"
                    >
                      <div className="timeline-dot" />
                      <h4 className="font-display text-lg font-semibold text-text-primary">
                        {edu.org}
                      </h4>
                      {edu.duration && (
                        <p className="font-body text-sm text-text-secondary mt-1">
                          {edu.duration}
                        </p>
                      )}
                      <p className="font-body text-base text-text-secondary mt-2 leading-relaxed">
                        {edu.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
