"use client";

import {
  paramDataOauthGmail,
  retOauthVerification,
  verifyOAuthCallback,
} from "@/actions/account";
import Authenticating from "@/components/common/Authenticating/Authenticating";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AuthCallback = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  /**
   * ロード処理
   */
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const paramData: paramDataOauthGmail = {
        code: decodeURIComponent(searchParams.get("code") as string),
        stateUrl: searchParams.get("state") as string,
      };

      // コールバックURLパラメータが正しいか確認
      if (!paramData.code || !paramData.stateUrl) {
        setError("無効なコールバックURLパラメータです。");
        return;
      }
      const ret: retOauthVerification = await verifyOAuthCallback(paramData);
      console.log(ret);
    };
    handleOAuthCallback();
  }, []);

  return (
    <Authenticating/>
  );
};

export default AuthCallback;
