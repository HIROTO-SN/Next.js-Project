"use client";

import Footer from "@/components/common/Footer/Footer";
import GuestBar from "@/components/common/Header/GuestBar/GuestBar";
import Header from "@/components/common/Header/Header";
import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { EmailProvider } from "@/contexts/RegisterContext/EmailContext";
import React, { useEffect } from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hideHeader } = useHeader();

  return (
    <div>
      {!hideHeader && <Header />}
      <GuestBar />
      <main>
        <EmailProvider>
          {children}
        </EmailProvider>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
