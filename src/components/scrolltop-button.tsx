
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 20% of viewport height
      setIsVisible(window.scrollY > window.innerHeight * 0.2);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <button
      className={cn(
        "fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center transition-all duration-500 border border-border/50 hover:bg-white",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      )}
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
    >
      <ChevronUp size={24} className="text-primary" />
    </button>
  );
}
