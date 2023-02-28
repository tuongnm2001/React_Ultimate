import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../service/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userActions';
import Languages from './Languages';
import { ImTumblr2 } from 'react-icons/im';
import { useTranslation, Trans } from 'react-i18next';
import { hover } from '@testing-library/user-event/dist/hover';
import { useState } from 'react';
import ModalProfile from './ModalProfile';
import UpdateProfile from './UpdateProfile';

const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispath = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isShowHide, setIsShowHide] = useState(false)
    const [isShowModalProfile, setIsShowModalProfile] = useState(false)

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogout = async () => {
        let res = await logOut(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            //clear data redux
            dispath(doLogout())
            navigate('/login');
        } else {
            toast(res.EM)
        }
    }

    console.log('check account : ', account);

    const handleProfile = () => {
        setIsShowModalProfile(true)
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavLink to="/" className='navbar-brand'><ImTumblr2 className='logo' />Tuong NM</NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
                            <NavLink to="/users" className='nav-link'>{t('header.user')}</NavLink>
                            {
                                account && account.role && account.role === 'ADMIN'
                                    ?
                                    <NavLink to="/admins" className='nav-link'>{t('header.admin')}</NavLink>
                                    :
                                    ""
                            }



                        </Nav>

                        <Nav>
                            {
                                isAuthenticated === false ?
                                    <>
                                        <button className='btn-login' onClick={() => handleLogin()}>{t('header.login')}</button>
                                        <button className='btn-signup' onClick={() => handleRegister()}>{t('header.sign-up')}</button>
                                    </>
                                    :
                                    <>

                                        {
                                            <div>
                                                <NavDropdown className='dropdown-content'
                                                    onMouseEnter={() => setIsShowHide(true)}
                                                    onMouseLeave={() => setIsShowHide(false)}
                                                    show={isShowHide}
                                                    title={
                                                        <>
                                                            <div className='account-image'>
                                                                <div>
                                                                    <img src={`data:image/jpeg;base64,${account.image}`} />
                                                                </div>
                                                                <div className='accEmail'>{account.email}</div>
                                                            </div>
                                                        </>
                                                    }

                                                >
                                                    <NavDropdown.Item onClick={() => handleProfile()}>{t('header.profile')}</NavDropdown.Item>
                                                    <NavDropdown.Item onClick={() => handleLogout()}>{t('header.logout')}</NavDropdown.Item>
                                                </NavDropdown>
                                            </div>
                                        }

                                    </>
                            }
                            <Languages />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >

            <ModalProfile
                show={isShowModalProfile}
                setShow={setIsShowModalProfile}
            />
        </>
    );
}

export default Header;