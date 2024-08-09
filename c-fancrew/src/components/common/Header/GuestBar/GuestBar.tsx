import Logo from "../Logo"
import BarRight from "./BarRight"

const GuestBar = () => {
  return (
    <div className="mx-auto flex max-w-[1024px] min-h-[5.1rem] items-center border-b border-b-[#e7e7e7] justify-between">
      <Logo/>
      <BarRight/>
    </div>
  )
}

export default GuestBar
