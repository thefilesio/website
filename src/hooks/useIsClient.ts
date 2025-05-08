import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setIsClient] = useState(typeof window !== "undefined");

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  return isClient;
}
