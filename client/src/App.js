import React from 'react'
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import './index.css'
import Auth from './components/Auth/Auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path='/' exact element={<Navigate replace to="/posts"/>} />
                <Route path='/posts' exact element={<Home />} />
                <Route path='/posts/search' exact element={<Home />} />
                <Route path='/posts/:id' exact element={<PostDetails />} />
                <Route path='/auth' exact element={!user ? <Auth /> : <Navigate replace to="/posts"></Navigate>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;