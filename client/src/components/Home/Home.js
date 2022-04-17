import React, { useEffect, useState } from 'react'
import './styles.css'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import { useLocation } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const query = useQuery()
    const searchQuery = query.get('query')
    const tags = query.get('tags') || ''

    const [currentId, setCurrentId] = useState(null)

    return (
        <div className="container">
            <div className="content">
                <Posts setCurrentId={setCurrentId}></Posts>
                <aside className="right-panel">
                    <Search></Search>
                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                    {(!searchQuery && !tags.length) && (<Pagination />)
                    }
                </aside>
            </div>
        </div>
    )
}

export default Home