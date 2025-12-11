import { Image } from "../../../../utility/Image";
import type { EventItem } from "../../model/EventModel";
import style from "../../style/Event.module.css";
interface LeaveProps {
  data: EventItem[];
}
export const Birthday: React.FC<LeaveProps> = ({ data }) => {
  console.log("birthday_today-->", data);
  return (
    <div>
      {data.length > 0 ? (
        data.map((event) => (
          <div className={style.birthdayContainter}>
             <img
            src={Image.birthday}
            className="w-20 object-contain"
            alt="Birthday"
          />
          <div className="ml-2">
          <p className="transition-all duration-300 font-[Rubik] font-normal text-sm  text-gray-600 mt-2">
          {event.first_name}  {event.last_name} 
          </p>
          <p className="transition-all duration-300 font-[Rubik] font-normal text-sm   text-gray-600 mt-2">
          {event.designation} 
          </p>
          </div>
        

          </div>
        ))
      ) : (
        <div className="mt-4 p-4 flex flex-col items-center">
          <img
            src={Image.birthday}
            className="w-40 object-contain"
            alt="Birthday"
          />
          <p className="transition-all duration-300 font-[Rubik] font-normal text-sm text-center px-5 text-gray-600 mt-2">
            No Birthdays to celebrate. Spark joy in other ways!
          </p>
        </div>
      )}
    </div>
  );
};
