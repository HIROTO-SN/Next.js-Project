import styles from "../Home.module.css";
import PictureBlock from "./PictureBlock";

const DesktopMainPic = () => {
  const pictureBlockStylesArray = [
    { gridRow: "1 / 3",  gridColumn: "1 / 2", pt: "159.184%"},
    { gridRow: "1 / 2",  gridColumn: "2 / 3", pt: "79.591%"},
    { gridRow: "2 / 3",  gridColumn: "2 / 3", pt: "79.591%"},
    { gridRow: "1 / 3",  gridColumn: "3 / 4", pt: "79.591%"},
  ];

  const picSrcArray = [
    "1_main_shopping_pc", "2_main_hairsalon_pc", "3_main_onlineshopping_pc", "4_main_cafe_pc"
  ]

  return (
    <div
      className={`m-auto grid overflow-hidden relative max-w-[1024px] ${styles.customGrid}`}
    >
      {pictureBlockStylesArray.map((blockStyle, i) => (
        <PictureBlock key={i} styles={blockStyle} picSrc={picSrcArray[i]} />
      ))}
      <h2 className="absolute z-1 py-[1rem] px-[2rem] top-[50%] w-[50%] transform -translate-y-1/2 bg-[rgba(255,255,255,0.9)] text-left">
        <span className="text-[#323232] block text-[1.5rem] font-bold leading-[1.6]">かしこく体験 たのしく貢献</span>
        <span className="text-[#323232] block text-[0.8rem] font-bold leading-[1.4]">あなたの声がサービス改善に役立ちます</span>
      </h2>
    </div>
  );
};

export default DesktopMainPic;
