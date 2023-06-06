import React, { useState, createContext, useContext, useMemo } from "react";

type transactionContextProps = {
  showTransactionModal: boolean;
  setShowTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransactionContext = createContext<transactionContextProps>({
  showTransactionModal: false,
  setShowTransactionModal: () => null,
});

export const TransactionContextProvider = ({ children }) => {
  const [showTransactionModal, setShowTransactionModal] =
    useState<boolean>(false);
  const value = useMemo(
    () => ({ showTransactionModal, setShowTransactionModal }),
    [showTransactionModal, setShowTransactionModal]
  );
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
