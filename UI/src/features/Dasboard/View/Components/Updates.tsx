import { Image } from "../../../../utility/Image";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEngage,
  selectEngageStatus,
} from "../../../Engage/slice/EngageSlice";
import type { AppDispatch } from "../../../../redux/store";
import { getPost, toggleLike, toggleSave } from "../../../Engage/action/EnagageAction";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export const Updates = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigation = useNavigate();
  const engageList = useSelector(selectEngage);
  const status = useSelector(selectEngageStatus);

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

  const [likedStates, setLikedStates] = useState(
    new Array(engageList.length).fill(false)
  );
  const [commentStates, setCommentStates] = useState(
    new Array(engageList.length).fill(false)
  );

  console.log("commentStates-->", commentStates);
  const [saveStates, setSaveStates] = useState(
    new Array(engageList.length).fill(false)
  );
 
    const handleLike = (id: number) => {
   
      const numericId = Number(id); 
  
         dispatch(toggleLike(numericId))
            .unwrap()
            .then((response) => {
              console.log("display_liked status-->", response);
              setLikedStates(response.liked); 
           
            })
            .catch((err) => console.log("Error:", err));
  
    };
    
  const handleComment = (index: number) => {
    setShow(true);
    setCommentStates((prevLikedStates) => {
      const newCommentStates = [...prevLikedStates];
      newCommentStates[index] = !newCommentStates[index];
      return newCommentStates;
    });
  };
  const handleSave = (id: number) => {
    const numericId = Number(id);
    dispatch(toggleSave(numericId))
      .unwrap()
      .then((response) => {
        console.log("display_saved status-->", response);
        setSaveStates(response.liked);
      })
      .catch((err) => console.log("Error:", err));
  };

  const SendWishes = () => {
    setShow(false);
  };
  const ViewAllUpdates = () => {
    navigation("/home/engage");
  };

  useEffect(() => {
    // Only dispatch if status is 'idle'
    if (status === "idle") {
      dispatch(getPost());
    }
  }, [status, dispatch]);
  return (
    <div className="rounded-lg py-3 w-full">
      <div className="flex w-full justify-between bg-white p-3 rounded-lg">
        <p className=" text-black font-[Rubik] font-medium text-xl">Updates</p>

        <p
          className=" text-[#005DAC] font-[Rubik] font-medium text-base cursor-pointer"
          onClick={ViewAllUpdates}
        >
          View All Updates
        </p>
      </div>

      <div className="grid grid-cols-8 w-full gap-4 h-full">
        {engageList.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="col-span-4 mt-3 flex-none  [box-shadow:0_0_12px_0px_rgba(0,0,0,0.1)] 
              h-full w-full min-w-[200px] rounded-lg pt-5 bg-white"
          >
            <div className="flex px-5">
              {item.event_type === "Birthday" ||
              item.event_type === "Work Anniversary" ? (
                <img
                  src={Image.announcement}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <img src={Image.chatbot} className="w-10 h-10 object-contain" />
              )}

              <div className="ml-4 ">
                {item.event_type === "Birthday" ||
                item.event_type === "Work Anniversary" ? (
                  <div className="flex flex-row">
                    <p className="text-black font-[Rubik] font-medium text-base items-center ">
                      {getStyledTitle(item.created_by)}
                    </p>
                    <p className="text-black font-[Rubik] font-normal text-base items-center ml-1">
                      wishes
                    </p>
                    <p className="text-blue-600 font-[Rubik] font-normal text-base items-center ml-1">
                      {getStyledTitle(item.employee_name)}
                    </p>
                    <p className="text-black font-[Rubik] font-normal text-base items-center ml-1">
                      a very {getStyledTitle(item.title)}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    <p className="text-black font-[Rubik] font-medium text-base items-center">
                      {getStyledTitle(item.created_by)}
                    </p>
                    <p className="text-black font-[Rubik] font-normal text-base items-center ml-1">
                      shared a post
                    </p>
                  </div>
                )}

                <p className="text-gray-400 font-[Rubik] font-medium text-xs ">
                  {item.time_ago_display}
                </p>
              </div>
            </div>

            <div className="px-5 mt-3">
              <div className="w-full h-100 aspect-square rounded-lg content-center items-center bg-blue-300 ">
                <img
                  src={`${baseUrl}${item.image_url}`}
                  className="w-full h-full object-cover rounded-lg"
                  alt="Post content"
                />
              </div>
            </div>

            <p className="text-black font-[Rubik] font-normal text-sm my-5 px-5">
              {item.description}
            </p>
            <div className=" border-b border-gray-300 mt-2"></div>
            <div className="flex w-full justify-between">
              <div className="flex flex-row ">
                <div className="relative group cursor-pointer">
                  <div
                    className="flex text-black font-[Rubik] font-normal text-sm py-5 ml-5"
                    onClick={() => handleLike(item.id)}
                  >
                    {item.is_liked ? (
                      <FaHeart
                        className="w-6 h-6 transition-colors duration-300 group-hover:text-blue-500"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <IoIosHeartEmpty className="w-6 h-6 transition-colors duration-300 group-hover:text-blue-500" />
                    )}
                  </div>

                  <div className="absolute left-10 -top-3 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap bg-[#fff] text-xs text-black px-3 py-1 rounded z-10 shadow-lg">
                    Like
                  </div>
                </div>

                {item.event_type === "Birthday" ||
                  (item.event_type === "Work Anniversary" && (
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => handleComment(index)}
                    >
                      <div className="flex text-black font-[Rubik] font-normal text-sm py-5 px-4">
                        <LiaBirthdayCakeSolid className="w-6 h-6 transition-colors duration-300 group-hover:text-blue-500" />
                      </div>
                      <div className="absolute left-5 top-12 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap bg-[#005DAC] text-xs text-white px-2 py-1 rounded z-10 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:border-4 after:border-solid after:border-transparent after:border-t-[#005DAC]">
                        Send wishes
                      </div>
                    </div>
                  ))}
              </div>

              <div
                className="relative group cursor-pointer"
                onClick={() => handleSave(index)}
              >
                <div className="flex text-black font-[Rubik] font-normal text-sm p-5">
                  {item.is_saved ? (
                    <IoBookmark className="w-6 h-5 transition-colors duration-300 text-blue-500" />
                  ) : (
                    <IoBookmarkOutline className="w-6 h-5 transition-colors duration-300 group-hover:text-blue-500" />
                  )}
                </div>
                <div className="absolute left-4 -top-3 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap bg-[#fff] text-xs text-black px-3 py-1 rounded z-10 shadow-lg">
                  Bookmark
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW POP UP TO SEND WISHES */}
      {show && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
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
