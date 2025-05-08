import { useIsClient } from "@/hooks/useIsClient";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./lib/language-context";
import { ChatWidget } from "@/components/chat";
import { useState } from "react";
import { SystemCheckModal } from "@/components/SystemCheckModal";

const queryClient = new QueryClient();

const App = () => {
  const isClient = useIsClient();
  const [systemCheckOpen, setSystemCheckOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {isClient ? (
              <>
                {/* Deine Seiten (Routing) */}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/impressum" element={<Imprint />} />
                  <Route path="/datenschutz" element={<Privacy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>

                {/* ChatWidget + Modal */}
                <ChatWidget />
                <SystemCheckModal
                  isOpen={systemCheckOpen}
                  onClose={() => setSystemCheckOpen(false)}
                />
              </>
            ) : (
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </TooltipProvider>
        </HelmetProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
