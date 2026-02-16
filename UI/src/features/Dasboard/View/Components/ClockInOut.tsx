import React from 'react'

export const ClockInOut = () => {
    // const Punch = () => {

    // }
  return (
    <div className='mr-6'>
         <div className="text-white flex w-full justify-end items-center">
          <div>
            <p className="text-[10px] font-[Rubik] font-medium">Clockin</p>
            <input
              type="text"
              placeholder="11:30:05"
              className="w-15 h-6 placeholder-white focus:outline-none text-[10px] text-white font-medium font-[Rubik] border border-white/50 rounded-xs text-center"
            />
          </div>

          <div className="ml-3">
            <p className="text-[10px] font-[Rubik] font-medium">Clockout</p>
            <input
              type="text"
              placeholder="05:23:45"
              className="w-15 h-6 placeholder-white focus:outline-none text-[10px] text-white font-medium font-[Rubik] border border-white/50 rounded-xs text-center"
            />
          </div>

          {/* <div className="ml-3">
            <div className="w-15  placeholder-white focus:outline-none text-[12px] text-[#005DAC] font-medium font-[Rubik] border border-white/50 rounded-full text-center bg-white">
              Punch
            </div>
          </div> */}

           {/* <div className="ml-4 cursor-pointer" onClick={() => Punch()}>
                    <div className="bg-white p-2 rounded-full w-10 h-10 text-[#005DAC] items-center flex justify-center font-medium font-[Rubik] text-xs text-center">
                   In/Out
                    </div>
                  </div> */}

        </div>
    </div>
  )
}
