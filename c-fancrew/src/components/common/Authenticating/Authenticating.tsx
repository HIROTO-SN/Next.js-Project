import { CircularProgress } from "@mui/material"

const Authenticating = () => {
  return (
    <div className="mt-[1.5rem] m-auto mb-[3.5rem] flex max-w-5xl justify-between gap-7 w-full">
      <div className="w-full flex p-[20vh_0] text-center items-center flex-col justify-center bg-[#f29100]">
        <span className="text-white block text-[2.5rem] font-bold mb-[3rem]">
          認証中
        </span>
        <span className="w-10 h-10 flex items-center justify-center mb-[3rem]">
          <CircularProgress
            className="flex text-white"
            size={40}
            thickness={4}
          />
        </span>
        <p className="text-white text-[0.9rem] leading-8">
          ただいま、認証中です。
          <br />
          結果まで今しばらくお待ちください。
        </p>
      </div>
    </div>
  )
}

export default Authenticating