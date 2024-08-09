const Logo = () => {
  return (
    <h1 className="m-0">
      <a href="/" className="md:ml-0 w-[12.8rem] block">
        <div className="w-[8rem] relative">
          <div className="mx-auto lock max-w-full aspect-[128/33.7] relative box-border overflow-hidden">
            <div className="box-border block max-w-full">
              <img
                alt=""
                aria-hidden="true"
                src=""
                className="max-w-full block m-0 border-none py-0"
              />
            </div>
            <img
              alt="ファンくる"
              src="/logo/logo_fancrew.svg?auto=format&amp;fit=max&amp;w=640"
              srcSet="/logo/logo_fancrew.svg?auto=format&amp;fit=max&amp;w=384 1x, /logo/logo_fancrew.svg?auto=format&amp;fit=max&amp;w=640 2x"
              decoding="async"
              data-nimg="intrinsic"
              className="absolute inset-0 box-border py-0 border-0 m-auto block w-128 h-0 min-h-full min-w-full max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </a>
    </h1>
  );
};

export default Logo;
