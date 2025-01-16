import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StudentCard from "./StudentCard";

const SliderUtils = ({ students, classes, results }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4, // Add this line
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  

  return (
    <div className="overflow-hidden">
      <Slider {...settings} className="grid gap-4">
        {students && students.length > 0 ? (
          students.map((student) => (
            <StudentCard key={student._id} student={student} classes={classes} results={results} />
          ))
        ) : (
          <p>No Students available</p>
        )}
      </Slider>
    </div>
  );
};

export default SliderUtils;