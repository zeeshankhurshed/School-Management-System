import React from "react";
import { useGetAllFunContentQuery } from "../../redux/api/blog";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const FunInteractiveContent = () => {
  const { data, isLoading, error } = useGetAllFunContentQuery();

  if (isLoading) return <p><Loader /></p>;
  if (error) return <p>Error loading data....</p>;

  const funContent = data?.data || [];
  const quizes = funContent.filter((item) => item.type === "Quiz");
  const puzzles = funContent.filter((item) => item.type === "Puzzle");
  const specialDays = funContent.filter((item) => item.type === "Special Day");
  const trivias = funContent.filter((item) => item.type === "Trivia");

  return (
    <div className="fun-interactive-content px-6 py-8 bg-gray-100 rounded-lg shadow-lg my-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-xl md:text-4xl font-bold text-gray-800">Fun & Interactive Content</h1>
        <p className="text-sm md:text-lg text-gray-600">
          Dive into puzzles, quizzes, trivia, and celebrate special days with us!
        </p>
      </header>

      {/* Content Sections */}
      <div className="space-y-10 grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Puzzles Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Puzzles</h2>
          {puzzles.length > 0 ? (
            <div className=" ">
              {puzzles.map((puzzle) => (
                <div key={puzzle._id} className="p-6 border border-gray-200 rounded-md shadow-md hover:bg-gray-100 transition duration-200">
                  <h3 className="text-lg font-semibold text-gray-900">{puzzle.title}</h3>
                  <p className="text-gray-700">
                    {puzzle.description}{" "}
                    <Link to={puzzle.link || `/puzzle/${puzzle._id}`} className="text-blue-500 hover:underline">
                      Play now!
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No puzzles available right now.</p>
          )}
        </section>

        {/* Trivia Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Trivia</h2>
          {trivias.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-xs md:text:xl">
              {trivias.map((trivia) => (
                <li key={trivia._id}>
                  {trivia.description}{" "}
                  {trivia.link && (
                    <Link to={trivia.link} className="text-blue-500 hover:underline">
                      Learn more
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No trivia available right now.</p>
          )}
        </section>

        {/* Quizzes Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Quizzes</h2>
          {quizes.length > 0 ? (
            <div className=" gap-2">
              {quizes.map((quiz) => (
                <div key={quiz._id} className="p-6 border border-gray-200 rounded-md shadow-md hover:bg-gray-100 transition duration-200">
                  <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                  <p className="text-gray-700">
                    {quiz.description}{" "}
                    <Link to={quiz.link || `/quiz/${quiz._id}`} className="text-blue-500 hover:underline">
                      Take the quiz!
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No quizzes available right now.</p>
          )}
        </section>

        {/* Special Days Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Special Days</h2>
          {specialDays.length > 0 ? (
            <div className=" gap-2">
              {specialDays.map((specialDay) => (
                <div key={specialDay._id} className="p-6 border border-gray-200 rounded-md shadow-md hover:bg-yellow-100 transition duration-200">
                  <h3 className="text-lg font-semibold text-gray-900">{specialDay.title}</h3>
                  <p className="text-gray-700">
                    {specialDay.description}{" "}
                    <Link to={specialDay.link || `/special-days/${specialDay._id}`} className="text-blue-500 hover:underline">
                      Learn more
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No special days content available right now.</p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Explore more fun activities in our{" "}
          <Link to="#" className="text-blue-500 hover:underline">
            blog section
          </Link>.
        </p>
      </footer>
    </div>
  );
};

export default FunInteractiveContent;
