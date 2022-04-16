import React from 'react'
import './styles.css'
import { Navigate } from 'react-router-dom'
import PageItem from './PageItem/PageItem'
import PaginationController from './PaginationController/PaginationController'

export default function Pagination({page}) {
  
  return (
    <div className="pagination">
      <PaginationController left={true}/>
      <PageItem pageNumber={1}/>
      <PageItem pageNumber={2}/>
      <PageItem pageNumber={3}/>
      <PageItem pageNumber={4}/>
      <PaginationController left={false}/>
    </div>
  )
}
