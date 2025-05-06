import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SystemCheckDialog } from "@/components/system-check-dialog";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { useLanguage } from "@/lib/language-context";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Menu, Home, X, BarChart, DollarSign, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LegalHeader({ onSystemCheckOpenChange }: { onSystemCheckOpenChange?: (open: boolean) => void } = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (onSystemCheckOpenChange) onSystemCheckOpenChange(showSystemCheck);
  }, [showSystemCheck, onSystemCheckOpenChange]);

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
        
        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-3">
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
        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-2">
          <LanguageSwitcher />
          <AnimatePresence>
            {drawerOpen && (
              <div 
                id="menu-backdrop"
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-start"
                onClick={e => { if (e.target === e.currentTarget) setDrawerOpen(false); }}
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-[90%] max-h-[90vh] mt-20 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
                >
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <Link to="/" className="flex items-center text-primary" onClick={() => setDrawerOpen(false)}>
                      <ButterflyLogo size="md" className="mr-2" />
                      <span className="font-bold text-lg">TheFiles</span>
                    </Link>
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="py-6 px-4 flex-grow overflow-y-auto">
                    <nav className="flex flex-col items-center justify-center space-y-5">
                      <Link to="/" className="py-3 px-5 text-lg font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3" onClick={() => setDrawerOpen(false)}>
                        <Home size={18} className="text-primary/70" /> Home
                      </Link>
                      <Link to="/impressum" className="py-3 px-5 text-lg font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3" onClick={() => setDrawerOpen(false)}>
                        <BarChart size={18} className="text-primary/70" /> Impressum
                      </Link>
                      <Link to="/datenschutz" className="py-3 px-5 text-lg font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3" onClick={() => setDrawerOpen(false)}>
                        <DollarSign size={18} className="text-primary/70" /> Datenschutz
                      </Link>
                    </nav>
                  </div>
                  <div className="p-6 border-t border-gray-100 flex flex-row items-center justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setDrawerOpen(false);
                        setShowSystemCheck(true);
                      }}
                      className="px-4 py-2 rounded-full hover:shadow-md transition-all"
                    >
                      {t('header.system-check')}
                    </Button>
                    <a 
                      href="https://www.cal.com/thefiles.io/demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDrawerOpen(false)}
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
          <button
            className="flex items-center justify-center h-10 w-10 text-foreground rounded-full bg-white/80 shadow-sm"
            aria-label="Menü öffnen"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      
      <SystemCheckDialog 
        open={showSystemCheck} 
        onOpenChange={setShowSystemCheck} 
      />
    </header>
  );
}
