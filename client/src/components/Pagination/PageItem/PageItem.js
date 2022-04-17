import React from 'react'
import './styles.css'

export default function PageItem({pageNumber, onClick, disabled}) {
  return (
    <div className={disabled?'page-item disabled':'page-item'} onClick={onClick}>{pageNumber}</div>
  )
}
