import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VelocityBlurText from '../components/VelocityBlurText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: '/images/comeonman.png',
    title: 'Systems Engineering',
    description:
      'Building and maintaining systems using React, Node.js, and Arduino. Expertise in scalable architectures and component integration.',
    link: '#',
  },
  {
    image: '/images/goddamnit.png',
    title: 'Hardware Projects',
    description:
      'Arduino-based hardware projects including a firefighter robot car and maze-solving vehicle. Strong skills in electronics and embedded programming.',
    link: '#',
  },
  {
    image: '/images/WORK3.png',
    title: 'Software Development',
    description:
      'Full software development lifecycle using JavaScript, C++, HTML, and CSS. Designing and maintaining efficient, high-quality software solutions.',
    link: 'https://github.com/Aloxen1?tab=repositories',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    // Preload images before animation
    const images = cards.map((card) => {
      const img = card.querySelector('img');
      return img ? img.src : null;
    }).filter(Boolean);

    let loaded = 0;
    function onImageLoad() {
      loaded++;
      if (loaded >= images.length) {
        startAnimation();
      }
    }

    if (images.length === 0) {
      startAnimation();
    } else {
      images.forEach((src) => {
        const img = new Image();
        img.onload = onImageLoad;
        img.onerror = onImageLoad;
        img.src = src as string;
      });
    }

    function startAnimation() {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.0,
            ease: 'power3.inOut',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-[60px] md:py-[120px] bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <VelocityBlurText
          text="My Work"
          className="sub-title font-display text-4xl md:text-5xl lg:text-[60px] font-bold tracking-[-1.5px] text-text-primary text-center block"
          as="h2"
        />
        <p className="font-body text-base md:text-lg text-text-secondary text-center mt-4">
          A selection of projects I&apos;ve worked on
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-16">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative rounded-lg overflow-hidden aspect-[4/3] cursor-pointer group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
              />
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-400">
                <h3 className="font-display text-xl md:text-[22px] font-bold text-text-primary mb-3">
                  {project.title}
                </h3>
                <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-5">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target={project.link !== '#' ? '_blank' : undefined}
                  rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
                  className="w-12 h-12 rounded-full bg-transparent border border-cyan-bright text-cyan-bright flex items-center justify-center text-lg hover:bg-cyan-bright hover:text-bg-dark transition-all duration-300"
                  onClick={(e) => {
                    if (project.link === '#') e.preventDefault();
                  }}
                >
                  <i className="fa-solid fa-link" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.linkedin.com/in/abdullah-mahmoud-kamel/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
}
