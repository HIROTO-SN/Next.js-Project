"use client";

import { FormState, verifyOAuthCallback } from "@/actions/account";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const AuthCallback = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const initialState: FormState = { error: "" };
  const [state, formAction] = useFormState(verifyOAuthCallback, initialState);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { code, state } = router.query;

      // コールバックURLパラメータが正しいか確認
      if (!code || !state) {
        setError("無効なコールバックURLパラメータです。");
        return;
      }

      const form = document.getElementById('callbackAction') as HTMLFormElement;
      if (form) {
        form.submit(); // フォームを自動的に送信
      }
    };

    if (router.isReady) {
      handleOAuthCallback();
    }
  }, [router]);

  return (
    <form id="callbackAction" action={formAction}>
      <div className="mt-[1.5rem] mr-auto mb-[3.5rem] flex max-w-5xl justify-between gap-7 w-full">
        <div className="w-full flex p-[20vh_0] text-center items-center flex-col justify-center bg-[#f29100]">
          <span className="text-white block text-[4rem] font-bold mb-[4rem]">
            認証中
          </span>
        </div>
      </div>
    </form>
  );
};

export default AuthCallback;
