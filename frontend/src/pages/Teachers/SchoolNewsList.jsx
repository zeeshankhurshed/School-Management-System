import React, { useState } from 'react';
import { useGetAllSchoolNewsQuery, useUpdateSchoolNewsMutation, useDeleteSchoolNewsMutation } from '../../redux/api/blog';
import { FiCalendar } from 'react-icons/fi'; // Make sure you import the icon
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SchoolNewsList = () => {
  const { data, isLoading, error } = useGetAllSchoolNewsQuery();
  const [updateSchoolNews] = useUpdateSchoolNewsMutation();
  const [deleteSchoolNews] = useDeleteSchoolNewsMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Local state to track which item is being edited
  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Failed to load news. Please try again later.</div>;
  }

  // Access the actual array inside the data object
  const newsItems = data?.data || [];

  // Check if newsItems is an array
  if (!Array.isArray(newsItems)) {
    return <div>No news available.</div>;
  }

  // Handle the delete action
  const handleDelete = async (id) => {
    try {
      await deleteSchoolNews(id);
      toast.success('News deleted successfully');
    } catch (error) {
      toast.error('Failed to delete news');
    }
  };

  // Handle the update action
  const handleUpdate = async (id) => {
    try {
      await updateSchoolNews({ id, updatedSchoolNews: editedItem });
      toast.success('News updated successfully');
      setEditingId(null); // Exit edit mode
    } catch (error) {
      toast.error('Failed to update news');
    }
  };

  // Handle editing field changes
  const handleChange = (e, field) => {
    setEditedItem({ ...editedItem, [field]: e.target.value });
  };

  // Reset fields to the original values
  const handleReset = () => {
    setEditedItem({
      title: newsItems.find((item) => item._id === editingId).title,
      description: newsItems.find((item) => item._id === editingId).description,
      date: newsItems.find((item) => item._id === editingId).date,
      location: newsItems.find((item) => item._id === editingId).location,
      image: newsItems.find((item) => item._id === editingId).image,
    });
  };

  return (
    <div className="school-news p-4">
      <h2 className="text-2xl font-bold mb-4">School News</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <div
            key={item._id} // Use _id as the key
            className="group news-card border rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg bg-white"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-50 object-cover rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105"
              />
            )}

            <div className="news-details">
              <h3 className="text-lg font-semibold">
                {editingId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.title || item.title}
                    onChange={(e) => handleChange(e, 'title')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  item.title
                )}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FiCalendar />
                {editingId === item._id ? (
                  <input
                    type="date"
                    value={editedItem.date || item.date.split('T')[0]} // Format to match input date
                    onChange={(e) => handleChange(e, 'date')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  new Date(item.date).toLocaleDateString()
                )}
              </p>

              <span className="text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded-full">
                {item.category}
              </span>

              <p className="text-sm text-gray-700 mt-2">
                {editingId === item._id ? (
                  <textarea
                    value={editedItem.description || item.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  item.description && item.description.length > 100
                    ? `${item.description.substring(0, 100)}...`
                    : item.description || 'No description available'
                )}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {editingId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.location || item.location}
                    onChange={(e) => handleChange(e, 'location')}
                    className="w-full p-2 rounded-md border"
                  />
                ) : (
                  `Location: ${item.location}`
                )}
              </p>

              {editingId === item._id ? (
                <input
                  type="text"
                  value={editedItem.image || item.image}
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
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>

                    {editingId === item._id ? (
                      <>
                        <button
                          className="bg-blue-500 text-white p-3 rounded-md text-sm mt-2 uppercase"
                          onClick={() => handleUpdate(item._id)}
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
                          setEditingId(item._id);
                          setEditedItem({
                            title: item.title,
                            description: item.description,
                            date: item.date,
                            location: item.location,
                            image: item.image,
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

export default SchoolNewsList;
