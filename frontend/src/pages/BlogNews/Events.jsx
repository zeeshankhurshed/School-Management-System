import React from "react";

import { useGetAllEventsQuery } from "../../redux/api/blog";
import Loader from "../../components/Loader";
import EventCard from '../../components/EventCard';

const Events = () => {
  const { data, isLoading, error } = useGetAllEventsQuery();

  // console.log("Data:", data); // Debug API response

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error("Error:", error); // Debug API error
    return <div>Failed to load events. Please try again later.</div>;
  }

  const events = data?.data || [];
  // console.log("Events:", events); // Debug events array

  if (!Array.isArray(events) || events.length === 0) {
    return <div>No Events available.</div>;
  }

  // Separate upcoming and past events
  const currentDate = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= currentDate
  );
  const pastEvents = events.filter((event) => new Date(event.date) < currentDate);

  return (
    <div className="events-section p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Events</h2>

      {/* Upcoming Events */}
      <div className="upcoming-events mb-6">
        <h3 className="text-sm md:text-xl font-semibold mb-2">Upcoming Events</h3>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p>No upcoming events.</p>
          )}
        </div>
      </div>

      {/* Past Events */}
      <div className="past-events">
        <h3 className="text-sm md:text-xl font-semibold mb-2">Past Events</h3>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p>No past events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
