import React, { useState } from 'react';

import { FiCalendar } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteEventsMutation, useGetAllEventsQuery, useUpdateEventsMutation } from '../../redux/api/blog';

const EventList = () => {
  const { data, isLoading, error } = useGetAllEventsQuery();
  const [updateEvent] = useUpdateEventsMutation();
  const [deleteEvent] = useDeleteEventsMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Local state to track which event is being edited
  const [editingId, setEditingId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Failed to load events. Please try again later.</div>;
  }

  // Access the actual array inside the data object
  const events = data?.data || [];

  // Check if events is an array
  if (!Array.isArray(events)) {
    return <div>No events available.</div>;
  }

  // Handle the delete action
  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  // Handle the update action
  const handleUpdate = async (id) => {
    try {
      await updateEvent({ id, updatedEvent: editedEvent });
      toast.success('Event updated successfully');
      setEditingId(null); // Exit edit mode
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  // Handle editing field changes
  const handleChange = (e, field) => {
    setEditedEvent({ ...editedEvent, [field]: e.target.value });
  };

  // Reset fields to the original values
  const handleReset = () => {
    setEditedEvent({
      title: events.find((event) => event._id === editingId).title,
      description: events.find((event) => event._id === editingId).description,
      date: events.find((event) => event._id === editingId).date,
      location: events.find((event) => event._id === editingId).location,
      image: events.find((event) => event._id === editingId).image,
    });
  };

  return (
    <div className="event-list p-4">
      <h2 className="text-2xl font-bold mb-4">Event List</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="group event-card border rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg bg-white"
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-50 object-cover rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105"
              />
            )}

            <div className="event-details">
              <h3 className="text-lg font-semibold">
                {editingId === event._id ? (
                  <input
                    type="text"
                    value={editedEvent.title || event.title}
                    onChange={(e) => handleChange(e, 'title')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  event.title
                )}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FiCalendar />
                {editingId === event._id ? (
                  <input
                    type="date"
                    value={editedEvent.date || event.date.split('T')[0]}
                    onChange={(e) => handleChange(e, 'date')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  new Date(event.date).toLocaleDateString()
                )}
              </p>

              <p className="text-sm text-gray-700 mt-2">
                {editingId === event._id ? (
                  <textarea
                    value={editedEvent.description || event.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  event.description && event.description.length > 100
                    ? `${event.description.substring(0, 100)}...`
                    : event.description || 'No description available'
                )}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {editingId === event._id ? (
                  <input
                    type="text"
                    value={editedEvent.location || event.location}
                    onChange={(e) => handleChange(e, 'location')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  `Location: ${event.location}`
                )}
              </p>

              {editingId === event._id ? (
                <input
                  type="text"
                  value={editedEvent.image || event.image}
                  onChange={(e) => handleChange(e, 'image')}
                  className="w-full p-2 rounded-md border mt-2"
                  placeholder="Image URL"
                />
              ) : null}

              <div className="flex justify-around items-center">
                {userInfo.isAdmin && (
                  <>
                    <button
                      className="bg-red-500 text-white p-3 rounded-md text-sm mt-2 uppercase"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>

                    {editingId === event._id ? (
                      <>
                        <button
                          className="bg-blue-500 text-white p-3 rounded-md text-sm mt-2 uppercase"
                          onClick={() => handleUpdate(event._id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white p-3 rounded-md text-sm mt-2 uppercase"
                          onClick={handleReset}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-green-500 text-white p-3 rounded-md text-sm mt-2 uppercase"
                        onClick={() => {
                          setEditingId(event._id);
                          setEditedEvent({
                            title: event.title,
                            description: event.description,
                            date: event.date,
                            location: event.location,
                            image: event.image,
                          });
                        }}
                      >
                        Update
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
