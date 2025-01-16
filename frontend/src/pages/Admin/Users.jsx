import React from 'react';
import { useGetUsersQuery } from '../../redux/api/user';

const Users = () => {
  const { data, isLoading, isError, error } = useGetUsersQuery();

  if (isLoading) {
    return <div className="text-center">Loading users...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <h1 className="text-2xl font-bold mb-6 ">Users</h1>
      {data && data.length > 0 ? (
        <div className="max-w-[85%]">
          <div className="grid grid-cols-4 font-bold mb-2 text-left underline">
            <div>Username</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
          </div>
          {data.map((user) => (
            <div key={user._id} className="grid grid-cols-4 py-2">
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
              <div>{user.isAdmin ? 'Admin' : 'User'}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No users found.</div>
      )}
    </div>
  );
};

export default Users;
