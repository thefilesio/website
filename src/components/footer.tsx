import { ButterflyLogo } from "@/components/butterfly-logo";
import { Mail, MapPin, Phone, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="py-16 px-6 bg-foreground text-background">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-medium mb-4">
              <ButterflyLogo size="sm" />
              <span className="text-primary">TheFiles</span>
            </div>
            <p className="text-background/70 max-w-xs">
              {t('footer.description')}
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">{t('footer.services')}</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                {t('services.webdesign.title')}
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                {t('services.automation.title')}
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                {t('services.ai-agents.title')}
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">Consulting</a>
            </nav>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">{t('footer.social-media')}</h4>
            <nav className="flex flex-col gap-2">
              <a href="https://www.linkedin.com/company/thefiles/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/thefiles.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
              <a href="https://wa.me/4915258736856?text=Hey!%20Ich%20hätte%20Interesse%20an%20euren%20Dienstleistungen!" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                <div className="relative">
                  <MessageCircle size={16} />
                  <Phone size={8} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span>WhatsApp</span>
              </a>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@thefiles.io" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                <Mail size={16} />
                <span>info@thefiles.io</span>
              </a>
              <a href="tel:+4915258736856" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                <Phone size={16} />
                <span>+49 152 5873 6856</span>
              </a>
              <div className="flex items-start gap-2 text-background/70">
                <MapPin size={16} className="mt-1" />
                <span>Kronprinzenstr. 18<br />47229 Duisburg<br />Deutschland</span>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-background/20 my-10" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-background/50 text-sm mb-4 md:mb-0">
            {t('footer.rights-reserved')}
          </p>
          
          <div className="flex gap-6">
            <Link 
              to="/datenschutz" 
              className="text-background/50 text-sm hover:text-primary transition-colors"
            >
              {t('footer.privacy')}
            </Link>
            <Link 
              to="/impressum" 
              className="text-background/50 text-sm hover:text-primary transition-colors"
            >
              {t('footer.imprint')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
