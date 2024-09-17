"use client";

import Footer from "@/components/common/Footer/Footer";
import BarRight from "@/components/common/Header/BarRight";
import Header from "@/components/common/Header/Header";
import Logo from "@/components/common/Header/Logo";
import { useBarRight } from "@/contexts/BarRightContext/BarRightContext";
import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { EmailProvider } from "@/contexts/RegisterContext/EmailContext";
import React, { useEffect, useLayoutEffect, useState } from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showHeader } = useHeader();
  const { showBarRight } = useBarRight();
  const [loadFlg, setLoadFlg] = useState(false);

  useLayoutEffect(() => {
    setLoadFlg(true);
  },[]);

  if (!loadFlg) {
    return null;
  }
  
  return (
    loadFlg && (
      <div>
        {showHeader && <Header />}
        <div className="mx-auto flex max-w-[1024px] min-h-[4rem] items-center border-b border-b-[#e7e7e7] justify-between">
          <Logo />
          {showBarRight && <BarRight />}
        </div>
        <main>
          <EmailProvider>{children}</EmailProvider>
        </main>
        <Footer />
      </div>
    )
  );
};

export default MainLayout;
