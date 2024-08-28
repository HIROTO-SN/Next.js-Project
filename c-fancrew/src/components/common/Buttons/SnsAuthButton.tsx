interface SnsLoginProps {
  buttonName: string;
  link: string;
  icon: string;
}

const SnsAuthButton: React.FC<SnsLoginProps> = ({ buttonName, link, icon }) => {
  return (
    <li className="w-[calc(100%/3)] border-t border-r border-b border-solid border-[#e7e7e7] box-border">
      <a title={`${buttonName}でログイン`} href={link} className="py-4 px-2 block">
        <div className="inline-block align-middle relative">
          <div className="max-w-full overflow-hidden relative box-border my-0 mx-auto block max-h-full">
            <div className="max-w-full box-border block">
              <img
                className="max-w-full block m-0 border-none p-0"
                src="/logo/box.svg"
                aria-hidden="true"
              />
            </div>
            <img
              className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-contain"
              src={`${icon}?auto=format&fit=max&w=64`}
              srcSet={`${icon}?auto=format&fit=max&w=32 1x, ${icon}?auto=format&fit=max&w=64 2x,`}
            />
          </div>
        </div>
        <span className="leading-9 text-[#323232] text-[0.9rem] font-bold break-keep pl-[0.8rem] tracking-[-0.03rem]">
          {buttonName}
        </span>
      </a>
    </li>
  );
};

export default SnsAuthButton;
