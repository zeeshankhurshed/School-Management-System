import React from 'react';
import Marquee from 'react-fast-marquee';

const FeeReminder = () => {
  return (
    <section className='relative'>
    <div className="absolute top-0 text-white font-semibold py-2 w-full bg-red-800">
      <Marquee speed={50} gradient={false}>
        <div className="flex items-center">
          <h2 className="text-xs md:text-lg">
            <span>Please Submit your Fee before the 10th of each month!</span> {"   "}
            <span>!براے مہربارنی اپنے بچوں کی فیس ہر ماہ کی دس تاریخ سے پہلے ادا کریں شکریہ</span>
          </h2>
        </div>
      </Marquee>
    </div>
    </section>
  );
};

export default FeeReminder;
