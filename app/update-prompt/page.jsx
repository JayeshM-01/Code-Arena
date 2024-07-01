'use client'

import { useState,useEffect } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id')
//   console.log(postId);
  // console.log(session?.user.email);
  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt:'',
    tag:'',
  });

  useEffect(()=>{
    const getPromptDetails = async() =>{
        const response = await fetch(`/api/prompt/${postId}`);
        const data = await response.json();

        setPost({
            prompt:data.prompt,
            tag: data.tag,
        })

    }

    if(postId) getPromptDetails();
  },[postId])

  const updatePrompt = async(e) => {
    e.preventDefault();
    setsubmitting(true);

    if(!postId) return alert("Prompt Id Not Found");

    try {
        const response = await fetch(`/api/prompt/${postId}`,
            {
              method:'PATCH',
              body: JSON.stringify({
                prompt:post.prompt,
                tag:post.tag,
              })
            })
    
    
            if(response.ok){
              router.push('/');
            }
        } catch (error) {
          console.log(error);
        } finally{
          setsubmitting(false);
        }
      }

  return (
    <Form 
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt;