import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface TestimonialCardProps {
  testimonial: {
    text: string;
    name: string;
    company: string;
    image?: string;
    rating?: number;
  };
  direction: number;
}

const TestimonialCard = ({ testimonial, direction }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full flex flex-col justify-center"
    >
      <div className="glass-card p-8 md:p-10 flex flex-col items-center justify-center h-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        <div className="flex justify-center mb-6">
          <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white/60 shadow-md">
            <img 
              src={testimonial.image || "/coco.jpg"} 
              alt={testimonial.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <blockquote className="text-center mb-8 italic text-lg md:text-xl font-light leading-relaxed">
          "{testimonial.text}"
        </blockquote>
        <div className="flex flex-col items-center mt-auto">
          <div className="flex mb-2">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < (testimonial.rating || 5) ? "text-[#2F726B]" : "text-gray-300"} 
                fill={i < (testimonial.rating || 5) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-foreground/70">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function TestimonialsSection() {
  const { tArray, t } = useLanguage();
  const testimonials = tArray('testimonials');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parse testimonials as objects if they come as strings (from translation files)
  const parsedTestimonials = testimonials.map((t) => typeof t === 'string' ? JSON.parse(t) : t);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (difference > 50) {
      handleNext();
    } else if (difference < -50) {
      handlePrev();
    }
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 px-6 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials-section.title')}</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {t('testimonials-section.subtitle')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div 
            ref={containerRef}
            className="relative h-[400px] md:h-[450px] w-full mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation buttons */}
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 h-10 w-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 h-10 w-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Testimonial Card */}
            <div className="h-full w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <TestimonialCard 
                  key={activeIndex}
                  testimonial={parsedTestimonials[activeIndex]} 
                  direction={direction}
                />
              </AnimatePresence>
            </div>
          
            {/* Pagination indicator */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
