import React from "react";
import { getInitials } from "../../../../utility/Initials";
import { useAppSelector } from "../../../../utility/hooks";
import { fetchedLoginJson } from "../../../Login/slice/LoginSlice";

export const TimeCard = () => {
  const user = useAppSelector(fetchedLoginJson);

  const Punch = () => {};
  return (
    <div className="flex bg-white h-full w-full p-5 pt-20 h-full justify-center items-center">
      <div className="flex  bg-gray-300 w-200 justify-center items-center p-5 rounded-lg">
        <div className="border border-gray-600 w-70">
          <p className="font-[Rubik] text-black text-xl font-medium ">
            Good Morning Charles !!!
          </p>
          <p className="font-gray-500 text-black text-sm font-medium ">
            Let's get to work !
          </p>

          <div className="ml-4 cursor-pointer mt-5 mb-5">
            <div className="bg-white rounded-full w-25 h-25 text-[#005DAC] items-center flex justify-center font-medium font-[Rubik] text-2xl">
              {getInitials(`${user[0].name}`)}
            </div>
          </div>

          <div>
            <div className="text-black flex flex-col w-full justify-end items-center ">
              <div className="flex">
                <p
                  className="text-large font-[Rubik] font-normal text-black text-center border border-gray-500 rounded-sm p-1"
                  onClick={() => Punch()}
                >
                  11:20:34
                </p>

                <p
                  className="text-large font-[Rubik] font-normal text-black text-center ml-10 border border-gray-500 rounded-sm p-1"
                  onClick={() => Punch()}
                >
                  05:50:23
                </p>
              </div>
              <div
                className="bg-[#005DAC] p-2 w-30 text-center rounded-sm text-sm font-[Rubik] font-medium text-white mt-5"
                onClick={() => Punch()}
              >
                Clock In
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-l border-red-300 pl-3 w-130 items-center justify-center">
          <p className="font-[Rubik] text-black text-xl font-medium ">
            Good Morning Charles !!!
          </p>
          <p className="font-gray-500 text-black text-sm font-medium ">
            Let's get to work !
          </p>

          <div className="ml-4 cursor-pointer mt-5 mb-5">
            <div className="bg-white rounded-full w-25 h-25 text-[#005DAC] items-center flex justify-center font-medium font-[Rubik] text-2xl">
              {getInitials(`${user[0].name}`)}
            </div>
          </div>

          <div className="flex">
            <p
              className="text-large font-[Rubik] font-normal text-black text-center border border-gray-500 rounded-sm p-1"
              onClick={() => Punch()}
            >
              11:20:34
            </p>

            <p
              className="text-large font-[Rubik] font-normal text-black text-center ml-10 border border-gray-500 rounded-sm p-1"
              onClick={() => Punch()}
            >
              05:50:23
            </p>
          </div>

          <div
            className="bg-[#005DAC] p-2 w-30 text-center rounded-sm text-sm font-[Rubik] font-medium text-white mt-5"
            onClick={() => Punch()}
          >
            Clock In
          </div>
        </div>
      </div>
    </div>
  );
};
