"use client";

import { verifySMS } from "@/actions/account";
import { FormErrorMessage } from "@/components/common/Design/FormErrorMessage";
import { Input } from "@/components/common/Design/Input";
import { useRegisterAccount } from "@/contexts/RegisterContext/RegisterAccount";
import { telConfirmationValidationRules, telValidationRules } from "@/utils/config/validationConf";
import { useState } from "react";
import { useForm } from "react-hook-form";

// フォームで使用する変数の型を定義
type formInputs = {
  tel: Number;
  confirmation: Number;
};

const ConfirmTel = () => {
  const { tel, confirmation, handleChange } = useRegisterAccount(); // RegisterAccountContext
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formInputs>(); // Form submit

  const [submitLoading, setSubmitLoading] = useState(false); //2度処理が回るのを防止
  const [isSmsSent, setIsSmsSent] = useState(false); //SMSが送信されたかどうか
  const [inputStr, setInputStr] = useState("tel");
  const [confirmationError, setconfirmationError] = useState("");

  const onSubmit = handleSubmit(async () => {
    if (submitLoading) return;
    setSubmitLoading(true);

    const newTel = `+81${String(tel).slice(1)}`;
    await verifySMS(newTel).then((res: string) => {
      if (res) {
        setIsSmsSent(true);
        setSubmitLoading(false);
        setInputStr("confirmation");
        console.log("SMS送信成功: " + res);
      } else {
        setIsSmsSent(false);
        setconfirmationError("SMS送信に失敗しました。再度お試しください。")
        console.log("SMS送信失敗");
      }
    });
  });

  const SubmitButton = () => {
    return (
      <button
        type="submit"
        className="cursor-pointer bg-transparent w-full max-w-[335px] mt-[42px] mx-auto mb-0 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]
        border border-solid border-[#82ad24] flex py-[8px] px-[34px] text-center relative min-h-[60px] rounded-[4px] justify-center items-center"
      >
        <span className="flex-grow text-[#82ad24] text-[1rem] font-bold leading-5">
        {isSmsSent ? 
          "認証を完了する" :
          "認証用SMSを送信する"
        }          
        </span>
      </button>
    );
  };

  return (
    <div className="w-full my-4 mx-0">
      <h1 className="text-[1.2rem] font-bold leading-5 mb-6">携帯電話認証</h1>
      <p className="leading-4 text-[1rem] text-[#323232]">
        {isSmsSent ? 
          "SMSで届いた認証番号を入力してください。" :
          "携帯の電話番号をハイフン無しの11桁で入力してください。"
        }
      </p>
      <form onSubmit={onSubmit}>
        <dl>
          <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
            <label></label>
          </dt>
          <FormErrorMessage>
            {errors.tel && errors.tel.message}
            {errors.confirmation && errors.confirmation.message}
            {confirmationError && confirmationError}
          </FormErrorMessage>
          <dd className="ml-0">
            {/* SMS認証テキスト */}
            <Input
              {...register(!isSmsSent ? "tel" : "confirmation", !isSmsSent ? telValidationRules : telConfirmationValidationRules)}
              id={inputStr}
              name={inputStr}
              type="text"
              inputMode="text"
              onChange={handleChange}
              value={!isSmsSent ? tel : confirmation}
            />
            {/* 認証番号入力テキスト */}
          </dd>
        </dl>
        <SubmitButton />
      </form>
    </div>
  );
};

export default ConfirmTel;
