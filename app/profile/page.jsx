'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react'

import Profile from '@components/Profile'

const MyProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {

    const fetchPosts = async () =>{
      const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        // console.log(session.user.id);
        // console.log(9);
        setPosts(data);
    }

    if(session?.user.id)fetchPosts();
    
  }, [session?.user.id]);

// console.log(session?.user.id);

  const handleEdit = (post) =>{
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
        name='My'
        desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile



// 'use client'

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import React, { useState, useEffect } from 'react';
// import Profile from '@components/Profile';

// const MyProfile = () => {
//   const { data: session, status } = useSession();
//   const [posts, setPosts] = useState([]);
  
//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (session?.user.id) {
//         const response = await fetch(`/api/users/${session.user.id}/posts`);
//         const data = await response.json();
//         console.log(session.user.id);
//         setPosts(data);
//       }
//     };

//     if (status === 'authenticated') {
//       fetchPosts();
//     }
//   }, [session, status]);
//   console.log(session?.user.email);
//   const handleEdit = () => {
//     // Handle edit logic here
//   };

//   const handleDelete = async () => {
//     // Handle delete logic here
//   };

//   return (
//     <Profile
//       name="My"
//       desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
//       data={posts}
//       handleEdit={handleEdit}
//       handleDelete={handleDelete}
//     />
//   );
// };

// export default MyProfile;
