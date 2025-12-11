import React,{useState} from "react";
import { Image } from "../../../../utility/Image";

export const Recommendations = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const RecondationsData = [
    {
      title: "Refer your best connections!",
      subTitle: "Explore 38 open jobs and help us discover talent",
      image: Image.birthday,
    },
    {
      title: "Ensure benefits for your loved ones",
      subTitle:
        "Add details of your Spouse to secure their benefits. Don't miss out!",
      image: Image.birthday,
    },
    {
      title: "Make your profile picture - perfect!",
      subTitle:
        "Showcase your personality with a unique picture and connect better!",
      image: Image.birthday,
    },
    {
      title: "Propel growth with ingishtful Feedback",
      subTitle:
        "Seek Feedback from your network every 90 days to maximize your growth",
      image: Image.birthday,
    },
  ];



  const handleMouseEnter = (index: number) => {
    setTimeout(() => {
      setHoveredIndex(index);
    }, 700);
  };

  const handleMouseLeave = () => {
 
       setHoveredIndex(null);
  };
  return (
    <div className="flex rounded-lg h-80 bg-white px-4 py-8 mt-3 shadow-md w-full gap-4 overflow-x-auto no-scrollbar">
      {/* Fixed-width title section */}
      <div className="flex-none px-2 content-center min-w-[200px] w-[200px]">
        <img src={Image.recommendation} className="w-50 h-50 object-contain" />
        <p className=" text-black font-[Rubik] font-medium text-2xl">
          Recommendations for You
        </p>
      </div>

      {/* Horizontally scrollable recommendations container */}
      <div className="flex-1 ml-10">
        <div className="flex w-max gap-5">
          {RecondationsData.map((item, index) => (
            <div
              key={index}
              className={`flex-none border [box-shadow:0_0_12px_0px_rgba(0,0,0,0.1)] 
              h-60 w-50 min-w-[200px] rounded-lg py-5 px-3 
              transform transition-transform duration-700 ease-in-out 
              hover:scale-110
                ${hoveredIndex === index ? 'border-blue-300' : ''}
               `}
               onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={item.image} className="w-10 h-10 object-contain" />
              <p className="text-black font-[Rubik] font-medium text-sm mt-3">
                {item.title}
              </p>
              <p className="text-black font-[Rubik] font-normal text-xs mt-3">
                {item.subTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
