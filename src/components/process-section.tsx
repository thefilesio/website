
import { useRef, useEffect, useState } from "react";
import { Calendar, CheckCircle, Cog, GanttChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const processSteps = [
    {
      title: t('process.steps.0.title'),
      description: t('process.steps.0.description'),
      icon: Calendar,
    },
    {
      title: t('process.steps.1.title'),
      description: t('process.steps.1.description'),
      icon: CheckCircle,
    },
    {
      title: t('process.steps.2.title'),
      description: t('process.steps.2.description'),
      icon: Cog,
    },
    {
      title: t('process.steps.3.title'),
      description: t('process.steps.3.description'),
      icon: GanttChart,
    },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight * 0.5;
      
      const progressPercent = Math.min(
        Math.max((scrollPosition - sectionTop) / (sectionHeight * 0.8), 0),
        1
      );
      
      // Calculate active step based on scroll progress
      const newActiveStep = Math.min(
        Math.floor(progressPercent * processSteps.length),
        processSteps.length - 1
      );
      
      setActiveStep(newActiveStep);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [processSteps.length]);
  
  return (
    <section id="process" className="py-20 px-6 bg-gradient-to-b from-white/0 via-sand/30 to-white/0">
      <div className="container max-w-6xl mx-auto" ref={sectionRef}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('process.title')}</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div className="order-2 lg:order-1">
            <div className="space-y-12 pl-4">
              {processSteps.map((step, index) => (
                <TimelineItem 
                  key={index}
                  step={step}
                  isActive={index <= activeStep}
                />
              ))}
            </div>
            
            <div className="mt-12 pl-4">
              <Button 
                variant="glass" 
                size="lg" 
                withArrow 
                className="group"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t('process.start-now')}
              </Button>
            </div>
          </div>
          
          {/* Visual */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal/30 to-sand/30 animate-pulse blur-xl"></div>
              <div className="absolute inset-4 glass rounded-full flex items-center justify-center overflow-hidden">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div 
                      key={index} 
                      className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
                        index === activeStep ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <IconComponent 
                        size={index === activeStep ? 80 : 64} 
                        className="text-primary transition-all duration-700"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  step: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
  isActive: boolean;
}

function TimelineItem({ step, isActive }: TimelineItemProps) {
  return (
    <div className={cn(
      "timeline-item transition-all duration-500",
      isActive ? "opacity-100" : "opacity-40"
    )}>
      <div className={cn(
        "timeline-dot transition-all duration-500",
        isActive && "animate-pulse"
      )}></div>
      <div>
        <h3 className={cn(
          "text-xl font-semibold mb-2 flex items-center gap-2 transition-colors duration-500",
          isActive ? "text-primary" : "text-foreground/60"
        )}>
          <step.icon size={18} />
          {step.title}
        </h3>
        <p className="text-foreground/80">{step.description}</p>
      </div>
    </div>
  );
}
