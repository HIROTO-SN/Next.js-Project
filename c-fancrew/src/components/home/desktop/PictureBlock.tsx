interface PictureBlockProps {
  styles: {
    gridRow: string;
    gridColumn: string;
    pt: string;
  };
  picSrc: string,
}

const PictureBlock: React.FC<PictureBlockProps> = ({ styles, picSrc }) => {
  return (
    <div style={{gridRow: styles.gridRow, gridColumn: styles.gridColumn}}>
      <div className="relative">
        <div className="overflow-hidden relative box-border m-auto block max-w-full max-h-full">
          <div className="block box-border" style={{ paddingTop: styles.pt}}></div>
          <img
            className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-contain"
            alt="店頭購入イメージ"
            sizes="100vw"
            decoding="async"
            data-nimg="intrinsic"
            src={`/home/${picSrc}.jpg`}
          />
        </div>
      </div>
    </div>
  );
};

export default PictureBlock;
