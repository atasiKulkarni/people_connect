import { HiOutlinePhoto } from "react-icons/hi2";
import { Image } from "../../../../utility/Image";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineQuestion } from "react-icons/ai";
  export const RecondationsData = [
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

  export const createPostData = [
    {
      name: "Express In Pictures",
      icon: <HiOutlinePhoto className="w-6 h-6" color="blue" />,
    },
    {
      name: "Share Epic Reads",
      icon: <GrAttachment className="w-6 h-6" color="purple" />,
    },
    {
      name: "Ask The Forum",
      icon: <AiOutlineQuestion className="w-6 h-6" color="red" />,
    },
  ];