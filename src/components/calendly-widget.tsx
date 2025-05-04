import { useEffect, useRef } from 'react';

interface CalendlyWidgetProps {
  url: string;
  height?: string | number;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  hideGdprBanner?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  url,
  height = '700px',
  backgroundColor = 'ffffff',
  textColor = '333333',
  primaryColor = '37a991',
  hideGdprBanner = true,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load Calendly script only once
    if (!scriptLoadedRef.current && !document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;

        // Entfernt Scrolling nach dem Laden
        const handleCalendlyReady = setInterval(() => {
          const iframe = document.querySelector('iframe[src*="calendly.com"]');
          if (iframe) {
            clearInterval(handleCalendlyReady);
            
            // Versuchen, das Scrollbable-Element im Iframe zu finden und das Scrolling zu deaktivieren
            try {
              const iframeContent = (iframe as HTMLIFrameElement).contentWindow?.document;
              if (iframeContent) {
                const styles = document.createElement('style');
                styles.textContent = `
                  body { 
                    overflow: hidden !important; 
                    height: 100% !important;
                    width: 100% !important;
                  }
                  .calendar-table-wrapper { 
                    overflow: hidden !important;
                  }
                  /* Prevent scrollbars */
                  *::-webkit-scrollbar {
                    display: none !important;
                    width: 0 !important;
                    height: 0 !important;
                  }
                `;
                iframeContent.head.appendChild(styles);
              }
            } catch (e) {
              console.log('Could not modify iframe content due to cross-origin policy');
            }
            
            // Also modify the iframe directly
            const typedIframe = iframe as HTMLIFrameElement;
            typedIframe.setAttribute('scrolling', 'no');
            typedIframe.style.overflow = 'hidden';
            typedIframe.style.height = typeof height === 'number' ? `${height}px` : height;
          }
        }, 500);
      };
      document.head.appendChild(script);
    }
    
    // Apply the CSS to prevent scrolling on the container
    if (containerRef.current) {
      containerRef.current.style.overflow = 'hidden';
      containerRef.current.style.height = typeof height === 'number' ? `${height}px` : height;
    }
  }, [height]);

  // Construct the Calendly URL with parameters
  const calendlyUrl = `${url}${url.includes('?') ? '&' : '?'}embed_type=Inline${hideGdprBanner ? '&hide_gdpr_banner=1' : ''}&background_color=${backgroundColor}&text_color=${textColor}&primary_color=${primaryColor}`;

  return (
    <div 
      ref={containerRef}
      className={`calendly-inline-widget ${className}`}
      data-url={calendlyUrl}
      style={{
        minWidth: '320px',
        height,
        overflow: 'hidden',
        ...style
      }}
    />
  );
};

export default CalendlyWidget; 