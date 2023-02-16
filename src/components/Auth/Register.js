import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postRegister } from '../../service/apiService';
import { toast } from 'react-toastify';
import './Register.scss'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [showHidePassword, setShowHidePassword] = useState(false)

    const navigate = useNavigate();


    const handleBackHome = () => {
        navigate('/')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {

        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Email không hợp lệ.')
            return;
        }

        if (!password) {
            toast.error('Bạn chưa nhập mật khẩu')
            return;
        }

        //submit api
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success('Đăng ký thành công.')
            navigate('/login')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }

    return (
        <div className="register-container">
            <div className='header'>
                <span className='title-header'>Already have an account?</span>
                <button className='btn-sign-up' onClick={() => handleLogin()}>Login</button>
                <span className='back-home-register' onClick={() => handleBackHome()}> <BsFillArrowLeftCircleFill /> Home </span>
            </div>

            <div className='title col-4 mx-auto'>
                REGISTER
            </div>

            <div className='welcome col-4 mx-auto'>
                Hello , who's this?
            </div>

            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label>Password (*)</label>
                    <input
                        type={showHidePassword ? 'text' : 'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <label>Username</label>
                    <input type='text'
                        value={username}
                        className='form-control'
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <div>
                        <button onClick={() => handleRegister()} className='btn-submit'>Register</button>
                    </div>
                </div>
            </div>
            <div className='eye' onClick={() => handleShowHidePassword()}>
                {
                    showHidePassword ? <span className='eye-show'><AiFillEye /></span> :
                        <span className='eye-hide'><AiFillEyeInvisible /></span>
                }
            </div>
        </div>
    );
}

export default Register;