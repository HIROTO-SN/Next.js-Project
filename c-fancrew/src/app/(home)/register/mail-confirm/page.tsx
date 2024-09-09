"use client";

import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { useEmail } from "@/contexts/RegisterContext/EmailContext";
import { useEffect } from "react";

const MailConfirm = () => {
  const { email } = useEmail();
  const { setHideHeader } = useHeader();

  useEffect(() => {
    setHideHeader(true);
  });

  return (
    <div className="w-full my-0 mx-auto border-solid border-0">
      <h1 className="text-[1.2rem] font-bold leading-5 mb-[1.5rem] m-0">
        メール認証
      </h1>
      <div className="w-full my-[1rem] mx-0 ">
        <p className="text-[#323232] text-1rem leading-5">
          メールアドレス確認用メールを送信しました。
        </p>
        <h2 className="text-[#323232] text-[1rem] mt-6 font-bold leading-5 m-0">
          送信したメールアドレス
        </h2>
        <div className="text-[#323232] w-full text-[1rem] mt-[0.6rem] text-center font-bold leading-10 bg-[#f3f3f3]">
          {email}
        </div>
        <p className="text-[#323232] text-[1rem] mt-[0.5rem] text-left">
          メールをご確認いただき、メールに記載されたURLをクリックし登録を完了してください。
        </p>
      </div>
    </div>
  );
};

export default MailConfirm;
