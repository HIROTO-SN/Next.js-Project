"use client";

import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import SnsAuthButton from "@/components/common/Buttons/SnsAuthButton";
import { createGoogleLoginUrl, createLineLoginUrl } from "@/utils/authUtils";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { sendConfirmEmail } from "@/actions/account";
import { FormErrorMessage } from "@/components/common/Design/FormErrorMessage";
import { Input } from "@/components/common/Design/Input";
import { useRouter } from "next/navigation";
import { useEmail } from "@/contexts/RegisterContext/EmailContext";

// フォームで使用する変数の型を定義
type formInputs = {
  email: string;
};

/**
 * メール登録画面
 */
const RegisterMail = () => {
  const router = useRouter();
  const { setHideHeader } = useHeader();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [lineUrl, setLineUrl] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const { setEmail } = useEmail();

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit(async (data) => {
    // バリデーションチェック
    await sendConfirmEmail(data.email as string).then((res: Boolean) => {
      if (res) {
        setEmail(data.email);
        router.push("/register/mail-confirm")
      } else {
        console.log("メール送信失敗");
      }
    });
  });

  useEffect(() => {
    setLineUrl(createLineLoginUrl());
    setGoogleUrl(createGoogleLoginUrl());
    setHideHeader(true);
    const currentPath = window.location.pathname;
    if (currentPath) {
      localStorage.setItem("urlFrom", currentPath);
    }
  });

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className={`
          ${style.mailButton}
          cursor-default flex relative min-h-14 mx-auto rounded-[4px] text-center py-[1.3rem] px-[6rem] text-[1rem] font-bold leading-5 ${
          privacyAgreed
            ? "bg-[#82ad24] text-white cursor-pointer pointer-events-auto shadow-[0px_0px_5px_rgba(0,0,0,0.5)]"
            : "bg-[#e7e7e7] text-[rgba(0,0,0,0.26)] pointer-events-none shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"
        }`}
      >
        <span className="text-[1rem] font-bold leading-5">
          確認メールを送信する
        </span>
      </button>
    );
  };

  return (
    <>
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
        <form onSubmit={onSubmit} className="text-left m-0">
          <dl className="gap-1 w-full my-0 mx-auto flex items-start flex-col">
            <dt className="w-full text-[1rem] leading-5 font-bold">
              メールアドレス
            </dt>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            <dd className="w-full">
              <div className="inline-flex relative w-full">
                <Input
                  id="email"
                  {...register("email", {
                    required: "入力必須項目です。",
                    maxLength: {
                      value: 50,
                      message: "50文字以内で入力してください",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/,
                      message: "メールアドレスの形式が違います",
                    },
                  })}
                />
              </div>
            </dd>
          </dl>
          <div className="mt-6">
            <SubmitButton />
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
    </>
  );
};

export default RegisterMail;
