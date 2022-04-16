import React from 'react'
import { MdThumbUpAlt, MdDelete } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import './styles.css'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deletePost, likePost } from '../../../actions/posts'

export default function Post({ post, setCurrentId }) {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><MdThumbUpAlt className={user?.result ? 'post-icon like': 'post-icon like disable'} />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><MdThumbUpAlt className={user?.result ? 'post-icon like': 'post-icon like disable'} />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><MdThumbUpAlt className={user?.result ? 'post-icon like': 'post-icon like disable'} />&nbsp;Like</>;
  };

  return (
    <div className='post'>
      <img src={post.selectedFile} alt="image" className="post-image" />
      <div className="post-header">
        <h3 className="post-author">{post.name}</h3>
        <h4 className="post-date">{moment(post.createdAt).fromNow()}</h4>
      </div>
      {
        (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
        (<BsThreeDots className='post-edit' onClick={() => setCurrentId(post._id)} />)
      }

      <div className="story">
        <div className="post-tags">
          {post.tags.map((tag) => `#${tag} `)}
        </div>
        <div className="post-title">
          {post.title}
        </div>
        <div className="post-message">
          {post.message}
        </div>
        <div className="post-actions">
          <div className={user?.result ? 'action': 'action disable'} onClick={() => dispatch(likePost(post._id))} >
            <Likes></Likes>
          </div>
          {
            (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
            (<div className="action" onClick={() => dispatch(deletePost(post._id))}>
              <MdDelete className='post-icon delete' />
              <span>DELETE</span>
            </div>)
          }

        </div>
      </div>
    </div>
  )
}
