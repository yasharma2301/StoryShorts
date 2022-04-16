import React from 'react'
import './styles.css'

export default function Button({onClick, name, backgroundColor, type, disabled}) {
  return (
    <button onClick={onClick} style={{backgroundColor: `${backgroundColor}`}} disabled={disabled} type={type} >
        {name}
    </button>
  )
}
