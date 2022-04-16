import React from 'react'
import './styles.css'

export default function TextInput({ placeholder, value, onChange, name, type, onKeyDown }) {
  return (
    <input name={name} onKeyDown={onKeyDown} className='text-field' type={type ? type : 'text'} placeholder={placeholder} value={value} onChange={onChange} />
  )
}
