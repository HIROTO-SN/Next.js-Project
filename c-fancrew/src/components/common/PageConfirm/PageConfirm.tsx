import Arrow from "./Arrow";

const PageConfirm = () => {
  return (
    <div className="justify-center w-full my-0 mx-auto py-[0.25rem] px-[0.8rem] flex items-center bg-[#f3f3f3]">
      <span className="text-[0.8em] leading-3 mr-[0.5rem]">会員登録</span>
      <Arrow/>
      <span className="text-[0.8em] leading-3 mr-[0.5rem]">メールアドレス確認</span>
      <Arrow/>
      <span className="text-[0.8em] leading-3 mr-[0.5rem]">会員情報登録</span>
      <Arrow/>
      <span className="text-[0.8em] leading-3 mr-[0.5rem]">SMS認証</span>
      <Arrow/>
      <span className="text-[0.8em] leading-3 mr-[0.5rem]">完了</span>
    </div>
  );
};

export default PageConfirm;
