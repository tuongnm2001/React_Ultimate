import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postLogin } from '../../service/apiService';
import { toast } from 'react-toastify';

function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();


    const handleBackHome = () => {
        navigate('/')
    }

    const handleLogin = async () => {
        //validate

        //submit api
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            toast.success('Đăng nhập thành công.')
            navigate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span className='title-header'>Don't you have an account yet?</span>
                <button className='btn-sign-up'>Sign up</button>
                <span className='need-help'>Need help?</span>
                <span className='back-home' onClick={() => handleBackHome()}> <BsFillArrowLeftCircleFill /> Home </span>
            </div>

            <div className='title col-4 mx-auto'>
                Tuong NM
            </div>

            <div className='welcome col-4 mx-auto'>
                Hello , who's this?
            </div>

            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className='forgot-password'>Forgot password ?</span>
                    <div>
                        <button onClick={() => handleLogin()} className='btn-submit'>Login in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;