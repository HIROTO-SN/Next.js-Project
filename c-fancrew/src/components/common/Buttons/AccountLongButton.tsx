interface AccountLongButtonProps {}

const AccountLongButton: React.FC<AccountLongButtonProps> = () => {
  return (
    <button
      className="max-w-80 items-center w-full py-2 px-8 flex relative box-border min-h-14 ml-auto mr-auto rounded-[4px] justify-center border-2 border-solid border-[#82ad24]"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      <span className="text-[#82ad24] text-[1rem] font-bold leading-5 flex-grow">
        ログイン
      </span>
    </button>
  );
};

export default AccountLongButton;
