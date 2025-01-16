import React from "react";
import { Link } from "react-router-dom";

const ParentGuidance = () => {
  return (
    <div className="parent-guidance px-6 py-8 bg-gray-100 rounded-lg shadow-lg my-10">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-xl md:text-4xl font-bold text-gray-800">Parent Guidance</h1>
        <p className="text-sm md:text-lg text-gray-600">
          Supporting parents with tips, advice, and resources to foster children's growth and maintain balance.
        </p>
      </header>

      {/* Content */}
      <section className="academic-support mb-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700 ">Tips for Supporting Children Academically and Emotionally</h2>
        <ul className="text-sm md:text-lg list-disc list-inside text-gray-700 space-y-2">
          <li>Set aside dedicated time each day to help with homework or discuss school activities.</li>
          <li>Encourage open communication to understand and address emotional challenges.</li>
          <li>Create a positive study environment free of distractions.</li>
          <li>Praise effort over outcomes to build resilience and confidence.</li>
        </ul>
      </section>

      <section className="work-life-balance">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Work-Life Balance for Parents</h2>
        <p className="text-sm md:text-lg text-gray-700 mb-4">
          Balancing work and family can be challenging, but small changes can make a big difference. Here are some tips:
        </p>
        <ul className="text-sm md:text-lg list-disc list-inside text-gray-700 space-y-2">
          <li>Prioritize tasks using tools like to-do lists or scheduling apps.</li>
          <li>Set clear boundaries between work hours and family time.</li>
          <li>Involve children in household activities to spend quality time while completing chores.</li>
          <li>Make self-care a priority to recharge and maintain emotional well-being.</li>
        </ul>
      </section>

      {/* Call-to-Action */}
      <div className="cta mt-8 text-center">
        <p className="text-gray-600 text-sm md:text-lg">
          Have tips or stories to share?{" "}
          <Link to="/contact" className="text-xs md:text-sm text-blue-500 hover:underline">
            Let us know!
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Discover more articles on parenting in our{" "}
          <a href="/blogs" className="text-blue-500 hover:underline">
            blog section
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default ParentGuidance;

