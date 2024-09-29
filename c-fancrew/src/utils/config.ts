/** バリデーションルール */ 
interface ValidationProps {
  required?: {
    value: boolean;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

// 共通
export const inputMessageRequired = "入力必須項目です。";
export const selectMessageRequired = "選択必須項目です。";
export const inputInvalidRequired = "入力内容が不正です。";
export const maxLengthMessage = (len: Number) => `${len}以内で入力してください`;

// email
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/;
const emailPatternMessage = "メールアドレスの形式が違います";

export const emailValidationRules: ValidationProps = {
  required: { value: true, message: inputMessageRequired },
  maxLength: { value: 50, message: maxLengthMessage(50) },
  pattern: {
    value: emailPattern,
    message: emailPatternMessage,
  },
};

// 名前
export const nameValidationRules: ValidationProps = {
  required: { value: true, message: inputMessageRequired },
  maxLength: { value: 30, message: maxLengthMessage(30) },
};

// パスワード
const passwordCommonMessage = "半角英数字で6~12文字以内で入力してください。";
const passwordPattern = /^[a-zA-Z0-9]{6,12}$/;
export const passwordValidationRules: ValidationProps = {
  required: { value: true, message: passwordCommonMessage },
  maxLength: { value: 12, message: maxLengthMessage(12) },
  pattern: {
    value: passwordPattern,
    message: passwordCommonMessage,
  },
};

// 生年月日
export const dateValidationRules: ValidationProps = {
  required: { value: true, message: inputMessageRequired },
  maxLength: { value: 10, message: inputInvalidRequired },
};

// 郵便番号
const zipCodeMessage = "正しい郵便番号を入力してください。";
const zipCodePattern = /\d{3}-\d{4}$/;
export const zipCodeValidationRules: ValidationProps = {
  required: { value: true, message: zipCodeMessage },
  maxLength: { value: 8, message: zipCodeMessage },
  pattern: {
    value: zipCodePattern,
    message: zipCodeMessage,
  },
};
