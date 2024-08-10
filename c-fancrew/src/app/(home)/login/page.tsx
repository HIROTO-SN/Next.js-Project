"use client";

import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { useEffect } from "react";

const LoginPage = () => {
  const { setHideHeader } = useHeader();

  useEffect(() => {
    setHideHeader(true);
    return () => setHideHeader(false);
  }, [setHideHeader]);
  return (
    <div>
      <section className="py-8 px-2 m-auto max-w-[768px]">
        <div className="w-full mb-16">
          <div className="w-full my-0 mx-auto box-border">
            <form className="m-0">
              <h1 className="m-0 text-[1.2rem] font-bold leading-[1.4]">
                ログイン
              </h1>
              <dl>
                <dt className="text-[0.9rem] leading-[1.4] font-bold mt-7 mb-4">
                  <label htmlFor="email">メールアドレス</label>
                </dt>
                <dd>
                  <div className="inline-flex relative w-full">
                    <input
                      id="email"
                      type="email"
                      inputMode="text"
                      className="w-full font-normal pt-4 py-4 text-[0.8rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm"
                      style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}
                    />
                  </div>
                </dd>
                <dt className="text-[0.9rem] leading-[1.4] font-bold mt-7 mb-4">
                  <label htmlFor="password">パスワード</label>
                </dt>
                <dd>
                  <div className="inline-flex relative w-full">
                    <input
                      id="password"
                      type="password"
                      inputMode="text"
                      className="w-full font-normal pt-4 py-4 text-[0.8rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm"
                      style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}
                    />
                  </div>
                </dd>
              </dl>
            </form>
          </div>
          <div className="relative mt-16"></div>
          <div className="w-full my-0 mx-auto box-border"></div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
