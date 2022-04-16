import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (form) => API.post('/users/signin', form);
export const signUp = (form) => API.post('/users/signup', form);
