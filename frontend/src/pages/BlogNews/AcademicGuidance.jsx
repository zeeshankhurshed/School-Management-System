import { Link } from 'react-router-dom';
import { useGetAllAcademicGuidanceQuery } from '../../redux/api/blog';
import Loader from '../../components/Loader';

const AcademicGuidance = () => {
  const { data, error, isLoading } = useGetAllAcademicGuidanceQuery();
  // console.log("data:", data);

  const academicGuidance = data?.data || [];

  if (isLoading) return <p><Loader /></p>;
  if (error) return <p>Error loading data....</p>;

  return (
    <div className="px-6 py-8 bg-gray-100 rounded-lg shadow-md my-10">
      {academicGuidance.map((guidance) => (
        <div key={guidance._id} className="mb-10">
          <header className="mb-8 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Academic Guidance</h2>
            <p className="text-sm md:text-lg text-gray-600">{guidance.title}</p>
          </header>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Recommended Reading or Learning Resources</h2>
            <ul className="resources list-disc list-inside text-gray-700 space-y-2">
              {guidance.resources.map((resource) => (
                <li key={resource._id}>
                  <Link 
                    to={resource.link} 
                    className="text-blue-600 hover:underline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Tips for Effective Learning</h2>
            <ul className="text-sm md:text-xl tips list-disc list-inside text-gray-700 space-y-2">
              {guidance.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8 text-center text-sm text-gray-500">
            <p>
              Have your own tips to share?{' '}
              <Link to="/contact" className="text-blue-600 hover:underline">Contact us!</Link>
            </p>
          </section>
        </div>
      ))}
    </div>
  );
};

export default AcademicGuidance;
