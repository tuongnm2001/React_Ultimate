import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postLogin } from '../../service/apiService';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userActions';
import { ImSpinner8 } from 'react-icons/im'
import Languages from '../Header/Languages';
import { useTranslation, Trans } from 'react-i18next';

function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showHidePassword, setShowHidePassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation();

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
        setIsLoading(true)
        //submit api
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(t('login.login-sucess'))
            setIsLoading(false)
            navigate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(t('login.login-fail'))
            setIsLoading(false)
        }

        console.log(data);

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
                <span className='title-header'>{t('login.no-account')}</span>
                <button className='btn-sign-up' onClick={() => handleRegister()}>{t('login.sign-up')}</button>
                <span className='need-help'>{t('login.need-help')}</span>
                <div className='language'><Languages /></div>
            </div>
            <span className='back-home' onClick={() => handleBackHome()}> <BsFillArrowLeftCircleFill /> {t('login.home')} </span>

            <div className='title col-4 mx-auto'>
                Tuong NM
            </div>

            <div className='welcome col-4 mx-auto'>
                {t('login.hello')}
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
                    <label>{t('login.password')}</label>
                    <input
                        type={showHidePassword ? 'text' : 'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyUp={onKeyUpValue.bind(this)}
                    />
                    <span className='forgot-password'>{t('login.forgot-password')}</span>
                    <div>
                        <button disabled={isLoading} onClick={() => handleLogin()} className='btn-submit'>
                            {t('login.login')} &ensp;{isLoading === true && <ImSpinner8 className="loader-icon" />}
                        </button>
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