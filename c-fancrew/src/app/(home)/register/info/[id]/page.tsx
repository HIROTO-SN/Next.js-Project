"use client";

import { paramDataConfirmingMail, verifyConfirmEmail } from "@/actions/account";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const RegisterInfo = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * ロード処理
   */
  useEffect(() => {
    const handleComfirmEmailCallback = async () => {
      const param = searchParams.get("param");
      if (!param) {
        router.push(`/register/error`);
      }

      const paramData: paramDataConfirmingMail = {
        id: Number(id),
        param: param ? param : "",
      }
      const ret: Boolean = await verifyConfirmEmail(paramData);
      console.log("ret: " + ret);
    };
    handleComfirmEmailCallback();
  }, []);

  return <div>RegisterInfo</div>;
};

export default RegisterInfo;
