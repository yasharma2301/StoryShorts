import React, { useState, useEffect } from 'react'
import './styles.css';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import decode from 'jwt-decode';

export default function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispath = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  console.log(user)

  useEffect(() => {
    const token = user?.token;
    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime){
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const logout = () => {
    dispath({ type: 'LOGOUT' })
    setUser(null)
    navigate('/auth', { replace: true });
  }

  return (
    <div className="header">
      <Link to='/' className='text-link'>
        <div className="logo">
          <img className='logo-img' src={logo} alt='logo'></img>
          <div className='logo-text'>
            <h3 className='logo-head'>Story Shorts</h3>
            <h4 className='logo-sub'>Stories worth sharing!</h4>
          </div>
        </div>
      </Link>

      <div className="toolbar">
        {user ? (
          <div className="profile">
            {
              user?.result?.googleId ? (
                <img className='avatar-img' alt={" "} src={user.result.imageUrl} />
              ) : 
              (
                  <Avatar className='avatar-img-2' character={user.result.name.charAt(0)}></Avatar>
              )
            }
            
            <div className="userName">
              {user.result.name}
            </div>
            <Button name="Logout" onClick={logout} backgroundColor="#ff5252" />
          </div>
        ) : (
            <Button name="Login" onClick={() => {
              navigate('/auth', {replace: true})
            }} />
        )}
      </div>
    </div>
  )
}

