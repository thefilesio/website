import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButterflyIconProps {
  className?: string;
}

export const ButterflyIcon: React.FC<ButterflyIconProps> = ({ className }) => {
  return (
    <div className="relative group">
      <motion.svg 
        className={cn('w-14 h-14 mx-auto transition-all duration-700', className)}
        viewBox="0 0 348.09 334.91" 
        xmlns="http://www.w3.org/2000/svg"
        animate={{ 
          y: [0, -10, 0, 10, 0],
          scale: [1, 1.02, 1, 0.98, 1],
        }}
        transition={{
          y: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          },
          scale: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }
        }}
        style={{
          filter: "drop-shadow(0 0 0px rgba(76, 169, 160, 0))",
        }}
        whileHover={{ 
          filter: "drop-shadow(0 0 5px rgba(76, 169, 160, 0.4))"
        }}
      >
        <g>
          <path d="M324.24.55c29.27-3.51,24.22,20.15,22.21,41.22-3.36,35.36-18.67,111.04-47.08,133.92-13,10.47-30.18,12.83-46.38,13.62-17.11.84-41.17,1.21-58.08,0-5.98-.43-13.41-1-15.03-7.97-3.07-13.2.02-40.41,3.24-53.89,9.51-39.81,38.79-68.98,71.01-91.99,17.01-12.15,49.54-32.44,70.09-34.91Z" fill="currentColor" />
          <path d="M325.23,3.55c-30.56,3.43-85.67,43.7-106.8,66.2-27.05,28.8-40.57,69.42-36,109.05.84,7.28,6.34,7.12,12.48,7.52,21.7,1.44,71.07,2.1,90.23-5.87,31.3-13.03,44.56-64.56,51.01-94.99,4.21-19.86,9.9-49.86,8.35-69.73-.96-12.27-8.27-13.42-19.26-12.18Z" fill="currentColor" />
          <path d="M10.19.5C31.79-3.91,76.05,21.79,93.77,34.46c46.88,33.53,81.46,79.16,75.56,140.18-.82,8.53-1.94,13.8-11.33,14.67-19.83,1.84-71.43,1.82-89.55-3.53C25.67,173.16,13.65,114.86,6.77,76.46,3.53,58.36-1.55,30.61.45,12.77,1.07,7.24,4.33,1.7,10.19.5Z" fill="currentColor" />
          <path d="M11.19,3.51C.39,5.49,2.99,23.06,3.47,31.76c1.96,36.08,16.54,116.32,44.98,140.02,22.49,18.74,73,17.23,101.56,15.54,12.42-.74,15.37-.46,16.44-13.56,4.85-59.48-27.67-103.5-73.67-136.3C75.51,25.15,32.17-.32,11.19,3.51Z" fill="currentColor" />
          <path d="M208.81,305.92c-21.46-22.08-33.93-63.67-30.24-94.04,1.27-10.45,5.41-12.87,15.35-13.65,25.29-1.98,76.1-2.47,96.01,14.06,28.63,23.75,15.12,91.22-7.96,115-19.25,19.83-58.05-5.81-73.17-21.37Z" fill="currentColor" />
          <path d="M190.2,201.51c-11.61,1.93-9.3,19.12-8.78,28.3,2.34,41.43,22.56,79.52,61.68,96.32,27.17,11.67,36.78,5.54,48.53-20.18,18.25-39.95,21.91-95.23-32.8-103.55-13.81-2.1-55.32-3.1-68.64-.88Z" fill="currentColor" />
          <path d="M93.25,199.57c16.06-1.56,47.82-1.89,63.76-.34,9.8.95,11.79,7.7,12.49,16.51,3.34,42.61-17.43,88.78-55.36,109.71-31.28,17.26-47.81,11.21-61.85-20.49-19.58-44.18-17.87-99.69,40.97-105.39Z" fill="currentColor" />
          <path d="M93.25,202.57c-61.39,6.25-57.09,70.85-32.6,112.01,9.81,16.49,15.62,20.21,34.8,15.19,41.79-10.94,68.45-55.79,71-97,.43-6.87,1.87-27.6-5.94-30.04-21.63.49-45.91-2.33-67.26-.15Z" fill="currentColor" />
        </g>
      </motion.svg>

      <motion.div 
        className="absolute -inset-10 bg-[#4CA9A0] rounded-full opacity-0 group-hover:opacity-5 blur-2xl -z-10 transition-opacity duration-1000"
        animate={{ scale: [0.98, 1.02, 0.98] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
};
