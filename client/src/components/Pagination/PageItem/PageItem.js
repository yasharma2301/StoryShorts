import React from 'react'
import './styles.css'

export default function PageItem({pageNumber, onClick}) {
  return (
    <div className='page-item' onClick={onClick}>{pageNumber}</div>
  )
}
