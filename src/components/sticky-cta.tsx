import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when scrolled 50% of viewport height
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      )}
    >
      <a 
        href="https://www.cal.com/thefiles.io/demo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button 
          variant="glass" 
          size="lg" 
          withArrow
          className="shadow-lg"
        >
          {t('cta-section.button')}
        </Button>
      </a>
    </div>
  );
}
