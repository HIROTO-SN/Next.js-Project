"use client";

import { paramDataConfirmingMail, verifyConfirmEmail } from "@/actions/account";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const RegisterInfo = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loadFlg, setLoadFlg] = useState(false);

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
      const ret: Boolean = await verifyConfirmEmail(paramData);
      if (!ret) {
        router.push(`/register/error`);
      }
      setLoadFlg(true);
    };
    handleComfirmEmailCallback();
  }, []);

  if (loadFlg) {
    return <div>RegisterInfo</div>;
  } else {
    return null;
  }
};

export default RegisterInfo;
