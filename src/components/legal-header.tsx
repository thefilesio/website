
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SystemCheckDialog } from "@/components/system-check-dialog";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { useLanguage } from "@/lib/language-context";

export function LegalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "h-[60px] bg-white/80 backdrop-blur-lg shadow-sm" 
        : "h-[100px] bg-transparent"
    )}>
      <div className={cn(
        "container mx-auto flex items-center justify-between h-full transition-all duration-300",
        isScrolled ? "px-4" : "px-6"
      )}>
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-primary">
            <ButterflyLogo size={isScrolled ? "sm" : "md"} className="mr-2" />
            <span className={cn(
              "font-bold transition-all duration-300",
              isScrolled ? "text-sm sm:text-lg" : "text-lg",
              "block"
            )}>TheFiles</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSystemCheck(true)}
          >
            {t('header.system-check')}
          </Button>
          <a 
            href="https://www.cal.com/thefiles.io/demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="glass" 
              size={isScrolled ? "sm" : "default"}
              withArrow
              className="transition-all duration-300"
            >
              {t('header.book-demo')}
            </Button>
          </a>
        </div>
      </div>
      
      <SystemCheckDialog 
        open={showSystemCheck} 
        onOpenChange={setShowSystemCheck} 
      />
    </header>
  );
}
