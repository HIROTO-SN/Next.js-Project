import React from 'react'

const Arrow = () => {
  return (
    <span className='w-[0.3rem] mr-[0.3rem] text-[1rem] leading-3'>
      <div className='relative'>
        <div className='max-w-full overflow-hidden relative box-border my-0 mx-auto block max-h-full'>
          <div className='box-border block max-w-full'></div>
          <img alt="arrow" src="/obj/next-black.svg" decoding="async" data-nimg="intrinsic"/>
        </div>
      </div>
    </span>
  )
}

export default Arrow