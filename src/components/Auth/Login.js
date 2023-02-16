import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postLogin } from '../../service/apiService';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userActions';

function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showHidePassword, setShowHidePassword] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBackHome = () => {
        navigate('/')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin = async () => {
        //validate

        //submit api
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success('Đăng nhập thành công.')
            navigate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const onKeyUpValue = (e) => {
        if (e.keyCode === 13) {
            handleLogin()
        }
    }

    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span className='title-header'>Don't you have an account yet?</span>
                <button className='btn-sign-up' onClick={() => handleRegister()}>Sign up</button>
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
                        type={showHidePassword ? 'text' : 'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyUp={onKeyUpValue.bind(this)}
                    />
                    <span className='forgot-password'>Forgot password ?</span>
                    <div>
                        <button onClick={() => handleLogin()} className='btn-submit'>Login in</button>
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

export default Login;