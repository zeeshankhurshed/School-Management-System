import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavigaton = () => {
  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div className="flex item-center gap-2 p-4">
            <img src="/admin.png" alt="Admin" className='h-14' />
            <span className="font-semibold text-lg">Admin</span>
        </div>
        <hr className='my-3'/>
        <ul className="flex flex-col gap-4 p-4">
            <li>
                <NavLink to={'/adminDashboard'}>
                    AdminDashboard
                </NavLink>
            </li>
            <li>
                <NavLink to={'/adminDashboard/users'}>
                    Users List
                </NavLink>
            </li>
            <li>
                <NavLink to={'/adminDashboard/classesList'}>
                    Classes List
                </NavLink>
            </li>
            <li>
                <NavLink to={'/adminDashboard/createStudent'}>
                   Create Student
                </NavLink>
            </li>
            <li>
                <NavLink to={'/adminDashboard/createTeacher'}>
                    Create Teacher
                </NavLink>
            </li>
            <li>
                <NavLink to={'/adminDashboard/createSubject'}>
                    Create Subject
                </NavLink>
            </li>
            {/* <li>
                <NavLink to={'/adminDashboard/createFee'}>
                    Create Fee
                </NavLink>
            </li> */}
        </ul>
      </div>
    </div>
  );
}

export default AdminNavigaton;
