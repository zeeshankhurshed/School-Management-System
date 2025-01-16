import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { LuClipboardPen } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";

const About = () => {
  const [countOn, setCountOn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Section in view! Triggering counters.");
            setCountOn(true);
          }
        });
      },
      { threshold: 0.1 } // Adjusted for better triggering
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const counters = [
    { label: "Total Students", value: 2000 },
    { label: "Total Teachers", value: 150 },
    { label: "Graduates", value: 5000 },
    { label: "Years of Excellence", value: 20 },
    { label: "Library Books", value: 10000 },
    { label: "Awards Won", value: 100 },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/about.jpeg"
            alt="About Us"
            className="rounded shadow-lg w-full h-auto"
          />
        </div>

        {/* Right: Counters */}
        <div className="md:w-1/2 text-center md:text-start">
          <h2 className="text-xl md:text-3xl font-bold mb-6">About Us</h2>
          <p className="text-gray-700 mb-8 text-xs md:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Proin aliquet, ipsum eget eleifend accumsan, libero arcu
            interdum nulla, vitae cursus justo arcu at justo.
          </p>

          {/* Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {counters.map((counter, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow rounded text-center"
              >
                {countOn && (
                  <CountUp
                    start={0}
                    end={counter.value}
                    duration={2}
                    delay={0.5}
                    className="text-4xl font-bold text-black"
                  />
                )}
                <p className="text-gray-600 mt-2">{counter.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <section className="py-12 bg-gray-50 my-12">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-2xl text-gray-800">Our Popular Labs</h2>
          <p className="text-sm text-gray-600 my-6 w-3/4 md:w-1/2 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, ducimus!
            Repudiandae quidem quo enim eos reiciendis similique ut reprehenderit
            numquam!
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center group">
            <img
              src="/chemistry-lab.jpeg"
              alt="Chemistry Lab"
              className="rounded-lg shadow-lg w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-bold text-xl text-center mt-4">Chemistry Lab</span>
          </div>

          <div className="flex flex-col items-center group">
            <img
              src="/bio-lab.jpeg"
              alt="Biology Lab"
              className="rounded-lg shadow-lg w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-bold text-xl text-center mt-4">Biology Lab</span>
          </div>

          <div className="flex flex-col items-center group">
            <img
              src="/computer-lab.jpeg"
              alt="Computer Lab"
              className="rounded-lg shadow-lg w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-bold text-xl text-center mt-4">Computer Lab</span>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-3 md:p-0">
          <div>
          <h2 className="text-xl font-bold md:text-2xl text-gray-800">Why Choose Our Institution</h2>
            <p className="text-xs md:text-sm text-gray-600 leading-5 md:leading-8 mt-5 text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni et neque, explicabo ut vitae eos reprehenderit rem illum atque. Soluta earum totam eius vitae necessitatibus veniam sunt repudiandae temporibus quae? Fugiat commodi rem modi neque similique adipisci ratione, expedita, quidem illum aliquid voluptatibus laborum non error. Nostrum esse repellat velit, molestias officiis aperiam illum veniam quo, tempore voluptas cum? Libero iste ipsa quae nihil optio minima repudiandae dolorum! Culpa provident mollitia reiciendis dolore et? Itaque velit sunt placeat aperiam molestias vero commodi, non dicta. Id, porro quae ullam eum illo quas commodi atque, aperiam obcaecati, ratione repellendus blanditiis. Voluptates, minus!</p>
          </div>
          <div>
            <iframe
              width="560"
              height="315"
              className="rounded-lg"
              src="https://www.youtube.com/embed/NIk1-ck4c6Q?si=Ahc2j0V0lmhMB3dh"
              title="Why Choose Us Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

          </div>
        </div>
      </section>


      <section>
        <div className="w-4/5 m-auto flex flex-col md:flex-row justify-between items-center gap-10 mt-20">

          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-green-600 text-4xl"><LuClipboardPen /></p>
            <h6 className="py-3 font-bold text-sm">Quick Learning</h6>
            <p className="text-gray-500 text-sm leading-7">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam officia veniam repellat modi reiciendis, cupiditate blanditiis voluptates voluptatum dolores.</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-green-600 text-4xl"><IoDocumentsOutline /></p>
            <h6 className="py-3 font-bold text-sm">All Time Support</h6>
            <p className="text-gray-500 text-sm leading-7">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam officia veniam repellat modi reiciendis, cupiditate blanditiis voluptates voluptatum dolores.</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-green-600 text-4xl"><GrCertificate /></p>
            <h6 className="py-3 font-bold text-sm">Certification</h6>
            <p className="text-gray-500 text-sm leading-7">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam officia veniam repellat modi reiciendis, cupiditate blanditiis voluptates voluptatum dolores.</p>
          </div>

        </div>
      </section>
    </section>

    
  );
};

export default About;
