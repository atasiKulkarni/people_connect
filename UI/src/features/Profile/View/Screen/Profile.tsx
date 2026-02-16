import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { PiUserCirclePlusLight } from "react-icons/pi";
import { ProfileMenu } from "../Components/ProfileMenu";
import type { MenuItemName } from "../../model/ProfileModel";

export const Profile = () => {
  const [activeItem, setActiveItem] = useState<MenuItemName>("Profile");
 

  return (
    <div className="pt-15 pb-1 bg-[#f3f9ff] overflow-hidden">
      <div className="grid grid-cols-10 w-full border border-red-400">
        {/* left section */}
        <ProfileMenu setActiveItem={setActiveItem} activeItem={activeItem} />

        {/* mid section */}
        <div className="col-span-8 overflow-y-auto h-[calc(100vh-theme('spacing.10'))] p-5 overflow-hidden">
          <div className="rounded-lg bg-white ">
            <div className="rounded-tl-lg rounded-tr-lg  bg-blue-100 ">
              <div className=" flex flex-row items-center p-3 border-b border-gray-200">
                <div className="bg-gray-200 rounded-full w-25 h-25 items-center flex justify-center text-center border border-white">
                  <p className="text-gray-800 font-[Rubik] font-medium text-xl text-center">
                    AK
                  </p>
                </div>
                <div className=" ml-3">
                  <p className="text-black font-[Rubik] font-medium text-2xl ">
                    Atasi Kulkarni
                  </p>
                  <div className="flex flex-row my-1">
                    <p className="text-black font-[Rubik] font-normal text-sm  ">
                      Associate Engineer I
                    </p>
                    <p className="text-gray-400 font-[Rubik] font-normal text-sm  mx-2">
                      |
                    </p>
                    <p className="text-black font-[Rubik] font-normal text-sm  ">
                      Engineering-RGB
                    </p>
                  </div>

                  <p className="text-gray-500 font-[Rubik] font-normal text-sm">
                    1004213
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-9 p-3">
              <div className="flex flex-row col-span-2 items-center">
                <CiMail className="w-5 h-5" color="black" />
                <p className="text-black font-[Rubik] font-normal text-sm ml-2">
                  abc@gmail.com
                </p>
              </div>

              <div className="flex flex-row col-span-2 items-center">
                <CiLocationOn className="w-5 h-5" color="black" />
                <p className="text-black font-[Rubik] font-normal text-sm ml-2">
                  Kalyani nagar
                </p>
              </div>

              <div className="flex flex-row col-span-2 items-center">
                <PiUserCirclePlusLight className="w-5 h-5" color="black" />
                <p className="text-black font-[Rubik] font-normal text-sm ml-2">
                  Nyra Pakhare
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
