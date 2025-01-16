import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery, useGetAllSchoolNewsQuery } from "../redux/api/blog";

const BlogSection = () => {
  const { data: schoolNewsData, isLoading: isSchoolNewsLoading, error: isSchoolNewsError } = useGetAllSchoolNewsQuery();
  const { data: eventsData, isLoading: isEventsLoading, error: isEventsError } = useGetAllEventsQuery();

  const combinedData = [
    ...(schoolNewsData?.data || []),
    ...(eventsData?.data || []),
  ];

  if (isSchoolNewsLoading || isEventsLoading) {
    return <div>Loading...</div>;
  }

  if (isSchoolNewsError || isEventsError) {
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold text-center my-8">School Blog</h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={3} // Default slides per view
        breakpoints={{
          375: { slidesPerView: 1 }, // 1 slide on small screens
          768: { slidesPerView: 2 }, // 2 slides on medium screens
          1024: { slidesPerView: 3 }, // 3 slides on large screens
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay]}
        className="my-swiper"
      >
        {combinedData.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="blog-card border rounded-lg shadow-md overflow-hidden h-80">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                  {item.category}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="text-center my-8 text-gray-600 text-xs md:text-sm">
        For further details about the different activities and guidance, please visit{" "}
        <Link to="/blog" className="underline text-blue-500 font-bold text-sm md:text-2xl">
          Blog Page
        </Link>
      </p>
    </div>
  );
};

export default BlogSection;