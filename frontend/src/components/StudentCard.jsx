
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentCard = ({ student, classes, results }) => {
  console.log("studentcard:",results);
  
  const { userInfo } = useSelector((state) => state.auth);

  // Get the class list and match the student class
  const classList = classes?.all || [];
  const studentClass = classList.find((cls) => cls._id === student.schoolClass);
  const className = studentClass ? studentClass.name : 'Not Assigned';

  const studentResult = results.find((res) => res?.studentId === student?._id) || null;
  // console.log("studentResult:", studentResult);
  
  
  
  const performanceCategory = studentResult?.performanceCategory || 'Not Available';
  const averageMarks = studentResult?.averageMarks || 'N/A';
  const obtainedMarks = studentResult
    ? studentResult.subjects.reduce((acc, subject) => acc + (subject?.marks || 0), 0)
    : 'N/A';
  const totalMarks = studentResult?.totalMarks || 'N/A';



  return (
    <div
      key={student._id}
      className={`relative group border rounded-lg shadow-lg h-[40rem] mx-2 `}
    >
      {/* <div
      key={student._id}
      className={`relative group m-4 border rounded-lg shadow-lg h-[42rem] 
        ${highlightCard ? 'border-green-500' : 'border-gray-300'}
      `}
    > */}
      {/* Student Image */}
      <img
        src={student.photo}
        alt={student.name}
        className="w-full rounded-t-lg object-cover transition duration-300 ease-in-out transform group-hover:opacity-50 h-[18rem] "
      />

      {/* Class Info Section */}
      <div>
        <h2 className="mt-4 font-extralight px-2">Class Info:</h2>
        <div className="grid grid-cols-2  items-center px-2">
          <p className="font-semibold text-sm flex gap-1 items-center">
            Roll Number: <span className="capitalize text-xs font-light">{student.rollNumber}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Section: <span className="capitalize text-xs font-light">{student.section}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Class: <span className="capitalize text-xs font-light">{className}</span>
          </p>
          {userInfo ? (
            <Link to={`/studentsDashboard/studentsList`} className="flex justify-center mt-2">
              <button className="bg-teal-800 text-white p-2 w-28 text-sm rounded-md">
                Fee Detail
              </button>
            </Link>
          ) : null}

        </div>
      </div>

      {/* Personal Info Section */}
      <div>
        <h2 className="mt-4 font-extralight px-2">Personal Info:</h2>
        <div className="grid grid-cols-2 items-center px-2">
          <p className="font-semibold text-sm flex gap-1 items-center">
            Name: <span className="capitalize text-xs font-light">{student.fullName}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Gender: <span className="capitalize text-xs font-light">{student.gender}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Guardian: <span className="capitalize text-xs font-light">{student.guardianName}</span>
          </p>
          {userInfo ?(
            <Link to="/studentsDashboard/studentsList" className="flex justify-center mt-2">
            <button className="bg-teal-800 text-white p-2 w-28 text-sm rounded-md">
              Student Detail
            </button>
          </Link>
          ):null}
          
        </div>
      </div>

      {/* Student Result Section */}
      <div>
        <h2 className="mt-4 font-extralight px-2">Student Result Info:</h2>
        <div className="grid grid-cols-2 items-center px-2">
          <p className="font-semibold text-sm flex gap-1 items-center">
            Performance: <span className="capitalize text-xs font-light">{performanceCategory}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Avg Marks: <span className="capitalize text-xs font-light">{averageMarks}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Obt/T.Marks: <span className="capitalize text-xs font-light">{obtainedMarks}/{totalMarks}</span>
          </p>
          {userInfo ? (
            <Link to="/studentsDashboard/StudentResult" className="flex justify-center mt-2">
            <button className="bg-teal-800 text-white p-2 w-28 text-sm rounded-md">
              Result Detail
            </button>
          </Link>
          ):null}
          
        </div>
      </div>

      {/* Student Fee Info Section */}
      <div>
        {/* <h2 className="mt-4 font-extralight px-2">Student Fee Info:</h2> */}
        {/* <div className="flex justify-between items-center px-2">
          <p className="font-semibold text-sm flex gap-1 items-center">
            Performance: <span className="capitalize text-xs font-light">{performanceCategory}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Avg Marks: <span className="capitalize text-xs font-light">{averageMarks}</span>
          </p>
          <p className="font-semibold text-sm flex gap-1 items-center">
            Obt/Total Marks: <span className="capitalize text-xs font-light">{obtainedMarks}/{totalMarks}</span>
          </p>
        </div> */}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 items-center gap-2 mx-2 mt-2">
        {/* <Link to="/studentsDashboard/studentsList" className="flex justify-center mt-2">
          <button className="bg-teal-800 text-white p-2 w-28 text-sm rounded-md">
            Student Detail
          </button>
        </Link> */}
        {/* <Link to="/studentsDashboard/StudentResult" className="flex justify-center mt-2">
          <button className="bg-teal-800 text-white p-2 w-28 text-sm rounded-md">
            Result Detail
          </button>
        </Link> */}


      </div>
    </div>
  );
};

export default StudentCard;
