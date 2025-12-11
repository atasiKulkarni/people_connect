import { useState, useRef, useEffect } from "react";
import { PiBuildingsThin } from "react-icons/pi";
import { LuCalendarArrowUp } from "react-icons/lu";
import { TiFlowChildren } from "react-icons/ti";
import { CgNotes } from "react-icons/cg";
import { GoGoal } from "react-icons/go";
import { RxDotsVertical } from "react-icons/rx";
import { Navbar } from "../Components/Navbar";
import { Banner } from "../../../Banner/View/Screen/Banner";
import { Recommendations } from "../Components/Recommendations";
import { Updates } from "../Components/Updates";
import { Events } from "../../../Events/View/Screen/Events";


export const Dashboard = () => {

  const mainContentRef = useRef<HTMLDivElement>(null);
  const [rightSectionSticky, setRightSectionSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        // Get the top of the main content area
        const topOfMainContent = mainContentRef.current.getBoundingClientRect().top;
        
        // The right section should become sticky when the top of the
        // main content reaches the top of the viewport (or a certain threshold)
        if (topOfMainContent <= 0) {
          setRightSectionSticky(true);
        } else {
          setRightSectionSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* Outer container for the full page scroll */}
      <div className="p-8">
        {/* Main content grid. Use a ref to track its position. */}
        <div ref={mainContentRef} className="grid grid-cols-8 w-full gap-4">
          {/* Section 1 - Left column */}
          <div className="col-span-6 overflow-auto">
            <Banner />
            <Recommendations />
            <Updates />
          </div>

          {/* Section 2 - Right column */}
          <div
            className={`col-span-2 text-black ${rightSectionSticky ? 'sticky top-0 h-screen' : ''}`}
          >
            {/* Add a wrapper div to ensure the sticky behavior works correctly */}
            <div className={`flex flex-col h-full ${rightSectionSticky ? 'overflow-y-auto' : ''}`}>
              <div className="rounded-lg bg-white shadow-md px-3 py-5 ">
                <p className="text-black font-[Rubik] font-medium text-base">
                  Let's Get the Ball Rolling
                </p>
                <div className="flex justify-between mt-5">
                  <p className="text-black font-[Rubik] font-medium text-sm">
                    18 Sept, Thrusday
                  </p>
                  <p className="text-black font-[Rubik] font-medium text-xl">
                    01:36:17
                  </p>
                </div>
                <div className="h-1 bg-gray-200 rounded mt-4"></div>
                <div className="flex justify-between mt-5">
                  <div className="flex">
                    <PiBuildingsThin className="h-5 w-5" />
                    <p className="text-gray-500 font-[Rubik] font-medium text-sm ml-1">
                      01:36:17
                    </p>
                  </div>
                  <p className="text-gray-500 font-[Rubik] font-medium text-sm">
                    01:36:17
                  </p>
                </div>
                <p className="text-gray-500 font-[Rubik] font-normal text-xs mt-5">
                  Shift: 09:00 - 18:30
                </p>
              </div>
              <div className="rounded-lg bg-white shadow-md px-3 py-5 mt-3">
                <div className="flex justify-between">
                  <p className="text-black font-[Rubik] font-medium text-base ">
                    Request
                  </p>
                  <div className="flex justify-center">
                    <p className="text-gray-600 font-[Rubik] font-medium text-base mr-5">
                      View All
                    </p>
                    <RxDotsVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="grid grid-cols-8 w-full gap-4 mt-5">
                  <div className="col-span-4 p-3 rounded-md bg-[#f9f2ff] h-full pt-5">
                    <LuCalendarArrowUp className="w-6 h-6" />
                    <p className="text-sm font-[Rubik] text-black font-medium my-5">
                      Apply Leave
                    </p>
                  </div>
                  <div className="col-span-4 p-3 rounded-md bg-[#ebfafb] h-full pt-5">
                    <TiFlowChildren className="w-6 h-6" />
                    <p className="text-sm font-[Rubik] text-black font-medium my-5">
                      Initiate Flow
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-8 w-full gap-4 mt-3">
                  <div className="col-span-4 p-3 rounded-md bg-[#fff5e9] h-full pt-5">
                    <CgNotes className="w-6 h-6" />
                    <p className="text-sm font-[Rubik] text-black font-medium my-5">
                      Request Letter
                    </p>
                  </div>
                  <div className="col-span-4 p-3 rounded-md bg-[#fff8e5] h-full pt-5">
                    <GoGoal className="w-6 h-6" />
                    <p className="text-sm font-[Rubik] text-black font-medium my-5">
                      Add Goal / Key Result Area
                    </p>
                  </div>
                </div>
              </div>
              <Events  />
              {/* <div className="rounded-lg bg-white shadow-md px-3 py-4 mt-3 shadow-md">
                <p className="text-black font-[Rubik] font-medium text-base">
                  Events
                </p>
                <div className="p-2">
                  <div className="flex border-b border-gray-300">
                    <button
                      onClick={() => setActiveTab("Leave")}
                      className={`px-4 py-2 transition-colors duration-300 font-[Rubik] text-black text-sm ${
                        activeTab === "Leave" ? "border-b-2 border-[#005DAC] font-medium" : "font-normal"
                      }`}
                    >
                      Leave
                    </button>
                    <button
                      onClick={() => setActiveTab("Birthdays")}
                      className={`px-4 py-2 transition-colors duration-300 font-[Rubik] text-black text-sm ${
                        activeTab === "Birthdays" ? "border-b-2 border-[#005DAC] font-medium" : "font-normal"
                      }`}
                    >
                      Birthdays
                    </button>
                    <button
                      onClick={() => setActiveTab("Anniversaries")}
                      className={`px-4 py-2 transition-colors duration-300 font-[Rubik] text-black text-sm ${
                        activeTab === "Anniversaries" ? "border-b-2 border-[#005DAC] font-medium" : "font-normal"
                      }`}
                    >
                      Anniversaries
                    </button>
                  </div>
                  {activeTab === "Leave" ? (
                    <div className="mt-4 p-4 flex flex-col items-center">
                      <img src={Image.working} className="w-50 object-contain" alt="Working" />
                      <p className="transition-all duration-300 font-[Rubik] font-normal text-sm text-center px-5 text-gray-600">
                        Team at its strongest! No one's on leave today!
                      </p>
                    </div>
                  ) : activeTab === "Birthdays" ? (
                    <div className="mt-4 p-4 flex flex-col items-center">
                      <img src={Image.birthday} className="w-40 object-contain" alt="Birthday" />
                      <p className="transition-all duration-300 font-[Rubik] font-normal text-sm text-center px-5 text-gray-600 mt-2">
                        No Birthdays to celebrate. Spark joy in other ways!
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 p-4 flex flex-col items-center">
                      <img src={Image.trophy} className="w-40 object-contain" alt="Trophy" />
                      <p className="transition-all duration-300 font-[Rubik] font-normal text-sm text-center px-5 text-gray-600 mt-2">
                        No anniversaries today. Exciting milestones are ahead!
                      </p>
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
