import  { useEffect, useState } from "react";
import { Leave } from "../Components/Leave";
import { Birthday } from "../Components/Birthday";
import { WorkAnniversary } from "../Components/WorkAnniversary";
import type { AppDispatch } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../action/EventsAction";
import { selectEvent, selectEventStatus } from "../../slice/EventSlice";
import type { EventItem } from "../../model/EventModel";

export const Events = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("Leave");
  const eventList = useSelector(selectEvent) as { birthdays?: EventItem[]; anniversaries?: EventItem[]; leaves?: EventItem[] } | never;
   const status = useSelector(selectEventStatus);


    useEffect(() => {
      // Only dispatch if status is 'idle'
      if (status === "idle") {
        dispatch(fetchEvent());
      }
    }, [status, dispatch]);



    const leavesData = Array.isArray(eventList) ? eventList.map(event => event.leaves).flat() : [];
    const birthdayData = Array.isArray(eventList) ? [] : eventList?.birthdays || [];
    const anniversaryData = Array.isArray(eventList) ? [] : eventList?.anniversaries || [];
  return (
    <div className="rounded-lg bg-white shadow-md px-3 py-4 mt-3 shadow-md">
      <p className="text-black font-[Rubik] font-medium text-base">Events</p>
      <div className="p-2">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setActiveTab("Leave")}
            className={`px-4 py-2 transition-colors duration-300 font-[Rubik] text-black text-sm ${
              activeTab === "Leave"
                ? "border-b-2 border-[#005DAC] font-medium"
                : "font-normal"
            }`}
          >
            Leave
          </button>
          <button
            onClick={() => setActiveTab("Birthdays")}
            className={`px-4 py-2 transition-colors duration-300 font-[Rubik] text-black text-sm ${
              activeTab === "Birthdays"
                ? "border-b-2 border-[#005DAC] font-medium"
                : "font-normal"
            }`}
          >
            Birthdays
          </button>
          <button
            onClick={() => setActiveTab("Anniversaries")}
            className={`px-4 py-2 transition-colors duration-300 font-[Rubik] text-black text-sm ${
              activeTab === "Anniversaries"
                ? "border-b-2 border-[#005DAC] font-medium"
                : "font-normal"
            }`}
          >
            Anniversaries
          </button>
        </div>
        {activeTab === "Leave" ? (
           <Leave data={leavesData} />
        ) : activeTab === "Birthdays" ? (
          <Birthday data={birthdayData} />
        ) : (
          <WorkAnniversary data={anniversaryData} />
        )}
      </div>
    </div>
  );
};
