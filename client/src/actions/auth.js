import * as api from '../api'
import { AUTH } from '../constants/actionTypes';

export const signin = (form, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(form);
        dispatch({ type: AUTH, data });
        navigate('/'  , { replace: true })
    } catch (err) {
        console.log(err)
    }
}

export const signup = (form, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(form);
        dispatch({ type: AUTH, data });
        navigate('/'  , { replace: true })
    } catch (err) {
        console.log(err)
    }
}