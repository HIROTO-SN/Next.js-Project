"use client";

import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import React, { useEffect, useState } from "react";

const page = () => {
  const { setHideHeader } = useHeader();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  useEffect(() => {
    setHideHeader(true);
  });

  return (
    <section className="py-8 px-2 m-auto max-w-[768px]">
      <div className="flex relative min-h-44 flex-col pb-6 justify-between">
        <h1 className="text-[1.5rem] font-bold leading-5">会員登録</h1>
        <div className="flex py-6 px-0 items-center flex-col gap-6">
          <label className="w-full cursor-pointer">
            <div className="w-full flex py-4 px-3 items-center border-radius-[0.5rem] justify-center bg-[#f3f3f3]">
              <input type="checkbox" onChange={(e) => setPrivacyAgreed(e.target.checked)}/>
              <p className="text-[1.1rem] leading-5 ml-3">
                <a className="text-[#0066CCC] text-[1.1rem] font-bold leading-5 underline" href="/privacyPolicy" target="_blank" rel="noopener noreferrer">個人情報保護方針</a>に同意します。
              </p>
            </div>
          </label>

        </div>
        <form>

        </form>
      </div>
      <div></div>
      <div></div>
    </section>
  );
};

export default page;
