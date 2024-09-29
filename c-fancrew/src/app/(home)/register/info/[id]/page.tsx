"use client";

import { paramDataConfirmingMail, verifyConfirmEmail } from "@/actions/account";
import { Input } from "@/components/common/Design/Input";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { OrbitProgress } from "react-loading-indicators";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import CustomSelect from "@/components/common/Design/CustomSelect";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "@/components/common/Design/FormErrorMessage";
import { dateValidationRules, nameValidationRules, passwordValidationRules, selectMessageRequired, zipCodeValidationRules } from "@/utils/config";

// フォームで使用する変数の型を定義
type formInputs = {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  birthday: Date;
  gender: string;
  zipcode: string;
  secret: Number;
  secretAnswer: string;
};

const RegisterInfo = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loadFlg, setLoadFlg] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  /**
   * ロード処理
   */
  useLayoutEffect(() => {
    const handleComfirmEmailCallback = async () => {
      const param = searchParams.get("param");
      if (!param) {
        router.push(`/register/error`);
      }

      const paramData: paramDataConfirmingMail = {
        id: Number(id),
        param: param ? param : "",
      };
      const ret: string = await verifyConfirmEmail(paramData);
      if (!ret) {
        router.push(`/register/error`);
      } else {
        setEmail(ret);
        setLoadFlg(true);
      }
    };
    handleComfirmEmailCallback();
  }, []);

  /**
   * セレクトボックスクリックイベント
   */
  const onSelectClick = () => {
    setShowSelect(!showSelect);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit(async (data) => {
    if (submitLoading) return;
    setSubmitLoading(true);
    // // バリデーションチェック
    // await sendConfirmEmail(data.email as string).then((res: Boolean) => {
    //   if (res) {
    //     setEmail(data.email);
    //     router.push("/register/mail-confirm");
    //   } else {
    //     console.log("メール送信失敗");
    //   }
    // });
  });

  const SubmitButton = () => {
    return (
      <button
        type="submit"
        className="cursor-pointer bg-transparent w-full max-w-[335px] mt-[42px] mx-auto mb-0 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]
        border border-solid border-[#82ad24] flex py-[8px] px-[34px] text-center relative min-h-[60px] rounded-[4px] justify-center items-center"
      >
        <span className="flex-grow text-[#82ad24] text-[1rem] font-bold leading-5">
          入力内容を確認する
        </span>
      </button>
    );
  };

  return (
    <div className="w-full my-0 mx-auto box-border">
      {loadFlg ? (
        <div className="w-full my-4 mx-0">
          <h1 className="text-[1.2rem] font-bold leading-5 mb-6">
            会員情報の登録
          </h1>
          <p className="leading-4 text-[1rem] text-[#323232]">
            メールアドレスの認証が完了しました。
          </p>
          <h2 className="leading-4 font-bold text-[1rem] mt-[1.5rem] mr-0 mb-0 text-[#323232]">
            会員情報
          </h2>
          <form onSubmit={onSubmit}>
            <dl>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="email">メールアドレス</label>
              </dt>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
              <dd className="ml-0">
                <Input
                  style={{ backgroundColor: "#f3f3f3", cursor: "not-allowed" }}
                  value={email}
                  disabled
                  id="email"
                  name="email"
                />
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="lastName">お名前</label>
              </dt>
              <dd className="gap-3 flex items-end flex-row justify-start">
                <div className="flex-1">
                  <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                  </FormErrorMessage>
                  <Input
                    {...register("lastName", nameValidationRules)}
                    id="lastName"
                    name="lastName"
                    inputMode="text"
                    placeholder="苗字"
                  />
                </div>
                <div className="flex-1">
                  <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                  </FormErrorMessage>
                  <Input
                    {...register("firstName", nameValidationRules)}
                    id="firstName"
                    name="firstName"
                    inputMode="text"
                    placeholder="名前"
                  />
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="password">パスワード</label>
              </dt>
              <dd className="ml-0">
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
                <div className="inline-flex relative w-full">
                  <Input
                    {...register("password", passwordValidationRules)}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
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
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="birthday">生年月日</label>
              </dt>
              <dd className="ml-0">
                <FormErrorMessage>
                  {errors.birthday && errors.birthday.message}
                </FormErrorMessage>
                <div className="inline-flex relative w-full">
                  <Input
                    {...register("birthday", dateValidationRules)}
                    id="birthday"
                    name="birthday"
                    type="date"
                  />
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                性別
              </dt>
              <dd className="ml-0">
                <FormErrorMessage>
                  {errors.gender && errors.gender.message}
                </FormErrorMessage>
                <div className="flex flex-wrap flex-row">
                  <label
                    htmlFor="male"
                    className="inline-flex mr-6 items-center cursor-pointer align-middle ml-[-11px]"
                  >
                    <span className="py-[5px] px-[9px] cursor-pointer">
                      <Input
                        {...register("gender", { required: selectMessageRequired })}
                        id="male"
                        name="gender"
                        type="radio"
                        className="cursor-pointer"
                      />
                    </span>
                    <span>男性</span>
                  </label>
                  <label
                    htmlFor="female"
                    className="flex mr-6 items-center cursor-pointer align-middle ml-[-11px]"
                  >
                    <span className="py-[5px] px-[9px] cursor-pointer">
                      <Input
                        {...register("gender", { required: selectMessageRequired })}
                        id="female"
                        name="gender"
                        type="radio"
                        className="cursor-pointer"
                      />
                    </span>
                    <span>女性</span>
                  </label>
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="zipcode">郵便番号</label>
              </dt>
              <dd className="ml-0">
                <FormErrorMessage>
                  {errors.zipcode && errors.zipcode.message}
                </FormErrorMessage>
                <div className="inline-flex relative w-full">
                  <Input
                    {...register("zipcode", zipCodeValidationRules)}
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    placeholder="1230001"
                  />
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                お得なモニターをお届けするメルマガ
              </dt>
              <dd className="ml-0">
                <label
                  htmlFor="mail-delivery"
                  className="inline-flex items-center cursor-pointer ml-[-11px] mr-[16px]"
                >
                  <span className="p-[9px]">
                    <Input
                      id="mail-delivery"
                      name="mail-delivery"
                      type="checkbox"
                    />
                  </span>
                  <span className="text-[1rem]">配信を希望する</span>
                </label>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="secret">秘密の質問</label>
              </dt>
              <dd className="ml-0">
                <FormErrorMessage>
                  {errors.secret && errors.secret.message}
                </FormErrorMessage>
                <div
                  className="inline-flex items-center w-full relative border-radius-[4px]"
                  onClick={() => onSelectClick()}
                >
                  <div className="pt-[1rem] pr-[32px] pb-[1rem] pl-[1.2rem] text-[1rem] leading-5 border border-[#ccc] border-solid w-full cursor-pointer">
                    選択してください
                    {showSelect && <CustomSelect />}
                    <input
                      {...register("secret", { required: selectMessageRequired })}
                      id="secret"
                      name="secret"
                      type="hidden"
                    />
                  </div>
                  {!showSelect ? (
                    <TiArrowSortedDown className="absolute top-[calc(50%-1.5rem)] right-2 w-7 h-12 text-[1rem] text-[rgba(0,0,0,0.54)] cursor-pointer" />
                  ) : (
                    <TiArrowSortedUp className="absolute top-[calc(50%-1.5rem)] right-2 w-7 h-12 text-[1rem] text-[rgba(0,0,0,0.54)] cursor-pointer" />
                  )}
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="secretAnswer">秘密の質問の答え</label>
              </dt>
              <dd className="ml-0">
                <FormErrorMessage>
                  {errors.secretAnswer && errors.secretAnswer.message}
                </FormErrorMessage>
                <div className="inline-flex relative w-full">
                  <Input
                    {...register("secretAnswer", { required: selectMessageRequired })}
                    id="secretAnswer"
                    name="secretAnswer"
                    type="text"
                    inputMode="text"
                  />
                </div>
              </dd>
            </dl>
            <SubmitButton />
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[1.2rem] font-bold leading-5 mb-6">認証中</h1>
          <div>
            <OrbitProgress color="#f29100" size="small" text="" textColor="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterInfo;
