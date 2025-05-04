import { Metadata } from "@/components/metadata";
import { LegalHeader } from "@/components/legal-header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { useEffect } from "react";

export default function Imprint() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements similar to main page */}
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-teal/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-sand/30 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl"></div>
      
      <LegalHeader />
      
      <div className="container max-w-4xl mx-auto px-6 py-24">
        <Metadata 
          title={`${t('imprint.title')} - TheFiles.io`}
          description={`${t('imprint.title')} und rechtliche Informationen von TheFiles.io`}
        />
        
        <div className="glass p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8 text-center">{t('imprint.title')}</h1>
          
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('imprint.provider_info_title')}</h2>
              <p>
                {t('imprint.name')}<br />
                {t('imprint.address')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('imprint.contact_title')}</h2>
              <p>
                {t('imprint.phone')}<br />
                {t('imprint.email')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('imprint.responsible_title')}</h2>
              <p>
                {t('imprint.responsible_name')}<br />
                {t('imprint.responsible_address')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">{t('imprint.online_dispute_title')}</h2>
              <p>
                {t('imprint.online_dispute_text')}<br />
                <a 
                  href={t('imprint.online_dispute_link')} 
                  target="_blank" 
                  rel="noopener"
                  className="text-primary hover:underline"
                >
                  {t('imprint.online_dispute_link')}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
