import React  from 'react'
import { BsActivity } from 'react-icons/bs';
import { HiOutlinePhoto } from 'react-icons/hi2'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
type MenuItemName = "All Posts" | "My Activity" | "Saved Post";
interface MenuProps {
  activeItem: MenuItemName;
  setActiveItem: (item: MenuItemName) => void;
}

export const Menu: React.FC<MenuProps> = ({ activeItem, setActiveItem }) => {

    
      const handleItemClick = (itemName: MenuItemName) => {
        setActiveItem(itemName);
      };
    
      // Function to determine which classes to apply based on the active state
      const getClasses = (itemName: MenuItemName) => {
        const baseClasses =
          "flex flex-row items-center py-3 px-5 cursor-pointer transition-colors duration-150";
    
        if (activeItem === itemName) {
          // Classes for the active item
          return `${baseClasses} bg-[#F1F8FF] border-l-2 border-blue-500`;
        } else {
          // Classes for inactive items
          return `${baseClasses} bg-white border-l-2 border-transparent`;
        }
      };

  return (
     <div className="col-span-2 w-full bg-white my-5 rounded-lg shadow-md h-100 ">
             <div className=" flex flex-col items-center px-5 pt-7">
               <div className="bg-gray-200 rounded-full w-15 h-15 items-center flex justify-center text-center ">
                 <p className="text-gray-800 font-[Rubik] font-medium text-xl text-center">
                   AK
                 </p>
               </div>
               <div className="border-b border-gray-200 w-full py-5">
                 <p className="text-black font-[Rubik] font-medium text-base text-center">
                   Atasi Kulkarni
                 </p>
                 <p className="text-black font-[Rubik] font-normal text-sm text-center ">
                   Associate Engineer I
                 </p>
                 <p className="text-black font-[Rubik] font-normal text-sm text-center ">
                   Engineering-RGB
                 </p>
                 <p className="text-gray-500 font-[Rubik] font-normal text-sm text-center ">
                   1004213
                 </p>
               </div>
             </div>
   
             <div className="mt-4">
               {/* All Posts Item */}
               <div
                 className={getClasses("All Posts")}
                 onClick={() => handleItemClick("All Posts")}
               >
                 <HiOutlinePhoto className="w-6 h-6" color="gray" />
                 <p className="text-gray-800 font-[Rubik] font-normal text-sm ml-2">
                   All Posts
                 </p>
               </div>
   
               {/* My Activity Item */}
               <div
                 className={getClasses("My Activity")}
                 onClick={() => handleItemClick("My Activity")}
               >
                 <BsActivity className="w-6 h-6" color="gray" />
                 <p className="text-gray-800 font-[Rubik] font-normal text-sm ml-2">
                   My Activity
                 </p>
               </div>
   
               {/* Saved Post Item */}
               <div
                 className={getClasses("Saved Post")}
                 onClick={() => handleItemClick("Saved Post")}
               >
                 <IoBookmarkOutline className="w-6 h-6" color="gray" />
                 <p className="text-gray-800 font-[Rubik] font-normal text-sm ml-2">
                   Saved Post
                 </p>
               </div>
             </div>
           </div>
  )
}
