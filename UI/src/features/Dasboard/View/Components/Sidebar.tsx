import { CiSearch } from "react-icons/ci";
import { Image } from "../../../../utility/Image";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

interface SidebarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ setIsOpen }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
 const sidebarRef = useRef<HTMLDivElement>(null);

  const moreApps = [
    { name: "Dashboard", image: Image.dashboard, navigate: "/dashboard" },
    { name: "Employee", image: Image.employee, navigate: "/employee" },
    { name: "Engage", image: Image.engage, navigate: "/engage" },
    { name: "Timesheet", image: Image.timesheet, navigate: "/dashboard" },
    { name: "Compensation", image: Image.compensation, navigate: "/dashboard" },
    { name: "Recruitment", image: Image.recruitment, navigate: "/dashboard" },
    {
      name: "Time Management",
      image: Image.timeManagement,
      navigate: "/dashboard",
    },
    { name: "Company Policies", image: Image.companyPolicy, navigate: "/dashboard" },
    { name: "Hr Document", image: Image.companyPolicy, navigate: "/dashboard" },
    { name: "Events", image: Image.events, navigate: "/dashboard" },
    {
      name: "Rewards & Recognition",
      image: Image.reward,
      navigate: "/dashboard",
    },
    { name: "Chatbot", image: Image.chatbot, navigate: "/dashboard" },
  ];


  const filteredMoreApps = moreApps.filter((moreApps) =>
    moreApps.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div
      className="fixed top-0 left-0 h-full w-full sm:w-[450px] bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col p-[25px]"
      ref={sidebarRef}
    >
      
      <div>
        <div className="col-span-3 text-black flex items-center border border-[#005DAC] w-full rounded-md p-3 h-10 content-center">
          <CiSearch className="w-6 h-6 " color="gray" />
          <input
            type="text"
            placeholder="Search App"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full ml-3 placeholder-gray-500 focus:outline-none text-sm text-gray-500"
          />
        </div>

        <h3 className="text-black font-[Rubik] text-sm font-semibold my-5">
          All Apps
        </h3>
        <div className=" grid grid-cols-8 w-full gap-4">
          {filteredMoreApps.map((item) => (
            <Link to={item.navigate} className="col-span-2 w-15 cursor-pointer"  onClick={() => setIsOpen(false)} key={item.name}>
              <div className=" rounded-lg w-full h-15 content-center border border-gray-200 p-2">
                <img
                  src={item.image}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-black font-[Rubik] text-xs font-normal mt-1 text-center">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
