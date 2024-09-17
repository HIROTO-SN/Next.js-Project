"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BarRightContextType {
  showBarRight: boolean;
  setShowBarRight: (hide: boolean) => void;
}

const BarRightContext = createContext<BarRightContextType | undefined>(undefined);

export const BarRightHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showBarRight, setShowBarRight] = useState(false);

  return (
    <BarRightContext.Provider value={{ showBarRight, setShowBarRight }}>
      {children}
    </BarRightContext.Provider>
  );
};

export const useBarRight= () => {
  const context = useContext(BarRightContext);
  if (context === undefined) {
    throw new Error('useBarRight must be used within a BarRightHeader');
  }
  return context;
};
