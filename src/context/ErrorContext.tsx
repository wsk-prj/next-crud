"use client";

import { createContext, useCallback } from "react";
import { useError } from "@/hooks/useError";
import Modal from "@/components/modal/Modal";

interface ErrorContextType {
  showError: (message: string) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider = (): React.ReactNode => {
  const { error, setError } = useError();

  const showError = useCallback(
    (message: string) => {
      setError(message);
    },
    [setError]
  );

  const hideError = useCallback(() => {
    setError("");
  }, [setError]);

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      <Modal.Error message={error} isVisible={!!error} onClose={hideError} />
    </ErrorContext.Provider>
  );
};
