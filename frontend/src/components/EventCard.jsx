import { FiCalendar, FiMapPin } from "react-icons/fi";

const EventCard = ({ event }) => (
    <div className="group event-card border rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <h4 className="text-lg font-semibold">{event.title}</h4>
      <p className="text-sm text-gray-500 flex items-center gap-2">
        <FiCalendar />
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 flex items-center gap-2">
        <FiMapPin />
        {event.category}
      </p>
      <p className="text-sm text-gray-700 mt-2">
        {event.subtitle.length > 80
          ? `${event.subtitle.substring(0, 80)}...`
          : event.subtitle}
      </p>
    </div>
  );
  

export default EventCard;
