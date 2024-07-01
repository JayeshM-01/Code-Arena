'use client'

import { useSession } from 'next-auth/react'
import { useParams, useRouter,useSearchParams } from 'next/navigation'
import React, { useState,useEffect } from 'react'

import Profile from '@components/Profile'

const UserProfile = ({params}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
//   const searchParams = useSearchParams();
  const path = params.id;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  
  useEffect(() => {

    const fetchPosts = async () =>{
      const response = await fetch(`/api/users/${path}/posts`);
        const data = await response.json();
        setPosts(data);
    }

    if(session?.user.id)fetchPosts();
    
  }, [session?.user.id]);


  useEffect(() => {

    const userData = async() =>{
        const response = await fetch(`/api/users/${path}`);
        const data = await response.json();
        // console.log(data);
        setUser(data);
      }
    
    if(path)userData();
    
  }, [path]);

  return (
    <Profile
        name={`${user?.username}'s`}
        desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
        data={posts}
    />
  )
}

export default UserProfile;
