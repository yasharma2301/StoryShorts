import React, { useState, useRef } from 'react'
import './styles.css'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'
import TextBox from '../TextBox/TextBox'
import Button from '../Button/Button'
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

export default function Comments({ post }) {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const commentsRef = useRef();
    const [isLoading, setLoading] = useState(false)

    const handleComment = async () => {
        if(comment === ''){
            toast.error('Comment cannot be empty')
            return;
        }
        setLoading(true)
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);
        setLoading(false)
        commentsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
          });
    };

    return (
        <div className='comments-wrapper'>
            <div className='comment-seaction'>Comment Section</div>
            <div className='comments'>
                <div className='comment-area'>
                    {
                        comments.map((comment, idx) => (
                            <div className='comment' key={idx} >
                                <strong>{comment?.split(': ')[0]}</strong>
                                {comment?.split(':')[1]}
                            </div>
                        ))
                    }
                    <div ref={commentsRef} />
                </div>
                {
                    user?.result?.name ? (
                        <div className='comment-box'>
                            <div className='comment-head'>Write a Comment:</div>
                            <TextBox rows="5" value={comment} onChange={(e) => setComment(e.target.value)} />
                            {
                                isLoading ? (<ClipLoader />) : (<Button name="Comment" onClick={handleComment} />)
                            }
                        </div>
                    ) : <div>Login to add comments</div>
                }
            </div>
        </div>
    )
}
