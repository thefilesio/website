import { useEffect } from "react";
import { useIsClient } from "@/hooks/useIsClient";

declare global {
  interface Window {
    AIChatWidget?: { init: (opts: { widgetId: string }) => void };
  }
}

export function ChatWidget({ systemCheckOpen = false }: { systemCheckOpen?: boolean }) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    const widget = document.querySelector('[id^="AIChatWidget"]');

    if (systemCheckOpen) {
      if (widget) {
        (widget as HTMLElement).style.display = "none";
        (widget as HTMLElement).style.zIndex = "1";
      }
      const script = document.getElementById("ai-chat-widget-script");
      if (script && script.parentElement) {
        script.parentElement.removeChild(script);
      }
      return;
    }

    if (!document.getElementById("ai-chat-widget-script")) {
      const script = document.createElement("script");
      script.id = "ai-chat-widget-script";
      script.src = "https://testmyprompt.com/widget/681a2152de07ab4c428ab832/widget.js";
      script.async = true;
      script.onload = () => {
        if (window.AIChatWidget) {
          window.AIChatWidget.init({ widgetId: "681a2152de07ab4c428ab832" });
        }

        setTimeout(() => {
          const icon = document.querySelector('[id^="AIChatWidget"] button');
          if (icon) {
            (icon as HTMLElement).style.width = "25px";
            (icon as HTMLElement).style.height = "25px";
            (icon as HTMLElement).style.minWidth = "25px";
            (icon as HTMLElement).style.minHeight = "25px";
            (icon as HTMLElement).style.right = "16px";
            (icon as HTMLElement).style.bottom = "16px";
          }
        }, 500);
      };
      document.body.appendChild(script);
    } else if (window.AIChatWidget) {
      window.AIChatWidget.init({ widgetId: "681a2152de07ab4c428ab832" });

      setTimeout(() => {
        const icon = document.querySelector('[id^="AIChatWidget"] button');
        if (icon) {
          (icon as HTMLElement).style.width = "25px";
          (icon as HTMLElement).style.height = "25px";
          (icon as HTMLElement).style.minWidth = "25px";
          (icon as HTMLElement).style.minHeight = "25px";
          (icon as HTMLElement).style.right = "16px";
          (icon as HTMLElement).style.bottom = "16px";
        }

        const widget = document.querySelector('[id^="AIChatWidget"]');
        if (widget) {
          (widget as HTMLElement).style.maxWidth = "95vw";
          (widget as HTMLElement).style.right = "8px";
          (widget as HTMLElement).style.left = "auto";
          (widget as HTMLElement).style.bottom = "8px";
          (widget as HTMLElement).style.overflow = "auto";
        }
      }, 500);
    }

    if (widget) {
      (widget as HTMLElement).style.display = "";
      (widget as HTMLElement).style.zIndex = "";
    }
  }, [isClient, systemCheckOpen]);

  return null;
}
