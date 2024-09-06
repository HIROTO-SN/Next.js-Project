import Arrow from "./Arrow";

interface PageConfirmProps {
  currentUrl: string;
}

const PageConfirm: React.FC<PageConfirmProps> = ({ currentUrl }) => {
  console.log("urlは" + currentUrl)
  const pageConfirmList = [
    { name: "会員登録", urlName: "register" },
    { name: "メールアドレス登録", urlName: "mail-confirm" },
    { name: "会員情報登録", urlName: "register" },
    { name: "SMS認証", urlName: "register" },
    { isLast: true, name: "完了", urlName: "register" },
  ];
  return (
    <div className="justify-center w-full my-0 mx-auto py-[0.25rem] px-[0.8rem] flex items-center bg-[#f3f3f3]">
      {pageConfirmList.map((page) => (
        <div key={page.name} className="flex items-center">
          <span className={`${currentUrl === page.urlName ? "font-bold " : ""}text-[0.8em] leading-3 mr-[0.5rem]`}>{page.name}</span>
          {page.isLast === undefined &&
            <Arrow />
          }
        </div>
      ))}
    </div>
  );
};

export default PageConfirm;
