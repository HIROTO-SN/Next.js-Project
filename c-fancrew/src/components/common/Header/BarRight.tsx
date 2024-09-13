import { IoMdSearch } from "react-icons/io";

const BarRight = () => {
  return (
    <ul className="flex items-center mb-0">
      <li>
        <div className='cursor-pointer p-[0.7rem]'>
          <IoMdSearch className="inline-block w-[1em] h-[1em] text-[25px] text-[#82ad24]"/>
        </div>
      </li>
      <li>
        <div className="font-bold">
          <a href="/login" className="text-[1rem] text-[#323232] flex p-[0.8rem] items-center no-underline">ログイン</a>
        </div>
      </li>
      <li>
        <div className="font-bold bg-[#82ad24] rounded-[0.4rem]">
          <a href="/register" className="text-[#ffffff] text-[1rem] flex items-center py-[0.5rem] px-[0.8rem] no-underline">会員登録</a>
        </div>
      </li>
    </ul>
  )
}

export default BarRight
