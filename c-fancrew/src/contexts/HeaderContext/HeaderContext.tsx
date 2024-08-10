"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  hideHeader: boolean;
  setHideHeader: (hide: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hideHeader, setHideHeader] = useState(false);

  return (
    <HeaderContext.Provider value={{ hideHeader, setHideHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
