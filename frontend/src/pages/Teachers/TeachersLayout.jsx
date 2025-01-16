import React from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import TeachersNavigation from './TeachersNavigation';

const TeachersLayout = () => {
  // const {userInfo}=useSelector((state)=>state.auth);
  // if(!userInfo || userInfo.role !=='admin'){
  //   return <Navigate to={'/login'}/>
  // }
  return (
    <div className='flex flex-col md:flex-row items-start'>
      <nav className="w-full md:w-1/4 lg:w-1/5 shadow-md p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Teachers Navigation</h2>
      <TeachersNavigation/>
      </nav>

      <main className="w-full md:w-3/4 lgw-4/5 shadow-md">
      <Outlet/>
      </main>
      
    </div>
  );
}

export default TeachersLayout;
