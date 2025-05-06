import { useEffect } from "react";

declare global {
  interface Window {
    AIChatWidget?: { init: (opts: { widgetId: string }) => void };
  }
}

export function ChatWidget({ systemCheckOpen = false }: { systemCheckOpen?: boolean }) {
  useEffect(() => {
    // Wenn SystemCheck offen ist, entferne das Widget komplett und setze z-index niedrig
    const widget = document.querySelector('[id^="AIChatWidget"]');
    if (systemCheckOpen) {
      if (widget) {
        (widget as HTMLElement).style.display = 'none';
        (widget as HTMLElement).style.zIndex = '1';
      }
      // Entferne das Script
      const script = document.getElementById("ai-chat-widget-script");
      if (script && script.parentElement) {
        script.parentElement.removeChild(script);
      }
      return;
    }
    // Wenn SystemCheck NICHT offen ist, binde das Widget ein
    if (!document.getElementById("ai-chat-widget-script")) {
      const script = document.createElement("script");
      script.id = "ai-chat-widget-script";
      script.src = "https://testmyprompt.com/widget/681a2152de07ab4c428ab832/widget.js";
      script.async = true;
      script.onload = () => {
        if (window.AIChatWidget) {
          window.AIChatWidget.init({ widgetId: "681a2152de07ab4c428ab832" });
        }
        // Nach dem Laden: Icon kleiner machen und Position anpassen
        setTimeout(() => {
          const icon = document.querySelector('[id^="AIChatWidget"] button');
          if (icon) {
            (icon as HTMLElement).style.width = '25px';
            (icon as HTMLElement).style.height = '25px';
            (icon as HTMLElement).style.minWidth = '25px';
            (icon as HTMLElement).style.minHeight = '25px';
            (icon as HTMLElement).style.right = '16px';
            (icon as HTMLElement).style.bottom = '16px';
          }
        }, 500);
      };
      document.body.appendChild(script);
    } else if (window.AIChatWidget) {
      window.AIChatWidget.init({ widgetId: "681a2152de07ab4c428ab832" });
      // Nachträglich Icon kleiner machen und Position anpassen
      setTimeout(() => {
        const icon = document.querySelector('[id^="AIChatWidget"] button');
        if (icon) {
          (icon as HTMLElement).style.width = '25px';
          (icon as HTMLElement).style.height = '25px';
          (icon as HTMLElement).style.minWidth = '25px';
          (icon as HTMLElement).style.minHeight = '25px';
          (icon as HTMLElement).style.right = '16px';
          (icon as HTMLElement).style.bottom = '16px';
        }
        // Wenn das Widget geöffnet ist, passe die Größe und Position an
        const widget = document.querySelector('[id^="AIChatWidget"]');
        if (widget) {
          (widget as HTMLElement).style.maxWidth = '95vw';
          (widget as HTMLElement).style.right = '8px';
          (widget as HTMLElement).style.left = 'auto';
          (widget as HTMLElement).style.bottom = '8px';
          (widget as HTMLElement).style.overflow = 'auto';
        }
      }, 500);
    }
    // Widget wieder einblenden, falls es noch im DOM ist
    if (widget) {
      (widget as HTMLElement).style.display = '';
      (widget as HTMLElement).style.zIndex = '';
    }
  }, [systemCheckOpen]);

  return null;
} 