import { Metadata } from "@/components/metadata";
import { LegalHeader } from "@/components/legal-header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";
import { ChatWidget } from "@/components/chat";

export default function Privacy() {
  const { t } = useLanguage();
  const [systemCheckOpen, setSystemCheckOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-teal/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-sand/30 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl"></div>

      <LegalHeader onSystemCheckOpenChange={setSystemCheckOpen} />

      <div className="container max-w-4xl mx-auto px-6 py-24">
        <Metadata 
          title={`${t('privacy.title')} - TheFiles.io`}
          description={`${t('privacy.title')} und Informationen zum Umgang mit Ihren Daten bei TheFiles.io`}
        />

        <div className="glass p-8 md:p-12 rounded-xl shadow-xl text-foreground">
          <h1 className="text-3xl font-bold mb-10 text-center">{t('privacy.title')}</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <div>
              <h2 className="text-base font-bold mb-1">{t('privacy.1_overview_title')}</h2>

              <p className="font-semibold">{t('privacy.1_overview_text')}</p>

              <p className="font-semibold mt-4">{t('privacy.data_collection_title')}</p>
              <p>{t('privacy.data_collection_text')}</p>
            </div>

            <div>
              <h2 className="text-base font-bold mb-1">{t('privacy.2_general_info_title')}</h2>

              <p className="font-semibold">{t('privacy.2_general_info_text')}</p>
            </div>

            <div>
              <h2 className="text-base font-bold mb-1">{t('privacy.3_data_collection_title')}</h2>

              <p className="font-semibold">{t('privacy.cookies_title')}</p>
              <p>{t('privacy.cookies_text')}</p>
            </div>

            <div>
              <h2 className="text-base font-bold mb-1">{t('privacy.4_plugins_tools_title')}</h2>

              <p className="font-semibold">{t('privacy.web_fonts_title')}</p>
              <p>{t('privacy.web_fonts_text')}</p>
            </div>

            <div>
              <h2 className="text-base font-bold mb-1">{t('privacy.5_analytics_title')}</h2>

              <p className="font-semibold">{t('privacy.google_analytics_title')}</p>
              <p>{t('privacy.google_analytics_text')}</p>
            </div>

            <div>
              <h2 className="text-base font-bold mb-1">{t('privacy.6_newsletter_title')}</h2>

              <p className="font-semibold">{t('privacy.newsletter_data_title')}</p>
              <p>{t('privacy.newsletter_data_text')}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChatWidget systemCheckOpen={systemCheckOpen} />
    </div>
  );
}
