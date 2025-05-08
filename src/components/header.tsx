import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, BarChart, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { motion, AnimatePresence } from "framer-motion";
import { SystemCheckDialog } from "@/components/system-check-dialog";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'menu-backdrop') {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "h-[60px] bg-white/80 backdrop-blur-lg shadow-sm" 
          : "h-[100px] bg-transparent"
      )}>
        <div className={cn(
          "container mx-auto flex items-center h-full transition-all duration-300",
          isScrolled ? "px-4" : "px-6"
        )}>
          <div className="flex-1 flex items-center">
            <a href="#" className="flex items-center text-primary">
              <ButterflyLogo size={isScrolled ? "sm" : "md"} className="mr-2" />
              <span className={cn(
                "font-bold transition-all duration-300",
                isScrolled ? "text-sm sm:text-lg" : "text-lg",
                "block"
              )}>TheFiles</span>
            </a>
          </div>

          <nav className="hidden sm:flex items-center justify-center gap-12">
            <a href="#services" className="text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              {t('header.services')}
            </a>
            <a href="#process" className="text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              {t('header.process')}
            </a>
            <a href="#pricing" className="text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              {t('header.pricing')}
            </a>
            <a href="#testimonials" className="text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              {t('header.references')}
            </a>
          </nav>

          <div className="hidden sm:flex items-center gap-3 justify-end flex-1">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSystemCheck(true)}
            >
              {t('header.system-check')}
            </Button>
            <a 
              href="https://cal.com/thefiles.io/demo?overlayCalendar=true"
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

          {/* Mobile menu controls */}
          <div className="flex sm:hidden items-center gap-2 justify-end">
            <LanguageSwitcher />
            <button 
              className="flex items-center justify-center h-10 w-10 text-foreground rounded-full bg-white/80 shadow-sm"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Slide-Down Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <div 
              id="menu-backdrop"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-start"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsMenuOpen(false);
              }}
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-[90%] max-h-[90vh] mt-20 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <a href="#" className="flex items-center text-primary" onClick={() => setIsMenuOpen(false)}>
                    <ButterflyLogo size="md" className="mr-2" />
                    <span className="font-bold text-lg">TheFiles</span>
                  </a>
                  <button 
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Menu Content */}
                <div className="py-6 px-4 flex-grow overflow-y-auto">
                  <nav className="flex flex-col items-center justify-center space-y-5">
                    <a href="#services" onClick={() => setIsMenuOpen(false)} className="py-3 px-5 text-lg font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3">
                      <Home size={18} className="text-primary/70" />
                      {t('header.services')}
                    </a>
                    <a href="#process" onClick={() => setIsMenuOpen(false)} className="py-3 px-5 text-lg font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3">
                      <BarChart size={18} className="text-primary/70" />
                      {t('header.process')}
                    </a>
                    <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="py-3 px-5 text-lg font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3">
                      <DollarSign size={18} className="text-primary/70" />
                      {t('header.pricing')}
                    </a>
                    <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="py-3 px-5 text-lg font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3">
                      <Users size={18} className="text-primary/70" />
                      {t('header.references')}
                    </a>
                  </nav>
                </div>

                {/* Menu Footer */}
                <div className="p-6 border-t border-gray-100 flex flex-row items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowSystemCheck(true);
                    }}
                    className="px-4 py-2 rounded-full hover:shadow-md transition-all"
                  >
                    {t('header.system-check')}
                  </Button>
                  <a 
                    href="https://cal.com/thefiles.io/demo?overlayCalendar=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button 
                      variant="glass" 
                      size="sm"
                      withArrow
                      className="px-4 py-2 rounded-full hover:shadow-md transition-all"
                    >
                      {t('header.book-demo')}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Der ursprüngliche Dialog */}
      <SystemCheckDialog open={showSystemCheck} onOpenChange={setShowSystemCheck} />
    </>
  );
}
