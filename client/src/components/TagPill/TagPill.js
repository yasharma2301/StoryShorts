import React from 'react'
import './styles.css'

export default function TagPill({tagName, onDelete}) {
  return (
    <div className='tag-pill'>
        <div>{tagName}</div>
        <div onClick={onDelete} className='clear'>
            <div>x</div>
        </div>
    </div>
  )
}
