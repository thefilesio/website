import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Language } from '@/lib/language-context';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const toggleLanguage = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setLanguage(language === 'de' ? 'en' : 'de');
      setIsAnimating(false);
    }, 300);
  };
  
  return (
    <div className="relative flex items-center">
      <div 
        className="relative w-20 h-10 bg-white/10 backdrop-blur-md rounded-full p-1 cursor-pointer shadow-md border border-white/20"
        onClick={toggleLanguage}
      >
        {/* Background hover effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/20 to-green-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Slider pill */}
        <motion.div 
          className="absolute top-1 h-8 w-9 bg-white rounded-full shadow-sm z-10 flex items-center justify-center font-medium"
          initial={false}
          animate={{ 
            x: language === 'de' ? '1px' : '38px',
            rotateY: isAnimating ? 180 : 0 
          }}
          transition={{ 
            x: { type: "spring", stiffness: 300, damping: 20 },
            rotateY: { duration: 0.3 }
          }}
        >
          {language === 'de' ? 'DE' : 'EN'}
        </motion.div>
        
        {/* Stationary text */}
        <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-medium opacity-60">
          <span className="ml-0">DE</span>
          <span className="mr-0">EN</span>
        </div>
      </div>
      
      {/* Decorative floating dots */}
      <motion.div 
        className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-teal-400"
        animate={{ 
          y: [0, -4, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-green-400"
        animate={{ 
          y: [0, 4, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  );
} 