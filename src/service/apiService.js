import axios from '../utils/axiosCustomize'

const postCreatNewUser = (email, password, username, role, image) => {
    //call api
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('/api/v1/participant', data)
}

const getAllUser = () => {
    return axios.get('/api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
    //call api
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('/api/v1/participant', data)
}

const deleteUser = (userId) => {
    return axios.delete('/api/v1/participant', { data: { id: userId } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post('/api/v1/login', { email: email, password: password, delay: 3000 })
}

const postRegister = (email, password, username) => {
    return axios.post('/api/v1/register', { email: email, password: password, username: username })
}

const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}

const getDataQuiz = (quizId) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
}

export {
    postCreatNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz
}