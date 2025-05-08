import { createContext, useContext, useState } from "react";

interface SystemCheckContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SystemCheckContext = createContext<SystemCheckContextType | undefined>(undefined);

export const SystemCheckProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SystemCheckContext.Provider value={{ isOpen, open, close }}>
      {children}
    </SystemCheckContext.Provider>
  );
};

export const useSystemCheck = () => {
  const context = useContext(SystemCheckContext);
  if (!context) throw new Error("useSystemCheck must be used within a SystemCheckProvider");
  return context;
};
