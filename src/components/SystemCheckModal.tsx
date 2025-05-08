import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButterflyLogo } from "@/components/butterfly-logo";

interface SystemCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemCheckModal = ({ isOpen, onClose }: SystemCheckModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fullscreen Overlay that blocks interaction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[9998]"
            style={{ pointerEvents: "auto" }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 z-[9999] bg-white rounded-xl p-6 shadow-xl w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ButterflyLogo size="md" />
              </div>
              <h2 className="text-lg font-semibold mb-2">
                🦋 Lass uns kurz prüfen, wo du gerade stehst
              </h2>
              <p className="text-sm text-gray-600">
                Wir zeigen dir in 2 Minuten, was in deinem System Potenzial hat – kostenlos & smart.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Jetzt starten
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
