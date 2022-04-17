import React, { useState } from 'react'
import Button from '../Button/Button'
import TagPill from '../TagPill/TagPill'
import TextInput from '../TextInput/TextInput'
import './styles.css'
import { getPostBySearch, getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Search() {

  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const searchPost = () => {
    if (search.trim() || tags.length>0) {
      dispatch(getPostBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      dispatch(getPosts(1))
      navigate('/posts', {replace:true})
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  const handleAdd = (e) => {
    if (e.target.value === '') {
      return
    }
    if (e.keyCode === 13) {
      if (!tags.includes(e.target.value)) {
        setTags([...tags, e.target.value])
      }
      e.target.value = ''
    }
  }

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

  return (
    <div className='search'>
      <div className='search-header'>Search Stories</div>
      <TextInput placeholder='Search Title' name='text' value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress}></TextInput>
      <TextInput placeholder={'Search by Tags'} onKeyDown={handleAdd}></TextInput>
      <div className='tags'>
        {tags.map((tag, idx) => {
          return <TagPill key={`${tag}${idx}`} tagName={tag} onDelete={(e) => handleDelete(tag)}></TagPill>
        })}
      </div>
      <Button name='Search' backgroundColor='#404EED' onClick={searchPost}></Button>
    </div>
  )
}
