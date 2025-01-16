import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import AdminNavigaton from './AdminNavigaton';
import TransitionProvider from '../../components/TansitionProvider';

const AdminLayout = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    if(!userInfo || userInfo.role !=='admin'){
        return <Navigate to='/login'/>
    }
  return (
    <div className='flex flex-col md:flex-row items-start'>
      <nav className="w-full md:w-1/4 lg:w-1/5  shadow-md p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Admin Navigation</h2>
      <AdminNavigaton/>
      </nav>

      <main className='w-full md:w-3/4 lg:w-4/5 shadow-md'>
      <TransitionProvider>
      <Outlet/>
      </TransitionProvider>
      </main>
    </div>
  );
}

export default AdminLayout;
