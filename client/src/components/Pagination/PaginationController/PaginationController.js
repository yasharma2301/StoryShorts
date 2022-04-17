import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

export default function PaginationController({left, to}) {
  return (
    <Link className='link' to={to}>
      <div className='page-controller'>{left?'<':'>'}</div>
    </Link>
  )
}
