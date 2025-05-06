import { useEffect } from "react";

declare global {
  interface Window {
    AIChatWidget?: { init: (opts: { widgetId: string }) => void };
  }
}

export function ChatWidget({ systemCheckOpen = false }: { systemCheckOpen?: boolean }) {
  useEffect(() => {
    // Wenn SystemCheck offen ist, entferne das Widget komplett
    if (systemCheckOpen) {
      // Entferne das Widget-Element
      const widget = document.querySelector('[id^="AIChatWidget"]');
      if (widget && widget.parentElement) {
        widget.parentElement.removeChild(widget);
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
            (icon as HTMLElement).style.width = '36px';
            (icon as HTMLElement).style.height = '36px';
            (icon as HTMLElement).style.minWidth = '36px';
            (icon as HTMLElement).style.minHeight = '36px';
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
          (icon as HTMLElement).style.width = '36px';
          (icon as HTMLElement).style.height = '36px';
          (icon as HTMLElement).style.minWidth = '36px';
          (icon as HTMLElement).style.minHeight = '36px';
          (icon as HTMLElement).style.right = '16px';
          (icon as HTMLElement).style.bottom = '16px';
        }
      }, 500);
    }
  }, [systemCheckOpen]);

  return null;
} 