import React, { useState, useEffect } from 'react'
import './styles.css'
import Button from '../Button/Button'
import TextInput from '../TextInput/TextInput'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

export default function Form({ currentId, setCurrentId }) {

  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postData.title === '' || postData.message === '' || postData.selectedFile === '' || postData.tags === '')
      return;
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }

  if(!user?.result?.name){
    return (
      <div className="form form-message">
        Please Sign in to create or like a story.
      </div>
    );
  }

  return (
    <form className='form' autoComplete='off' noValidate onSubmit={handleSubmit}>
      <h3 className='heading'>{`${currentId ? 'Edit the ' : 'Create a '}Story`}</h3>
      <TextInput placeholder='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextInput>
      <TextInput placeholder='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextInput>
      <TextInput placeholder='Tags (comma separated)' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}></TextInput>
      <div className='file-input'>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
      </div>
      <Button name='Submit' type='submit' backgroundColor='#404EED'></Button>
      <Button name='Clear' backgroundColor='#ff5252' onClick={clear}></Button>
    </form>
  )
}
