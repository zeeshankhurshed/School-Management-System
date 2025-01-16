import React from 'react';
import { useDeleteHighlightMutation, useGetAllHighlightsQuery } from '../../redux/api/blog';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const HighlightsList = () => {
    const { data, isLoading, error } = useGetAllHighlightsQuery();
    // console.log("data:", data);
    
    const [deleteHighlights] = useDeleteHighlightMutation();

    if (isLoading) {
        return <div><Loader /></div>;
    }

    if (error) {
        return <div>Failed to load highlights. Please try again later.</div>;
    }

    const highlightsItems = data?.data || [];

    if (!Array.isArray(highlightsItems)) {
        return <div>No highlights available.</div>;
    }

    const handleDelete = async (id) => {
        try {
            await deleteHighlights(id);
            toast.success("Highlight deleted successfully");
        } catch (error) {
            toast.error('Failed to delete highlight');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='p-4'>
            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {highlightsItems.map((item) => (
                    <div key={item._id} className="group border rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg bg-white">
                        <h3 className="font-bold">
                            <span>{item.name}</span> - <span>{item.achievement}</span>
                        </h3>
                        <p className='text-xs text-gray-500'>{item.description}</p>
                        <p className='text-sm font-semibold text-gray-700'>
                            Created At: {formatDate(item.createdAt)}
                        </p>
                        <button
                            className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HighlightsList;
