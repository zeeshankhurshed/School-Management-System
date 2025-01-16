import { motion } from 'framer-motion';
import { useGetAllTeachersQuery } from '../redux/api/teacher';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const colorVariants = {
  initial: { color: "#000" },
  animate: {
    color: ["#000", "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#000"],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const TeachersTestimonials = () => {
  const { data, isLoading, isError } = useGetAllTeachersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load teachers' testimonials.</div>;
  }

  const teachers = data?.teachers; // Access the teachers array from the API response

  if (!teachers || teachers.length === 0) {
    return <div>No teachers found.</div>;
  }

  return (
    <div>
     <h2 className="text-center text-sm md:text-2xl uppercase font-extrabold my-12 italic">
        <motion.span
          variants={colorVariants}
          initial="initial"
          animate="animate"
        >
          Teachers
        </motion.span>{" "}
        <motion.span
          variants={colorVariants}
          initial="initial"
          animate="animate"
        >
          Testimonials
        </motion.span>
      </h2>
      <div className="container mx-auto">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper-testimonials"
        >
          {teachers.map((teacher) => (
            <SwiperSlide
              key={teacher._id}
              className="swiper-slide bg-light pt-5 shadow-lg"
            >
              <div className="p-4 my-8 text-center">
                <div className="flex justify-center">
                  <img
                    src={teacher.profilePicture}
                    alt={`${teacher.name}'s profile`}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3 className="mt-4 font-bold">{teacher.name}</h3>
                <p className="text-sm text-gray-500 italic">
                  {teacher.qualification.join(", ")}
                </p>
                <p className="text-sm">Subjects: {teacher.subject.join(", ")}</p>
                <p className="text-sm">Experience: {teacher.experience} years</p>
                <p className="text-sm text-gray-600">{teacher.contactNumber}</p>
                <p className="text-sm text-gray-600">{teacher.email}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TeachersTestimonials;

