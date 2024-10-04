import styles from "./DesignCss/CustomSelect.module.css";

const selList = [
  "選択してください",
  "お父さんの出身地は？",
  "母親の旧姓は？",
  "生まれた町名は？",
  "通っていた幼稚園(保育園)の名前は？",
  "最初に飼ったペットの名前は？",
  "中学三年生の時の担任は？",
  "子供時代のあだ名は？",
  "最初に乗った車の車種は？",
];

const CustomSelect = () => {
  return (
    <div role="presentation" id="menu-" className="fixed z-50 inset-0">
      <div
        className={`${styles.customSelectBase} ${styles.customSelectVisual}`}
      >
        <ul className="list-none m-0 py-[8px] px-0 relative outline-0">
          {selList.map((item, index) => (
            <li
              key={`selectItem${index}`}
              className={`${index === 0 ? "bg-[rgba(25,118,210,0.12)] hover:bg-[rgba(25,118,210,0.07)] text-[gray]" : "hover:bg-gray-100"} md:min-h-auto border-[0px] m-0 outline-0 cursor-pointer select-none relative text-[1rem]
                    align-middle appearance-none leading-5 tracking-[0.00938em] flex justify-start items-center py-[6px] px-[16px] whitespace-nowrap`}
            >
              {item}
              <span className="overflow-hidden pointer-events-none absolute z-0 inset-0 rounded-inherit"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
