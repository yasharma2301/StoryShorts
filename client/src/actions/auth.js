import * as api from '../api'
import { AUTH } from '../constants/actionTypes';
import { toast } from 'react-toastify';

export const signin = (form, navigate) => async (dispatch) => {
    // api.signIn(form).then(res => console.log(res)).catch(err => console.log(err.response))
    try {
        const { data } = await api.signIn(form);
        dispatch({ type: AUTH, data });
        navigate('/'  , { replace: true })
    } catch (err) {
        toast.error(err.response.data.message || 'Something went wrong');
    }
}

export const signup = (form, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(form);
        dispatch({ type: AUTH, data });
        navigate('/'  , { replace: true })
    } catch (err) {
        toast.error(err.response.data.message || 'Something went wrong');
    }
}