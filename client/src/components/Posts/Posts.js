import React, {useEffect} from 'react'
import Post from './Post/Post'
import './styles.css'
import { useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";

export default function Posts({setCurrentId}) {
  const { posts, isLoading } = useSelector((state) =>  state.posts);



  if (!posts?.length && !isLoading) return 'No posts';

  return (
    isLoading ? <div className='loader'><ClipLoader size={50} /></div>  : (
      <div className='posts'>
        {posts.map((post) => (
          <Post setCurrentId={setCurrentId} post={post} key={post._id}/>
        ))}
      </div>)
  )
}
