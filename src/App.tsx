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

const queryClient = new QueryClient();

const App = () => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/impressum" element={<Imprint />} />
              <Route path="/datenschutz" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </HelmetProvider>
      </LanguageProvider>
      <ChatWidget />
    </QueryClientProvider>
  );
};

export default App;
