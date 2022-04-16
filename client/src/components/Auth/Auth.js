import React, { useEffect, useState } from 'react'
import TextInput from '../TextInput/TextInput';
import './styles.css'
import { GoogleLogin } from 'react-google-login'
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignup] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = (e) => {
        e.preventDefault()
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp && (form.firstName == '' || form.lastName == '' || form.email == '' || form.password == '' || form.confirmPassword == '')) {
            return;
        } else if(!isSignUp && (form.email == '' || form.password == '')){
            return;
        }
        if (isSignUp) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(signin(form, navigate));
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const googleFailure = () => {
        console.log('Google Sign in failed. Try again later!')
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="auth-container">
            <div className="wrapper">
                <div className="auth-header">{isSignUp ? 'Sign up' : 'Sign in'}</div>
                <form className="inputs" onSubmit={handleSubmit}>
                    {
                        isSignUp && (
                            <>
                                <TextInput placeholder='First Name *' name="firstName" onChange={handleChange}></TextInput>
                                <TextInput placeholder='Last Name *' name="lastName" onChange={handleChange}></TextInput>
                            </>
                        )
                    }
                    <div className="span-2">
                        <TextInput type='email' placeholder='Email *' name="email" onChange={handleChange}></TextInput>
                    </div>
                    <div className="span-2">
                        <TextInput type='password' placeholder='Password *' name="password" onChange={handleChange}></TextInput>
                    </div>
                    {
                        isSignUp && (
                            <div className="span-2">
                                <TextInput type='password' placeholder='Confirm Password *' name="confirmPassword" onChange={handleChange}></TextInput>
                            </div>
                        )
                    }
                    <div className="span-2">
                        <Button name={isSignUp ? 'Sign up' : 'Sign in'}></Button>
                    </div>


                    {
                        !isSignUp && (
                            <GoogleLogin
                                clientId='827240924909-ob80f6qrqp5aqk91923pqu39bdgdvppg.apps.googleusercontent.com'
                                render={(renderProps) => (
                                    <div className="span-2">
                                        <Button
                                            name={'Google Auth'}
                                            backgroundColor='#ff5252'
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        />
                                    </div>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                        )
                    }
                    <div className="toggle-behavior span-2">
                        <div className="text">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                        </div>
                        <span>
                            <Button name={isSignUp ? 'Sign in' : "Sign Up"} onClick={switchMode}></Button>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Auth