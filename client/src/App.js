import React from 'react'
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import './index.css'
import Auth from './components/Auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {


    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/auth' exact element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;