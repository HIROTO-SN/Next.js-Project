"use client";

import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import SnsAuthButton from "@/components/common/Buttons/SnsAuthButton";
import { createGoogleLoginUrl, createLineLoginUrl } from "@/utils/authUtils";

const page = () => {
  const { setHideHeader } = useHeader();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [lineUrl, setLineUrl] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const [email, setEmail] = useState("");

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

  useEffect(() => {
    setLineUrl(createLineLoginUrl());
    setGoogleUrl(createGoogleLoginUrl());
    setHideHeader(true);
  });

  return (
    <section className="py-8 px-2 m-auto max-w-[768px]">
      <div className="flex relative min-h-44 flex-col pb-6 justify-between">
        <h1 className="text-[1.5rem] font-bold leading-5">会員登録</h1>
        <div className="flex py-6 px-0 items-center flex-col gap-6">
          <label className="w-full cursor-pointer">
            <div className="w-full flex py-4 px-3 items-center border-radius-[0.5rem] justify-center bg-[#f3f3f3]">
              <input
                type="checkbox"
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
              />
              <p className="text-[1.1rem] leading-5 ml-3">
                <a
                  className="text-[#0066CCC] text-[1.1rem] font-bold leading-5 underline"
                  href="/privacyPolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  個人情報保護方針
                </a>
                に同意します。
              </p>
            </div>
          </label>
        </div>
        <form className="text-left m-0">
          <dl className="gap-1 w-full my-0 mx-auto flex items-start flex-col">
            <dt className="w-full text-[1rem] leading-5 font-bold">
              メールアドレス
            </dt>
            <dd className="w-full">
              <div className="inline-flex relative w-full">
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="text"
                  className="w-full font-normal pt-4 py-4 text-[0.9rem] leading-[1.4] shadow-none border border-solid border-[#ccc] p-4 rounded-sm"
                  style={{
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </dd>
          </dl>
          <div className="mt-6">
            <button
              className={`cursor-default flex relative min-h-14 mx-auto rounded-[4px] text-center py-[1.3rem] px-[6rem] text-[1rem] font-bold leading-5 ${
                privacyAgreed
                  ? "bg-[#82ad24] text-white cursor-pointer pointer-events-auto shadow-[0px_0px_5px_rgba(0,0,0,0.5)]"
                  : "bg-[#e7e7e7] text-[rgba(0,0,0,0.26)] pointer-events-none shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"
              }`}
            >
              <span className="text-[1rem] font-bold leading-5">
                確認メールを送信する
              </span>
            </button>
          </div>
        </form>
      </div>
      <div
        className={`${style.separater} text-[#323232] flex text-[0.9rem] items-center font-bold leading-5`}
      >
        または
      </div>
      <div className="relative mt-16">
        <div className="w-full my-0 mx-auto">
          <h2 className="font-bold leading-5 mt-10 text-[0.9rem]">
            SNSアカウントで会員登録
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
    </section>
  );
};

export default page;
