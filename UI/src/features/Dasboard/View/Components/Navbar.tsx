import { Image } from "../../../../utility/Image";
import { IoNotificationsOutline, IoGridOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useMsal } from "@azure/msal-react";
import { Sidebar } from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useAppSelector } from "../../../../utility/hooks";
import { fetchedLoginJson } from "../../../Login/slice/LoginSlice";
import { getInitials } from "../../../../utility/Initials";
import { ClockInOut } from "./ClockInOut";

export const Navbar = () => {
  const { instance } = useMsal();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const navigation = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const user = useAppSelector(fetchedLoginJson);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setShow(false);
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  const handleProfile = () => {
    setShow(false);
    navigation("/home/profile");
  };
  return (
    <div className="bg-[linear-gradient(73deg,#005DAC,#005DAC,#005DAC)] grid grid-cols-8 w-full items-center h-16 fixed top-0 z-50">
      <div className="col-span-2 flex">
        <div
          className="text-white cursor-pointer content-center pl-5"
          onClick={() => toggleBar()}
        >
          <IoGridOutline className="w-5 h-5" />
        </div>

        <div className="w-full h-full flex flex-col ml-6">
          <p className="text-[#FEBE10] text-[Rubik] text-base font-semibold absolute top-0 left-20">
            PEOPLE
          </p>
          <img src={Image.connect} className="w-36 object-contain" />
        </div>
      </div>

      <div className="col-span-3 text-black flex items-center bg-white/10 w-full rounded-md p-2 h-10 content-center">
        <CiSearch className="w-8 h-8 " color="white" />
        <input
          type="text"
          placeholder="Search by Employee Name,Designation or Department"
          className="w-full ml-3 placeholder-gray-300 focus:outline-none text-sm text-white"
        />
      </div>

      <div className="col-span-3 text-white flex w-full justify-end items-center pr-5">
        {/* <div className="text-white flex w-full justify-end items-center mr-6">
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

          <div className="ml-3">
            <div className="w-15 py-2 placeholder-white focus:outline-none text-[12px] text-[#005DAC] font-medium font-[Rubik] border border-white/50 rounded-sm text-center bg-white">
              Check In
            </div>
          </div>
        </div> */}
        <ClockInOut />
        <IoNotificationsOutline className="w-6 h-6" />

        <div className="ml-4 cursor-pointer" onClick={() => setShow(!show)}>
          <div className="bg-white rounded-full w-8 h-8 text-[#005DAC] items-center flex justify-center font-medium font-[Rubik] text-xs">
          {getInitials(`${user[0].name}`)}
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <Sidebar setIsOpen={setIsOpen} />
        </>
      )}
      {show && (
        <div
          className="absolute right-2 top-15 border border-gray-200 shadow-lg rounded-lg  items-center justify-center p-2
  before:content-[''] before:absolute before:-top-2 before:right-3 before:-translate-x-1/2 
  before:border-l-[8px] before:border-l-transparent 
  before:border-r-[8px] before:border-r-transparent 
  before:border-b-[8px] before:border-b-white bg-white"
        >
          {/* profile */}
          <div className=" flex flex-row items-center p-3 border-b border-gray-200">
            <div className="bg-gray-200 rounded-full w-15 h-15 items-center flex justify-center text-center ">
              <p className="text-gray-800 font-[Rubik] font-medium text-xl text-center">
              
                {getInitials(`${user[0].name}`)}
              </p>
            </div>
            <div className=" ml-3">
              <p className="text-black font-[Rubik] font-medium text-sm ">
              {user[0].name}
              </p>
              <p className="text-gray-500 font-[Rubik] font-normal text-sm">
                1004213
              </p>

              <div
                className="bg-[#005DAC] text-white font-[Rubik] font-normal text-xs text-center p-1 rounded-sm mt-2 cursor-pointer"
                onClick={handleProfile}
              >
                View Profile
              </div>
            </div>
          </div>

          {/* logout */}

          <div
            className=" flex flex-row items-center py-2"
            onClick={handleLogout}
          >
            <IoIosLogOut className="w-5 h-5 " color="black" />

            <p className="font-medium font-[Rubik] text-sm text-black ml-2">
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
