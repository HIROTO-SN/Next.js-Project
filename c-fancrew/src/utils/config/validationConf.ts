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
const passwordCommonMessage = "半角英数記号(@#$%^&)を全て使用して6~12文字以内で入力してください。";
const passwordPattern = /(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}/;
export const passwordValidationRules: ValidationProps = {
  required: { value: true, message: inputMessageRequired },
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
const zipCodePattern = /\d{7}$/;
export const zipCodeValidationRules: ValidationProps = {
  required: { value: true, message: zipCodeMessage },
  maxLength: { value: 7, message: zipCodeMessage },
  pattern: {
    value: zipCodePattern,
    message: zipCodeMessage,
  },
};

// 電話番号
const telPattern = /^\d{11}$/;
const telCommonMessage = "半角数字の11桁で入力してください。";
export const telValidationRules: ValidationProps = {
  required: { value: true, message: telCommonMessage },
  maxLength: { value: 11, message: maxLengthMessage(11) },
  pattern: {
    value: telPattern,
    message: telCommonMessage,
  },
};

// 認証番号
const telConfirmationPattern = /^\d{6}$/;
const telConfirmationCommonMessage = "半角数字の6桁で入力してください。";
export const telConfirmationValidationRules: ValidationProps = {
  required: { value: true, message: telConfirmationCommonMessage },
  pattern: {
    value: telConfirmationPattern,
    message: telConfirmationCommonMessage,
  },
};