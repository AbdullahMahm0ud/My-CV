import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VelocityBlurText from '../components/VelocityBlurText';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'kingspeedx11@gmail.com',
    href: 'mailto:kingspeedx11@gmail.com',
  },
  {
    icon: 'fa-solid fa-phone',
    label: '0111 265 0802',
    href: 'tel:01112650802',
  },
  {
    icon: 'fa-brands fa-whatsapp',
    label: '0111 265 0802',
    href: 'https://wa.me/201112650802',
  },
];

const socialLinks = [
  { icon: 'fa-brands fa-twitter', href: 'https://x.com/Aloxen2', hoverClass: 'hover:border-cyan-bright hover:text-cyan-bright hover:bg-[rgba(0,240,255,0.1)]' },
  { icon: 'fa-brands fa-github', href: 'https://github.com/Aloxen1', hoverClass: 'hover:border-text-primary hover:text-text-primary hover:bg-[rgba(245,245,245,0.1)]' },
  { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/abdullah_8ambr/', hoverClass: 'hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[rgba(228,64,95,0.1)]' },
  { icon: 'fa-brands fa-linkedin', href: 'https://www.linkedin.com/in/abdullah-mahmoud-kamel/', hoverClass: 'hover:border-[#0077B5] hover:text-[#0077B5] hover:bg-[rgba(0,119,181,0.1)]' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  // Typewriter cursor effect
  useEffect(() => {
    const cursorEl = cursorRef.current as HTMLDivElement;
    if (!cursorEl || !formRef.current) return;

    let currentField = 0;
    let isTyping = false;
    let blinkInterval: ReturnType<typeof setInterval>;

    function updateCursorPosition(fieldIndex: number) {
      const fields = fieldRefs.current.filter(Boolean) as HTMLElement[];
      if (!fields[fieldIndex]) return;
      const field = fields[fieldIndex];
      const rect = field.getBoundingClientRect();
      const formRect = formRef.current!.getBoundingClientRect();
      cursorEl.style.top = `${rect.top - formRect.top + (rect.height - 20) / 2}px`;
      cursorEl.style.left = `${rect.right - formRect.left + 8}px`;
    }

    function startIdleBlink() {
      blinkInterval = setInterval(() => {
        if (isTyping) return;
        const fields = fieldRefs.current.filter(Boolean) as HTMLElement[];
        if (!fields[currentField]) return;
        if (document.activeElement === fields[currentField]) return;
        cursorEl.classList.add('blink');
        setTimeout(() => cursorEl.classList.remove('blink'), 800);
      }, 3000);
    }

    const fields = fieldRefs.current.filter(Boolean) as HTMLElement[];
    fields.forEach((field, index) => {
      field.addEventListener('focus', () => {
        currentField = index;
        isTyping = true;
        updateCursorPosition(index);
        cursorEl.classList.remove('blink');
        cursorEl.classList.add('active');
      });
      field.addEventListener('blur', () => {
        isTyping = false;
        cursorEl.classList.remove('active');
      });
    });

    updateCursorPosition(0);
    startIdleBlink();

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Show success
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section id="contact" ref={sectionRef} className="py-[60px] md:py-[120px] bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <VelocityBlurText
          text="Get In Touch"
          className="sub-title font-display text-4xl md:text-5xl lg:text-[60px] font-bold tracking-[-1.5px] text-text-primary"
          as="h2"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 mt-16">
          {/* Left Column */}
          <div ref={leftRef}>
            <h3 className="font-display text-2xl md:text-[32px] font-bold tracking-[-1px] text-text-primary mb-6">
              Let&apos;s work together
            </h3>
            <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed mb-10">
              Have a project in mind or just want to chat? I&apos;m always open to discussing
              new opportunities and interesting ideas.
            </p>

            <div className="flex flex-col gap-6">
              {contactDetails.map((detail, i) => (
                <a
                  key={i}
                  href={detail.href}
                  target={detail.href.startsWith('https') ? '_blank' : undefined}
                  rel={detail.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[rgba(0,85,254,0.1)] text-cyan-bright flex items-center justify-center text-lg shrink-0">
                    <i className={detail.icon} />
                  </div>
                  <span className="font-body text-base font-medium text-text-primary group-hover:text-cyan-bright transition-colors duration-300">
                    {detail.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-10">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full border border-[rgba(0,240,255,0.2)] text-text-secondary flex items-center justify-center text-lg transition-all duration-300 ${social.hoverClass}`}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>

            <a
              href="/Abdullah.pdf"
              download
              className="btn-filled mt-10"
            >
              <i className="fa-solid fa-download" />
              Download CV
            </a>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef} className="relative">
            <div className="bg-bg-card border border-[rgba(0,240,255,0.06)] rounded-lg p-8 md:p-12">
              {submitted ? (
                <div ref={successRef} className="form-success">
                  <i className="fa-solid fa-check-circle text-2xl" />
                  Message sent successfully!
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="contact-form relative"
                >
                  <div
                    ref={cursorRef}
                    className="form-cursor blink"
                  />

                  <div className="mb-6">
                    <label className="block font-body text-sm font-semibold tracking-wider uppercase text-text-secondary mb-2">
                      Your Name
                    </label>
                    <input
                      ref={(el) => { fieldRefs.current[0] = el; }}
                      type="text"
                      name="Name"
                      placeholder="John Doe"
                      required
                      className="form-field w-full bg-bg-elevated border border-[rgba(138,141,147,0.2)] rounded-md px-4 py-3.5 font-body text-base text-text-primary outline-none transition-colors duration-300 focus:border-cyan-bright placeholder:text-text-secondary/50"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-body text-sm font-semibold tracking-wider uppercase text-text-secondary mb-2">
                      Your Email
                    </label>
                    <input
                      ref={(el) => { fieldRefs.current[1] = el; }}
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="form-field w-full bg-bg-elevated border border-[rgba(138,141,147,0.2)] rounded-md px-4 py-3.5 font-body text-base text-text-primary outline-none transition-colors duration-300 focus:border-cyan-bright placeholder:text-text-secondary/50"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-body text-sm font-semibold tracking-wider uppercase text-text-secondary mb-2">
                      Your Message
                    </label>
                    <textarea
                      ref={(el) => { fieldRefs.current[2] = el; }}
                      name="Message"
                      placeholder="Tell me about your project..."
                      required
                      rows={6}
                      className="form-field w-full bg-bg-elevated border border-[rgba(138,141,147,0.2)] rounded-md px-4 py-3.5 font-body text-base text-text-primary outline-none transition-colors duration-300 focus:border-cyan-bright resize-y placeholder:text-text-secondary/50"
                    />
                  </div>

                  <button type="submit" className="btn-filled w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
