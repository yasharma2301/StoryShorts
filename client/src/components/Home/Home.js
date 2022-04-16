import React, { useEffect, useState } from 'react'
import './styles.css'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';

function Home() {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <div className="container">
            <div className="content">
                <Posts setCurrentId={setCurrentId}></Posts>
                <aside className="right-panel">
                    <Search></Search>
                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                    <Pagination/>
                </aside>
            </div>
        </div>
    )
}

export default Home