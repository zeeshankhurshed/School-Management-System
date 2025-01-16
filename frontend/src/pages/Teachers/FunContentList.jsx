import React from 'react';
import { useDeleteFunContentMutation, useGetAllFunContentQuery } from '../../redux/api/blog';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FunContentList = () => {
    const {data,isLoading,error}=useGetAllFunContentQuery();
    const [deleteFunContent]=useDeleteFunContentMutation();

    if(isLoading){
        return <div><Loader/></div>
    }
    if(error){
        return <div>Failed to load Fun Content. Please try again later</div> 
    }

    const funContentItems=data?.data || [];
    
    if(!Array.isArray(funContentItems)){
        return <div>No Fun content available.</div>
    }

    const handleDelete=async(id)=>{
        try {
            await deleteFunContent(id);
            toast.success('Content deleted successfully');
        } catch (error) {
            toast.error("Failed to delete content");
        }
    }
    const formatDate=(dateString)=>{
        const options={year:'numeric', month:'long', day:'numeric'};
        return new Date(dateString).toLocaleDateString(undefined,options)
    }
  return (
    <div className='p-4'>
      <h2 className="text-2xl font-bold mb-4">Fun Content</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {funContentItems.map((item)=>(
            <div key={item._id} className="group border rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg bg-white">
                <h3 className="font-bold">
                    <span>{item.type}</span> - <span>{item.title}</span>
                </h3>
                <p className='text-sm text-gray-500'>{item.description}</p>
                <Link to={item.link} className='text-blue-500' target='_blank'>Take A Tour</Link>
                <p className="text-sm font-semibold text-gray-700">Created At:{formatDate(funContentItems.createdAt)}</p>
                <button className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600" onClick={()=>handleDelete(item._id)}>Delete</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default FunContentList;
