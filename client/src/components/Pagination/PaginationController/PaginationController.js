import React from 'react'
import './styles.css'

export default function PaginationController({left}) {
  return (
    <div className='page-controller'>{left?'<':'>'}</div>
  )
}
