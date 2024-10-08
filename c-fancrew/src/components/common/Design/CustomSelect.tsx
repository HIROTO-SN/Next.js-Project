import { FC } from "react";
import styles from "./DesignCss/CustomSelect.module.css";
import { secretListProp } from "@/utils/config/registerConf";

interface CustomSelectProps {
  selList: secretListProp[];
  handleClick: (item: secretListProp) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({ selList, handleClick }) => {

  return (
    <div role="presentation" id="menu-" className="fixed z-50 inset-0">
      <div
        className={`${styles.customSelectBase} ${styles.customSelectVisual}`}
      >
        <ul className="list-none m-0 py-[8px] px-0 relative outline-0">
          {selList.map((item) => (
            <li
              key={`selectItem${item.id}`}
              className={`${
                item.id === 0
                  ? "bg-[rgba(25,118,210,0.12)] hover:bg-[rgba(25,118,210,0.07)] text-[gray]"
                  : "hover:bg-gray-100"
              } md:min-h-auto border-[0px] m-0 outline-0 cursor-pointer select-none relative text-[1rem]
                    align-middle appearance-none leading-5 tracking-[0.00938em] flex justify-start items-center py-[6px] px-[16px] whitespace-nowrap`}
              onClick={() => handleClick(item)}
            >
              {item.value}
              <span className="overflow-hidden pointer-events-none absolute z-0 inset-0 rounded-inherit"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
