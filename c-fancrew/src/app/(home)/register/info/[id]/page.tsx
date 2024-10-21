"use client";

import { paramDataConfirmingMail, verifyConfirmEmail } from "@/actions/account";
import CustomSelect from "@/components/common/Design/CustomSelect";
import { FormErrorMessage } from "@/components/common/Design/FormErrorMessage";
import { Input } from "@/components/common/Design/Input";
import { Radio } from "@/components/common/Design/Radio";
import { useRegisterAccount } from "@/contexts/RegisterContext/RegisterAccount";
import {
  genderList,
  secretListProp,
  secretSelectList,
} from "@/utils/config/registerConf";
import {
  dateValidationRules,
  inputMessageRequired,
  nameValidationRules,
  passwordValidationRules,
  selectMessageRequired,
  zipCodeValidationRules,
} from "@/utils/config/validationConf";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { OrbitProgress } from "react-loading-indicators";
import styles from '../../Register.module.css';

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
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<formInputs>(); // Form submit

  const [loadFlg, setLoadFlg] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false); //2度処理が回るのを防止
  const [isConfirming, setIsConfirming] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [defaultEmail, setDefaultEmail] = useState("");
  const {
    lastName,
    firstName,
    password,
    birthday,
    gender,
    zipcode,
    mailDelivery,
    secretAnswer,
    handleChange,
    setFormValues,
  } = useRegisterAccount(); // RegisterAccountContext
  const [secretDisplay, setSecretDisplay] = useState<number>(0);
  const [maxDate, setMaxDate] = useState<Date>(new Date());
  const confirmStyle = {
    cursor: "not-allowed",
    color: "rgba(0, 0, 0, 0.38) !important",
    backgroundColor: "rgb(232, 240, 254) !important",
  };

  /*
   * ロード処理
   */
  useLayoutEffect(() => {
    // 誕生日日付けの最大値設定（16歳以上）
    setMaxDate(
      new Date(
        maxDate.getFullYear() - 16,
        maxDate.getMonth(),
        maxDate.getDate()
      )
    );

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
        setDefaultEmail(ret);
        setLoadFlg(true);
      }
    };
    handleComfirmEmailCallback();
  }, []);

  /**
   * 項目がクリックされたときに実行される関数
   *
   * @param item - 選択された秘密の質問の項目 (secretListProp 型)
   */
  const handleItemClick = (item: secretListProp) => {
    setSecretDisplay(item.id);
    setFormValues((prevValues) => ({
      ...prevValues,
      secret: item.id,
    }));
    handleSecretChange(item.id);
  };

  /**
   * ラジオボタンがクリックされたときに実行される関数
   *
   * @param e - クリックされたラジオボタンのイベント (React.ChangeEvent<HTMLInputElement>)
   */
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      gender: e.target.value,
    }));
    setValue("gender", e.target.value, {
      shouldValidate: false, // バリデーションを実行する
    });
  };

  // 秘密の質問の値が変更されたときの処理
  const handleSecretChange = (newValue: number) => {
    setValue("secret", newValue, {
      shouldValidate: false, // バリデーションを実行する
    });
  };

  const onSubmit = handleSubmit(async () => {
    if (submitLoading) return;
    setSubmitLoading(true);

    if (!isConfirming) {
      // 確認ページへ遷移する場合
      // 確認ページのトップへスクロールする
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      setSubmitLoading(false);
      setIsConfirming(true);
    } else {
      // 電話番号認証へ
      router.replace("/register/tel");
    }
  });

  const SubmitButton = () => {
    return (
      <button
        type="submit"
        className="cursor-pointer bg-transparent w-full max-w-[335px] mt-[42px] mx-auto mb-0 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]
        border border-solid border-[#82ad24] flex py-[8px] px-[34px] text-center relative min-h-[60px] rounded-[4px] justify-center items-center"
      >
        <span className="flex-grow text-[#82ad24] text-[1rem] font-bold leading-5">
          {isConfirming ? "携帯番号認証に進む" : "入力内容を確認する"}
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
                  value={defaultEmail}
                  disabled
                  id="email"
                  name="email"
                  onChange={handleChange}
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
                    value={lastName}
                    onChange={handleChange}
                    style={isConfirming ? confirmStyle : undefined}
                    disabled={isConfirming}
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
                    value={firstName}
                    onChange={handleChange}
                    style={isConfirming ? confirmStyle : undefined}
                    disabled={isConfirming}
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
                    maxLength={12}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChange}
                    style={isConfirming ? confirmStyle : undefined}
                    disabled={isConfirming}
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
                    value={String(birthday)}
                    onChange={handleChange}
                    max={maxDate.toISOString().split("T")[0]}
                    style={isConfirming ? confirmStyle : undefined}
                    addClass={styles.inputDateNoIndicator}
                    disabled={isConfirming}
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
                  {genderList.map((item, i) => (
                    <Radio
                      key={i}
                      item={item}
                      radioName="genderRadio"
                      onChange={(e) => handleRadioClick(e)}
                      disabled={isConfirming}
                      checked={gender === item.value}
                    />
                  ))}
                  <input
                    {...register("gender", {
                      required: selectMessageRequired,
                    })}
                    id="gender"
                    name="gender"
                    type="hidden"
                    onChange={handleChange}
                  />
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
                    maxLength={7}
                    onChange={handleChange}
                    value={zipcode}
                    style={isConfirming ? confirmStyle : undefined}
                    disabled={isConfirming}
                  />
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                お得なモニターをお届けするメルマガ
              </dt>
              <dd className="ml-0">
                <label
                  htmlFor="mailDelivery"
                  className="inline-flex items-center cursor-pointer ml-[-11px] mr-[16px]"
                >
                  <span className="p-[9px]">
                    <Input
                      id="mailDelivery"
                      name="mailDelivery"
                      type="checkbox"
                      onChange={handleChange}
                      checked={mailDelivery}
                      disabled={isConfirming}
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
                  onClick={() => {
                    if (!isConfirming) {
                      setShowSelect(!showSelect);
                    }
                  }}
                  style={isConfirming ? confirmStyle : undefined}
                >
                  <div className="pt-[1rem] pr-[32px] pb-[1rem] pl-[1.2rem] text-[1rem] leading-5 border border-[#ccc] border-solid w-full cursor-pointer">
                    {secretSelectList.find((item) => item.id === secretDisplay)
                      ?.value ?? ""}
                    {showSelect && !isConfirming && (
                      <CustomSelect
                        selList={secretSelectList}
                        handleClick={handleItemClick}
                      />
                    )}
                    <input
                      {...register("secret", {
                        required: selectMessageRequired,
                        validate: (value) =>
                          value !== 0 || selectMessageRequired,
                      })}
                      id="secret"
                      name="secret"
                      type="hidden"
                      onChange={handleChange}
                    />
                  </div>
                  {!showSelect ? (
                    <TiArrowSortedDown
                      className="absolute top-[calc(50%-1.5rem)] right-2 w-7 h-12 text-[1rem] text-[rgba(0,0,0,0.54)] cursor-pointer"
                      style={
                        isConfirming
                          ? { color: "rgba(0, 0, 0, 0.38" }
                          : undefined
                      }
                    />
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
                    {...register("secretAnswer", {
                      required: inputMessageRequired,
                    })}
                    id="secretAnswer"
                    name="secretAnswer"
                    type="text"
                    inputMode="text"
                    onChange={handleChange}
                    value={secretAnswer}
                    style={isConfirming ? confirmStyle : undefined}
                    disabled={isConfirming}
                  />
                </div>
              </dd>
            </dl>
            <SubmitButton />
            {isConfirming && (
              <button
                type="button"
                onClick={() => {
                  setIsConfirming(!isConfirming), setSubmitLoading(false);
                }}
                className="text-[#82ad24] max-w-[335px] mt-[10px] mx-auto block text-center cursor-pointer px-[1rem] w-full min-h-[30px] bg-[#f7f3e8]"
              >
                <span className="w-full block text-center text-[0.8rem] underline">
                  一つ前に戻る
                </span>
              </button>
            )}
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
