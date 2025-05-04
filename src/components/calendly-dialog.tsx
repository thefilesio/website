import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import CalendlyWidget from "./calendly-widget";

export function CalendlyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-transparent border-none shadow-none">
        {open && (
          <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute top-3 right-3 z-50">
              <button 
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <CalendlyWidget 
              url="https://calendly.com/thefiles-info/system-check"
              height="650px"
              primaryColor="37a991"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 