import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import './styles.css'
import { getPost, getPostBySearch } from '../../actions/posts'
import ClipLoader from "react-spinners/ClipLoader";
import Comments from '../Comments/Comments'

export default function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post])

  if (!post) return null;

  const recommendedPost = posts.filter(({ _id }) => _id !== post._id)

  const openPost = (_id) => navigate(`/posts/${_id}`)

  return (
    <div className='post-details'>
      {
        isLoading ? (<div className='loader'><ClipLoader size={50} /></div>) : (
          <div className='post-detail-wrapper'>
            <div className='post-details-info'>
              <div className='post-details-body'>
                <h2 className='post-detail-title'>{post.title}</h2>
                <div className='post-detail-tags'>
                  {
                    post.tags.map((tag, idx) => (
                      <div className='post-detail-link' key={`${tag}${idx}`}>
                        {` #${tag} `}
                      </div>))
                  }
                </div>
                <div className='post-detail-message'>{post.message}</div>
                <h4 className='post-detail-creator'>{`Created By: ${post.name}`}</h4>
                <div className='post-detail-time'>{moment(post.createdAt).fromNow()}</div>
                <Comments post={post}/>
              </div>
              <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt="image" className="post-detail-image" />
            </div>
            {
              recommendedPost.length>0 ? (
                <div className='recommendation'>
                  <h3 className='recommendation-head'>You might also like:</h3>
                  <div className='recommended-posts'>
                    {
                      recommendedPost.map(({ title, message, name, likes, selectedFile, _id }) => (
                        <div className='recommended-post' onClick={() => openPost(_id)} key={_id}>
                          <h3 className='recommendation-title'>{title}</h3>
                          <div className='recommendation-name'>{`By: ${name}`}</div>
                          <div className='recommendation-message'>{message}</div>
                          <div className='recommendation-likes'>Likes: {likes.length}</div>
                          <img className='recommendation-image' src={selectedFile}/>
                        </div>
                        
                      ))
                    }
                  </div>
                </div>
              ) : <></>
            }
          </div>)
      }

    </div>
  )
}
