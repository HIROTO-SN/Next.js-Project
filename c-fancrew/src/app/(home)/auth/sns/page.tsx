"use client";

import { FormStateForOauth, verifyOAuthCallback } from "@/actions/account";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const AuthCallback = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const initialState: FormStateForOauth = { error: "", userData: {} };
  const [state, formAction] = useFormState(verifyOAuthCallback, initialState);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = decodeURIComponent(searchParams.get("code") as string);
      const state = searchParams.get("state") as string;

      // コールバックURLパラメータが正しいか確認
      if (!code || !state) {
        setError("無効なコールバックURLパラメータです。");
        return;
      }
      const form = document.getElementById("callbackAction") as HTMLFormElement;
      if (form) {
        (form.querySelector('input[name="code"]') as HTMLInputElement).value =
          code || "";
        (form.querySelector('input[name="state"]') as HTMLInputElement).value =
          state || "";
        form.requestSubmit(); // フォームを自動的に送信
        return;
      }
    };
    handleOAuthCallback();
  }, []);

  return (
    <form id="callbackAction" action={formAction}>
      <input type="hidden" name="code" />
      <input type="hidden" name="state" />
      <div className="mt-[1.5rem] m-auto mb-[3.5rem] flex max-w-5xl justify-between gap-7 w-full">
        <div className="w-full flex p-[20vh_0] text-center items-center flex-col justify-center bg-[#f29100]">
          <span className="text-white block text-[2.5rem] font-bold mb-[3rem]">
            認証中
          </span>
          <span className="w-10 h-10 flex items-center justify-center mb-[3rem]">
            <CircularProgress
              className="flex text-white"
              size={40}
              thickness={4}
            />
          </span>
          <p className="text-white text-[0.9rem] leading-8">
            ただいま、認証中です。
            <br />
            結果まで今しばらくお待ちください。
          </p>
        </div>
      </div>
    </form>
  );
};

export default AuthCallback;
