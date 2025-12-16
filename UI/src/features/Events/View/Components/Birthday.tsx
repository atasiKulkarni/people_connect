import { Image } from "../../../../utility/Image";
import { getInitials } from "../../../../utility/Initials";
import type { EventItem } from "../../model/EventModel";
import style from "../../style/Event.module.css";
interface LeaveProps {
  data: EventItem[];
}
export const Birthday: React.FC<LeaveProps> = ({ data }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div>
      {data.length > 0 ? (
        data.map((event) => (
          <div className={style.birthdayContainter}>
            <div className="flex items-center ml-3">
              {event.profile_picture ? (
                <img
                  src={`${baseUrl}${event.profile_picture}`}
                  alt={event.first_name}
                  className="h-10 w-10 object-cover rounded-full"
                />
              ) : (
                <div className="bg-[#b4e3f0] rounded-full h-12 w-12  flex items-center justify-center">
                   <div className="bg-gray-100 rounded-full h-9 w-9 flex items-center justify-center">
                  <p className="font-[Runik] text-sm font-semibold text-[#005dac]">
                    {getInitials(`${event.first_name} ${event.last_name}`)}
                  </p>
                </div>
                </div>
              )}
            </div>
            <div className="ml-2 content-center justify-center p-2">
              <p className="font-[Rubik] font-medium text-base text-[#005dac]">
                {event.first_name} {event.last_name}
              </p>
              <p className="font-[Rubik] font-normal text-sm text-[#53a4da]">
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
