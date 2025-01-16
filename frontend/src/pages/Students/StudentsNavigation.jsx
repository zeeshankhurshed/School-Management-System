import { PiStudentBold } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

const StudentsNavigation = () => {
  return (
    <div className='flex flex-col justify-between h-full'>
    <div>
      <div className="flex items-center gap-2 p-4">
      <PiStudentBold className="text-5xl"/>
      <span className="font-semibold text-lg">Students</span>
      </div>
      <hr className="my-3" />
      <ul className="flex flex-col gap-4 p-4">
        <li>
          <NavLink to={'/studentsDashboard'}>Students Dashboard</NavLink>
        </li>
        <li>
          <NavLink to={'/studentsDashboard/studentsList'}>Students List</NavLink>
        </li>
        <li>
          <NavLink to={'/studentsDashboard/StudentResult'}>Students Result</NavLink>
        </li>
      
      </ul>
    </div>
  </div>
  );
}

export default StudentsNavigation;
