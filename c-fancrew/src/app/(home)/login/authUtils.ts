"use client";

import { generateUUID } from "@/utils/commonUtils";

// LINE認証設定情報
interface LineConfig {
  baseUrl: string;
  responseType: string;
  clientId: string;
  redirectUri: string;
  state: string;
  scope: string;
}

const LINE_CONFIG: LineConfig = {
  baseUrl: process.env.NEXT_PUBLIC_LINE_BASE_URL ?? "",
  responseType: process.env.NEXT_PUBLIC_RESPONSE_TYPE ?? "",
  clientId: process.env.NEXT_PUBLIC_LINE_CLIENT_ID ?? "",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT ?? "",
  state: generateUUID(),
  scope: process.env.NEXT_PUBLIC_LINE_SCOPE ?? "",
};

export const createLineUrl = () => {
  return `${LINE_CONFIG.baseUrl
    }response_type=${LINE_CONFIG.responseType
    }&client_id=${LINE_CONFIG.clientId
    }&redirect_uri=${encodeURI(LINE_CONFIG.redirectUri)
    }&state=${LINE_CONFIG.state
    }&scope=${LINE_CONFIG.scope}`;
};

// GOOGLE認証設定情報
interface GoogleConfig {
  baseUrl: string;
  responseType: string;
  clientId: string;
  redirectUri: string;
  state: string;
  scope: string;
  access_type: string;
  grantedScopes: boolean;
}

const GOOGLE_CONFIG: GoogleConfig = {
  baseUrl: process.env.NEXT_PUBLIC_GOOGLE_BASE_URL ?? "",
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT ?? "",
  scope: process.env.NEXT_PUBLIC_GOOGLE_SCOPE ?? "",
  access_type: process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TYPE ?? "",
  responseType: process.env.NEXT_PUBLIC_RESPONSE_TYPE ?? "",
  state: generateUUID(),
  grantedScopes: true,
};

export const createGoogleUrl = () => {
  return `${GOOGLE_CONFIG.baseUrl
    }response_type=${LINE_CONFIG.responseType
    }&client_id=${GOOGLE_CONFIG.clientId
    }&redirect_uri=${encodeURI(GOOGLE_CONFIG.redirectUri)
    }&state=${GOOGLE_CONFIG.state
    }&scope=${GOOGLE_CONFIG.scope
    }&access_type=${GOOGLE_CONFIG.access_type  
    }&include_granted_scopes=${GOOGLE_CONFIG.grantedScopes}`;
};