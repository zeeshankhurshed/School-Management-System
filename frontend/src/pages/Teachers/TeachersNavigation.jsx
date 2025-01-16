import { GiTeacher } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const TeachersNavigation = () => {
  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div className="flex items-center gap-2 p-4">
        <GiTeacher className="text-5xl"/>
        <span className="font-semibold text-lg">Teachers</span>
        </div>
        <hr className="my-3" />
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <NavLink to={'/teachersDashboard'}>Teachers Dashboard</NavLink>
          </li>
          <li>
          <NavLink to={'/teachersDashboard/teacherList'}>Teacher List</NavLink>
        </li>
        <h2 className="font-bold underline">Blog Section</h2>
          <li>
          <NavLink to={'/teachersDashboard/schoolNews'}>Create School News</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/schoolNewsList'}>School News List</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/events'}>Create Events</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/eventsList'}>Events List</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/academics'}>Create Academics</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/academicsList'}>Academics Lists</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/highlights'}>Create Highlights</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/highlightsList'}>Highlights List</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/funContent'}>Crete Fun Content</NavLink>
        </li>
          <li>
          <NavLink to={'/teachersDashboard/funContentList'}>Fun Content List</NavLink>
        </li>
        </ul>
      </div>
    </div>
  );
}

export default TeachersNavigation;
