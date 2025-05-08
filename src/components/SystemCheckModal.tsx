import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemCheckModal = ({ isOpen, onClose }: SystemCheckModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl w-[90vw] max-w-md"
          >
            <div className="text-center">
              <img src="/logo.svg" alt="Logo" className="h-6 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">
                🦋 Lass uns kurz prüfen, wo du gerade stehst
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Wir zeigen dir in 2 Minuten, was in deinem System Potenzial hat – kostenlos & smart.
              </p>
              <button
                onClick={onClose}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Los geht's
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
