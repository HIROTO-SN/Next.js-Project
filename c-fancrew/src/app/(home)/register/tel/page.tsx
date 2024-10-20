"use client";

import { FormErrorMessage } from "@/components/common/Design/FormErrorMessage";
import { Input } from "@/components/common/Design/Input";
import { useRegisterAccount } from "@/contexts/RegisterContext/RegisterAccount";
import { telValidationRules } from "@/utils/config/validationConf";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// フォームで使用する変数の型を定義
type formInputs = {
  tel: Number;
};

const ConfirmTel = () => {
  const { handleChange } = useRegisterAccount(); // RegisterAccountContext
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formInputs>(); // Form submit

  const onSubmit = handleSubmit(async () => {});

  const SubmitButton = () => {
    return (
      <button
        type="submit"
        className="cursor-pointer bg-transparent w-full max-w-[335px] mt-[42px] mx-auto mb-0 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]
        border border-solid border-[#82ad24] flex py-[8px] px-[34px] text-center relative min-h-[60px] rounded-[4px] justify-center items-center"
      >
        <span className="flex-grow text-[#82ad24] text-[1rem] font-bold leading-5">
          認証用SMSを送信する
        </span>
      </button>
    );
  };

  return (
    <div className="w-full my-4 mx-0">
      <h1 className="text-[1.2rem] font-bold leading-5 mb-6">携帯電話認証</h1>
      <p className="leading-4 text-[1rem] text-[#323232]">
        携帯の電話番号をハイフン無しの11桁で入力してください。
      </p>
      <form onSubmit={onSubmit}>
        <dl>
          <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
            <label></label>
          </dt>
          <FormErrorMessage>
            {errors.tel && errors.tel.message}
          </FormErrorMessage>
          <dd className="ml-0">
            <Input
              {...register("tel", telValidationRules)}
              id="email"
              name="email"
              type="text"
              inputMode="text"
              onChange={handleChange}
            />
          </dd>
        </dl>
        <SubmitButton />
      </form>
    </div>
  );
};

export default ConfirmTel;
