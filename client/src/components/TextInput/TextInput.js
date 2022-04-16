import React from 'react'
import './styles.css'

export default function TextInput({ placeholder, value, onChange, name, type }) {
  return (
    <input name={name} className='text-field' type={type ? type : 'text'} placeholder={placeholder} value={value} onChange={onChange} />
  )
}
