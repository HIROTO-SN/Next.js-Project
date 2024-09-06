"use client";

import PageConfirm from "@/components/common/PageConfirm/PageConfirm";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  return (
    <>
      <PageConfirm/>
      <section className="pt-[2rem] pr-0 pb-[4rem] m-auto max-w-[768px]">
        {children}
      </section>
    </>
  );
};

export default MainLayout;
