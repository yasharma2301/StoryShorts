import React, { useEffect } from 'react'
import './styles.css'
import PaginationController from './PaginationController/PaginationController'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Pagination() {
  const query = useQuery()
  const page = query.get('page') || 1
  const dispatch = useDispatch()
  const { totalPages } = useSelector((state) => state.posts)

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <div className="pagination">
      <PaginationController to={`/posts?page=${Number(page) === 1 ? Number(page) : Number(page) - 1}`} left={true} />
      <div>{`Page ${Number(page) || 1} / ${totalPages || 1}`}</div>
      <PaginationController left={false} to={`/posts?page=${Number(page) === Number(totalPages) ? Number(page) : Number(page) + 1}`} />
    </div>
  )
}
