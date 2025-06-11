'use client';
import { useAuth, UserButton, useUser } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react';

const ProtectedPage = () => {
  // this is for server-side rendering
  //   const user = await currentUser();
  //   console.log('user', user);

  //  this is for client-side rendering
  const { userId } = useAuth();
  const { user } = useUser();

  return (
    <div>
      ProtectedPage
      <h1>
        <div>User : user</div>
        <div>User ID: {userId ? userId : 'No user found'}</div>
        <UserButton />
      </h1>
    </div>
  );
};

export default ProtectedPage;
