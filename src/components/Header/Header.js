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

const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispath = useDispatch();

    const navigate = useNavigate();

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

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink to="/" className='navbar-brand'>Tuong NM</NavLink>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admins" className='nav-link'>Admin</NavLink>
                    </Nav>

                    <Nav>
                        {
                            isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                    <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                                </>
                                :
                                <NavDropdown className='setting' title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                                </NavDropdown>
                        }

                        <Languages />

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;