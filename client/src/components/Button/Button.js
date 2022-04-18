import React from 'react'
import './styles.css'

export default function Button({onClick, name, backgroundColor, type, disabled}) {
  return (
    <button onClick={onClick} style={{backgroundColor: `${backgroundColor}`}} className={disabled?'disabled':"btn"} type={type} >
        {name}
    </button>
  )
}
