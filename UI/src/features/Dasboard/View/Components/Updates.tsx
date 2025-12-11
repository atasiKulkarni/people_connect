import { Image } from "../../../../utility/Image";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
export const Updates = () => {
  const [show, setShow] = useState(false);
    const navigation = useNavigate();
    
  const getStyledTitle = (title: string) => {
    if (!title) return null;

    // Regex to find and capture any name that follows "wishes"
    const nameRegex = /wishes (.*?) a very/i;
    const nameMatch = title.match(nameRegex);
    const dynamicName = nameMatch ? nameMatch[1] : null;

    if (!dynamicName) {
      return title;
    }

    // Use the extracted name to split the string
    const regex = new RegExp(`(People Connect|${dynamicName})`);
    const parts = title.split(regex);

    return parts.map((part, index) => {
      switch (part) {
        case "People Connect":
          return (
            <span key={index} className="font-semibold text-black">
              {part}
            </span>
          );
        case dynamicName:
          return (
            <span key={index} className="text-blue-500">
              {part}
            </span>
          );
        default:
          return part;
      }
    });
  };
  const RecondationsData = [
    {
      title: "People Connect wishes Nyra Pakhare a very Happy Birthday",
      time: "10 hours ago",
      subTitle: "Join us in sending warm wishes to them on this special day!",
      image: Image.birthdayWish,
    },
    {
      title: "People Connect wishes Ayushi Kulkarni a very Happy Birthday",
      time: "10 hours ago",
      subTitle: "Important Update",
      image: Image.anniversaryWish,
    },
    {
      title: "People Connect wishes Elisha Das a very Happy Work Anniversary",
      time: "10 hours ago",
      subTitle: "",
      image: Image.birthdayWish,
    },
    {
      title: "People Connect wishes Dinna Das a very Happy Work Anniversary",
      time: "10 hours ago",
      subTitle: "",
      image: Image.anniversaryWish,
    },
  ];

  const [likedStates, setLikedStates] = useState(
    new Array(RecondationsData.length).fill(false)
  );
  const [commentStates, setCommentStates] = useState(
    new Array(RecondationsData.length).fill(false)
  );

  const handleLike = (index: number) => {
    setLikedStates((prevLikedStates) => {
      const newLikedStates = [...prevLikedStates];
      newLikedStates[index] = !newLikedStates[index];
      return newLikedStates;
    });
  };

  const handleComment = (index: number) => {
    setShow(true);
    setCommentStates((prevLikedStates) => {
      const newCommentStates = [...prevLikedStates];
      newCommentStates[index] = !newCommentStates[index];
      return newCommentStates;
    });
  };
  const SendWishes = () => {
    setShow(false);
  };
  const ViewAllUpdates = () => {
    navigation("/engage");
  }
  return (
    <div className="rounded-lg py-3 w-full">
      <div className="flex w-full justify-between bg-white p-3 rounded-lg">
        <p className=" text-black font-[Rubik] font-medium text-xl">Updates</p>

        <p className=" text-[#005DAC] font-[Rubik] font-medium text-base cursor-pointer" onClick={ViewAllUpdates}>
          View All Updates
        </p>
      </div>

      <div className="grid grid-cols-8 w-full gap-4 h-full">
        {RecondationsData.map((item, index) => (
          <div
            key={index}
            className="col-span-4 mt-3 flex-none  [box-shadow:0_0_12px_0px_rgba(0,0,0,0.1)] 
              h-full w-full min-w-[200px] rounded-lg pt-5 bg-white"
          >
            <div className="flex px-5">
              <img
                src={Image.announcement}
                className="w-10 h-10 object-contain"
              />
              <div className="ml-4 ">
                <p className="text-black font-[Rubik] font-normal text-base items-center">
                  {getStyledTitle(item.title)}
                </p>

                <p className="text-gray-400 font-[Rubik] font-medium text-xs ">
                  {item.time}
                </p>
              </div>
            </div>
            <div className="px-5">
              <div className="w-full h-100 mt-5 rounded-lg content-center items-center bg-blue-300 ">
                <img
                  src={item.image}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <p className="text-black font-[Rubik] font-normal text-sm my-5 px-5">
              {item.subTitle}
            </p>
            <div className=" border-b border-gray-300 mt-2"></div>
            <div className="flex w-full justify-between">
              <div
                className="relative group cursor-pointer"
                onClick={() => handleLike(index)}
              >
                <div className="flex text-black font-[Rubik] font-normal text-sm mt-5 px-5">
                  {likedStates[index] ? (
                    <FaHeart
                      className="w-6 h-6 transition-colors duration-300 group-hover:text-blue-500"
                      style={{ color: "red" }}
                    />
                  ) : (
                    <IoIosHeartEmpty className="w-6 h-6 transition-colors duration-300 group-hover:text-blue-500" />
                  )}
                </div>
                {/* Tooltip content with arrow */}
                <div className="absolute left-1/2 top-12 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap bg-[#005DAC] text-xs text-white px-2 py-1 rounded z-10 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:border-4 after:border-solid after:border-transparent after:border-t-[#005DAC]">
                  Like
                </div>
              </div>

              <div
                className="relative group cursor-pointer"
                onClick={() => handleComment(index)}
              >
                <div className="flex text-black font-[Rubik] font-normal text-sm mt-5 px-5">
                  <LiaBirthdayCakeSolid className="w-6 h-6 transition-colors duration-300 group-hover:text-blue-500" />
                </div>
                <div className="absolute left-5 top-12 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap bg-[#005DAC] text-xs text-white px-2 py-1 rounded z-10 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:border-4 after:border-solid after:border-transparent after:border-t-[#005DAC]">
                  Send wishes
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW POP UP TO SEND WISHES */}
      {show && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <IoMdClose className="w-5 h-5 object-contain" />
            </button>
            <div className="">
              <p className="text-[#005DAC] font-[Rubik] text-lg font-medium">
                Let's Send Some Wishes !
              </p>
              <div className="flex w-full justify-between items-center mt-2">
                <input
                  type="text"
                  placeholder="Send Birthday Wishes.."
                  className="w-full placeholder-gray-400 focus:outline-none text-sm text-gray-600 border border-gray-300 rounded p-2"
                />
                <div className="bg-[#005DAC] w-10 h-10 rounded-full content-center justify-items-center ml-3 p-2">
                  <RiSendPlaneFill
                    onClick={SendWishes}
                    className="w-6 h-6 "
                    color="white"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
