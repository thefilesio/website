import React from "react";
import { cn } from "@/lib/utils";

interface FilesLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FilesLogo({ 
  className, 
  size = "md" 
}: FilesLogoProps) {
  const sizeMap = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };
  
  return (
    <div className={cn("relative flex items-center", className)}>
      <svg 
        width="auto" 
        height={sizeMap[size]} 
        viewBox="0 0 180 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        {/* Butterfly shape */}
        <path d="M140.42,15.1c9.27-1.51,8.22,10.15,7.21,18.22-1.36,12.36-6.67,38.04-16.08,45.92-4,3.47-10.18,4.83-16.38,4.62-6.11-.24-14.17-.79-19.08-2-1.98-.43-4.41-1-5.03-2.97-1.07-4.2.02-14.41,1.24-18.89,3.51-12.81,12.79-22.98,24.01-30.99,5.91-4.15,16.54-11.44,24.09-13.91z" fill="#4BA89C"/>
        <path d="M39.37,15.05c7.61-1.41,22.87,7.29,28.59,11.96,15.88,11.53,27.46,27.16,25.56,47.18-.32,2.53-.94,4.8-3.83,4.67-6.83,.84-25.43,.82-30.55-1.53-14.78-4.62-18.8-23.93-21.68-36.32-1.24-6.1-2.82-15.85-2.32-20.69,.22-1.53,1.48-4.07,4.23-5.27z" fill="#4BA89C"/>
      </svg>
    </div>
  );
} 