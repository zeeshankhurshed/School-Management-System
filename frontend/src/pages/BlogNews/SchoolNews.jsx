import React from "react";
import { useGetAllSchoolNewsQuery } from "../../redux/api/blog"; // Import your API query hook
import { FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";

const SchoolNews = () => {
  const { data, isLoading, error } = useGetAllSchoolNewsQuery(); // Fetch news from API

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

  return (
    <div className="school-news p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">School News</h2>
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
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <h4 className="text-md text-gray-600">{item.subtitle}</h4>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FiCalendar />
                {new Date(item.date).toLocaleDateString()}
              </p>
              <span className="text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded-full">
                {item.category}
              </span>
              <p className="text-sm text-gray-700 mt-2">
                {item.description && item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description || 'No description available'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Location: {item.location}</p>
              <button className="text-blue-500 text-sm mt-2">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolNews;
