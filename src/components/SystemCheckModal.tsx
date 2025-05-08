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
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[9998]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 z-[9999] bg-white rounded-2xl px-8 py-10 shadow-2xl w-full max-w-xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <ButterflyLogo size="md" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                🦋 Lass uns kurz prüfen, wo du gerade stehst
              </h2>
              <p className="text-base text-gray-600 max-w-md mx-auto">
                Wir zeigen dir in 2 Minuten, was in deinem System Potenzial hat – kostenlos & smart.
              </p>
              <button
                onClick={onClose}
                className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Los geht’s
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
