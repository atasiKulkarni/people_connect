import { Image } from "../../../../utility/Image";
import type { EventItem } from "../../model/EventModel"; 

interface LeaveProps {
  data: EventItem[]; 
}

export const Leave: React.FC<LeaveProps> = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        data.map((eventItem) => ( // 3. Map over the correctly named array
  
          <div key={eventItem.email}>
            {eventItem.first_name} is on leave today.
          </div>
        ))
      ) : (
        <div className="mt-4 p-4 flex flex-col items-center">
          <img
            src={Image.working}
            className="w-50 object-contain"
            alt="Working"
          />
          <p className="transition-all duration-300 font-[Rubik] font-normal text-sm text-center px-5 text-gray-600">
            Team at its strongest! No one's on leave today!
          </p>
        </div>
      )}
    </div>
  );
};
