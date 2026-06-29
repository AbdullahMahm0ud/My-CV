import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VelocityBlurText from '../components/ui/VelocityBlurText'

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: 'fa-solid fa-code',
    title: 'Web Development',
    description:
      'Building responsive, performant websites using modern HTML, CSS, and JavaScript. From landing pages to complex web applications with clean, maintainable code.',
    link: 'https://en.wikipedia.org/wiki/Front-end_web_development',
  },
  {
    icon: 'fa-brands fa-react',
    title: 'React Development',
    description:
      'Creating dynamic single-page applications with React. Component-based architecture, state management, and seamless user experiences with modern development practices.',
    link: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
  },
  {
    icon: 'fa-solid fa-bug-slash',
    title: 'Optimization & Debugging',
    description:
      'Troubleshooting and optimizing web applications for peak performance. Identifying bottlenecks, fixing bugs, and ensuring smooth, efficient operation across all devices.',
    link: 'https://en.wikipedia.org/wiki/Web_application',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-[60px] md:py-[120px] bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <VelocityBlurText
          text="My Services"
          className="sub-title font-display text-4xl md:text-5xl lg:text-[60px] font-bold tracking-[-1.5px] text-text-primary"
          as="h2"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-16">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="service-card-hover corner-accent relative bg-bg-card border border-[rgba(0,240,255,0.06)] rounded-lg p-10 md:p-12 transition-all duration-400 hover:border-[rgba(0,240,255,0.2)] hover:-translate-y-1 group"
              style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <i
                className={`${service.icon} text-[40px] text-cyan-bright mb-6 block`}
              />
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-[-0.5px] text-text-primary mb-4">
                {service.title}
              </h3>
              <p className="font-body text-base text-text-secondary leading-relaxed">
                {service.description}
              </p>
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 font-body text-sm font-semibold tracking-wider uppercase text-cyan-bright hover:text-blue-neon transition-colors duration-300 group/link"
              >
                Learn More
                <span className="inline-block ml-1 transition-transform duration-300 group-hover/link:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
