import { Image } from "../../../../utility/Image";
import type { EventItem } from "../../model/EventModel";
interface LeaveProps {
  data: EventItem[];
}

export const WorkAnniversary: React.FC<LeaveProps> = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        data.map((event) => (
          // Render your leave item using leaveEvent.first_name, etc.
          <div key={event.email}>{event.first_name} have work anniversary today</div>
        ))
      ) : (
        <div className="mt-4 p-4 flex flex-col items-center">
          <img
            src={Image.trophy}
            className="w-40 object-contain"
            alt="Trophy"
          />
          <p className="transition-all duration-300 font-[Rubik] font-normal text-sm text-center px-5 text-gray-600 mt-2">
            No anniversaries today. Exciting milestones are ahead!
          </p>
        </div>
      )}
    </div>
  );
};
