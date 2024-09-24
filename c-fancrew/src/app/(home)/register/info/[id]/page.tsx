"use client";

import { paramDataConfirmingMail, verifyConfirmEmail } from "@/actions/account";
import { Input } from "@/components/common/Design/Input";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { OrbitProgress } from "react-loading-indicators";

const RegisterInfo = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loadFlg, setLoadFlg] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          <form>
            <dl>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="email">メールアドレス</label>
              </dt>
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
                  <Input
                    id="lastName"
                    name="lastName"
                    inputMode="text"
                    placeholder="苗字"
                  />
                </div>
                <div className="flex-1">
                  <Input
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
                <div className="inline-flex relative w-full">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    inputMode="text"
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
                <div className="inline-flex relative w-full">
                  <Input
                    id="birthday"
                    name="birthday"
                    type="date"
                    inputMode="text"
                  />
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                性別
              </dt>
              <dd className="ml-0">
                <div className="flex flex-wrap flex-row">
                  <label
                    htmlFor="male"
                    className="inline-flex mr-6 items-center cursor-pointer align-middle ml-[-11px]"
                  >
                    <span className="p-[9px] cursor-pointer">
                      <Input
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
                    <span className="cursor-pointer p-[9px]">
                      <Input
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
                <div className="inline-flex relative w-full">
                  <Input
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    inputMode="text"
                    placeholder="1230001"
                  />
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                お得なモニターをお届けするメルマガ
              </dt>
              <dd className="ml-0">
                <label htmlFor="mail-delivery" className="inline-flex items-center cursor-pointer ml-[-11px] mr-[16px]">
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
                <div className="inline-flex relative w-full">
                  <select id="secret" name="secret" />
                  <option>選択してください</option>
                </div>
              </dd>
              <dt className="mt-6 mr-0 mb-1 text-[1rem] leading-5 font-bold">
                <label htmlFor="secretAnswer">秘密の質問の答え</label>
              </dt>
              <dd className="ml-0">
                <div className="inline-flex relative w-full">
                  <Input
                    id="secretAnswer"
                    name="secretAnswer"
                    type="text"
                    inputMode="text"
                  />
                </div>
              </dd>
            </dl>
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
