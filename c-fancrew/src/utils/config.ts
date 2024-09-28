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

export const ITEMS_PER_PAGE = 10;