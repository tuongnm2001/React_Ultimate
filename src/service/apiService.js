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

export { postCreatNewUser }