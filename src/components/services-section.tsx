
import { Monitor, RefreshCw, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function ServicesSection() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('services.webdesign.title'),
      description: t('services.webdesign.description'),
      icon: Monitor,
      color: "from-teal/20 to-teal/5"
    },
    {
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      icon: RefreshCw,
      color: "from-sand/30 to-sand/10"
    },
    {
      title: t('services.ai-agents.title'),
      description: t('services.ai-agents.description'),
      icon: Bot,
      color: "from-teal/30 to-sand/20"
    }
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
  };
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div 
      className="glass-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center"
      style={{ animationDelay: `${index * 200}ms` }}
      data-aos="fade-up"
    >
      <div className={cn(
        "w-16 h-16 flex items-center justify-center rounded-2xl mb-6 bg-gradient-to-br",
        service.color
      )}>
        <service.icon size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-foreground/80">{service.description}</p>
    </div>
  );
}
