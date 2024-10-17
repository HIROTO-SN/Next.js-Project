"use client";

import PageConfirm from "@/components/common/PageConfirm/PageConfirm";
import { RegisterAccountProvider } from "@/contexts/RegisterContext/RegisterAccount";
import { getLastSegmentUrl } from "@/utils/commonUtils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    // クライアントで実行する
    if (pathname) {
      setCurrentUrl(getLastSegmentUrl(pathname));
    }
  }, [pathname]);

  if (!currentUrl) return null;

  return (
    <>
      <PageConfirm currentUrl={currentUrl}/>
      <section className="pt-[2rem] pr-0 pb-[4rem] m-auto max-w-[768px] min-h-[80vh]">
        <RegisterAccountProvider>
          {children}
        </RegisterAccountProvider>
      </section>
    </>
  );
};

export default MainLayout;
