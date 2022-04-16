import React, { useEffect, useState } from 'react'
import './styles.css'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

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
                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                </aside>
            </div>
        </div>
    )
}

export default Home