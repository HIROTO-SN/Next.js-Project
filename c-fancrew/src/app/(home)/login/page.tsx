"use client";

import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const LoginPage = () => {
  const { setHideHeader } = useHeader();
  const [showPassword, setShowPassword] = useState(false);

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
                      style={{
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      }}
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
                      style={{
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      }}
                    />
                    <span className="left-auto right-[0.1rem] w-10 m-0 bottom-3 h-8 flex p-0 z-10 absolute items-center justify-center" onClick={() => setShowPassword(!showPassword)}>
                      {!showPassword ? (
                        <IoEyeOff className="absolute" />
                      ) : (
                        <IoEye className="absolute" />
                      )}
                    </span>
                  </div>
                  <p className="mt-3 mb-7">
                    ※パスワードを忘れた方は
                    <a href="/mypage/profile-edit/reset-password">こちら</a>
                  </p>
                </dd>
              </dl>
              <button className="max-w-80 items-center w-full py-2 px-8 flex relative box-border min-h-14 ml-auto mr-auto rounded-[4px] justify-center border-2 border-solid border-[#82ad24]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)' }}>
                <span className="text-[#82ad24] text-[1rem] font-bold leading-5 flex-grow">ログイン</span>
              </button>
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
