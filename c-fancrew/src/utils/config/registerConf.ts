interface GenderListProp {
  id: string;
  name: string;
  value: string;
}

export const genderList: GenderListProp[] = [
  { id: "male", name: "男性", value: "0"},
  { id: "female", name: "女性", value: "1"},
  { id: "other", name: "その他", value: "2"},
];

export interface secretListProp {
  id: number;
  value: string;
}

export const secretSelectList: secretListProp[] = [
  { id: 0, value: "選択してください"},
  { id: 1, value: "お父さんの出身地は？"},
  { id: 2, value: "母親の旧姓は？"},
  { id: 3, value: "生まれた町名は？"},
  { id: 4, value: "通っていた幼稚園(保育園)の名前は？"},
  { id: 5, value: "最初に飼ったペットの名前は？"},
  { id: 6, value: "中学三年生の時の担任は？"},
  { id: 7, value: "子供時代のあだ名は？"},
  { id: 8, value: "最初に乗った車の車種は？"},
];

// SMS関連
export const validMins = 5;
export const smsVerificationMsg = `is your verification code, valid for ${validMins} minutes`;