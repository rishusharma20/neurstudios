import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Card } from '../ui/Card';
import { CheckCircle2 } from 'lucide-react';

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  const reasons = [
    {
      title: "Business-First Architecture",
      desc: "We don't just write code; we engineer solutions that directly impact your bottom line, drive conversions, and scale with your growth."
    },
    {
      title: "Premium Aesthetic Standards",
      desc: "Every pixel is carefully crafted. We blend technical performance with award-winning visual design to create memorable brand experiences."
    },
    {
      title: "Uncompromising Performance",
      desc: "Speed is revenue. Our products are rigorously optimized for sub-second load times, flawless animations, and SEO dominance."
    },
    {
      title: "Transparent Collaboration",
      desc: "No black boxes. You get direct access to our developers, regular milestone updates, and a structured, predictable delivery process."
    }
  ];

  useEffect(() => {
    gsap.fromTo(
      ".reason-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="why-choose-us" className="py-24 md:py-32 bg-[var(--color-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--color-purple)_0,transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="mb-16 md:text-center flex flex-col md:items-center">
          <span className="section-label">THE NEUR ADVANTAGE</span>
          <h2 className="section-heading">Why leading <span className="text-gradient">brands</span> <span className="text-gradient">partner</span> with <span className="text-gradient">us.</span></h2>
          <p className="section-subheading md:mx-auto">
            We bridge the gap between creative vision and technical reality, delivering digital products that outperform the competition.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {reasons.map((reason, idx) => (
            <Card key={idx} className="reason-card flex gap-6 p-8 border-[rgba(123,97,255,0.15)] group hover:border-[var(--color-purple)]">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="text-[var(--color-purple)] group-hover:text-[var(--color-cyan)] transition-colors duration-300" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3 tracking-wide">{reason.title}</h3>
                <p className="text-[var(--color-text-secondary)] font-body leading-relaxed">{reason.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
