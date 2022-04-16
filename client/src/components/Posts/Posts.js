import React from 'react'
import Post from './Post/Post'
import './styles.css'
import { useSelector } from 'react-redux'

export default function Posts({setCurrentId}) {
  const posts = useSelector((state) => state.posts)

  return (
    !posts.length ? <div></div> : (
      <div className='posts'>
        {posts.map((post) => (
          <Post setCurrentId={setCurrentId} post={post} key={post._id}/>
        ))}
      </div>)
  )
}
