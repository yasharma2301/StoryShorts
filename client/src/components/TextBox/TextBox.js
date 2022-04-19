import React from 'react'
import './styles.css'

export default function TextBox({value, onChange, label, placeholder, rows, background}) {
  return (
    <textarea className='textarea' style={{backgroundColor: `${background}`}} rows={rows} value={value} onChange={onChange} placeholder={placeholder} label={label}/>
  )
}
