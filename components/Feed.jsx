'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};


const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [search_posts, setSearch_posts] = useState([]);

  
  useEffect(() => {
    const fetchPosts = async () =>{
      const response=await fetch('/api/prompt');
      const data = await response.json();
      
      setPosts(data);
    }
    
    fetchPosts();
    
  }, [])
  
  const handleSearchChange = (e) => {
    const text=e.target.value;
    setSearchText(text);

    if(e.target.value){
      const filtered_posts = posts.filter(post => 
        (post.creator.username.toLowerCase().includes(text.toLowerCase()) || 
        post.creator.email.includes(text.toLowerCase()) || 
        post.prompt.toLowerCase().includes(text.toLowerCase()) || 
        post.tag.toLowerCase().includes(text.toLowerCase()))
      );
      setSearch_posts(filtered_posts);
    }
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const filtered_posts = posts.filter(post => post.tag.toLowerCase().includes(tagName.toLowerCase()));

    setSearch_posts(filtered_posts);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      
      {searchText ? (
        <PromptCardList
          data={search_posts}
          handleTagClick={handleTagClick}
        />
      ):(
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
      
    </section>
  )
}

export default Feed