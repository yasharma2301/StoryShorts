import React, { useState } from 'react'
import Button from '../Button/Button'
import TagPill from '../TagPill/TagPill'
import TextInput from '../TextInput/TextInput'
import './styles.css'

export default function Search() {

  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])


  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value)
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
      <Button name='Search' backgroundColor='#404EED'></Button>
    </div>
  )
}
