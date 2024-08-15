"use client";

import { FormState, verifyUser } from "@/actions/account";
import AccountLongButton from "@/components/common/Buttons/AccountLongButton";
import SnsAuthButton from "@/components/common/Buttons/SnsAuthButton";
import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { createGoogleUrl, createLineUrl } from "./authUtils";

const LoginPage = () => {
  const [lineUrl, setLineUrl] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");

  const { setHideHeader } = useHeader();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** 後でDB取得かなんかにする >> */
  const snsButtons = [
    {
      buttonName: "LINE",
      link: lineUrl,
      icon: "/logo/icon_line.svg",
    },
    {
      buttonName: "Google",
      link: googleUrl,
      icon: "/logo/icon_google.svg",
    },
  ];
  /** << */

  // LINE認証設定情報

  // Form処理
  const initialState: FormState = { error: "" };
  const [state, formAction] = useFormState(verifyUser, initialState);

  /**
   * ロード処理
   */
  useEffect(() => {
    setLineUrl(createLineUrl());
    setGoogleUrl(createGoogleUrl());
  }, []);

  /**
   * ヘッダーハイド処理
   */
  useEffect(() => {
    setHideHeader(true);
    return () => setHideHeader(false);
  }, [setHideHeader]);

  return (
    <div>
      <section className="py-8 px-2 m-auto max-w-[768px]">
        <div className="w-full mb-16">
          <div className="w-full my-0 mx-auto box-border">
            <form className="m-0" action={formAction}>
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
                      name="email"
                      type="email"
                      inputMode="text"
                      className="w-full font-normal pt-4 py-4 text-[0.8rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm"
                      style={{
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                      name="password"
                      type="password"
                      inputMode="text"
                      className="w-full font-normal pt-4 py-4 text-[0.8rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm"
                      style={{
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <span
                      className="left-auto right-[0.1rem] w-10 m-0 bottom-3 h-8 flex p-0 z-10 absolute items-center justify-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
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
              <AccountLongButton />
              {state.error !== "" && (
                <p className="mt-2 text-red-500 text-sm">{state.error}</p>
              )}
            </form>
          </div>
          <div className="relative mt-16">
            <div className="w-full my-0 mx-auto">
              <h2 className="font-bold leading-5 mt-10 text-[0.9rem]">
                SNSアカウントでログイン
              </h2>
              <ul className="mt-3 mr-0 mb-14 flex p-0 flex-wrap bg-[#ffffff] border-l border-solid border-l-[#e7e7e7]">
                {snsButtons.map((sns) => (
                  <SnsAuthButton
                    key={sns.buttonName}
                    buttonName={sns.buttonName}
                    link={sns.link}
                    icon={sns.icon}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full my-0 mx-auto box-border"></div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
