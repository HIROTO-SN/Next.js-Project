"use server"

import { UserDocument } from "@/models/User";

export interface FormState {
  error: string;
}

export const verifyUser = async (state: FormState, formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json();
    if (!response.ok) {
      state.error = data.error;
      return state as FormState;
    } else {
      return state;
    }
  } catch (e) {
    state.error = "ログイン認証に失敗しました";
    return state as FormState;
  }
}