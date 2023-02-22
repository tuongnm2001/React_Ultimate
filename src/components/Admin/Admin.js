import SideBar from "./SideBar";
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Languages from "../Header/Languages";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { doLogout } from '../../redux/action/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../service/apiService';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const Admin = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispath = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false)
    const { t } = useTranslation();
    const [isShowHide, setIsShowHide] = useState(false)

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
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar
                    collapsed={collapsed}
                />
            </div>

            <div className="admin-content">
                <div className='admin-header'>
                    <span onClick={() => setCollapsed(!collapsed)} >
                        <FaBars className="left-side" />
                    </span>

                    <div className="right-side">
                        <NavDropdown
                            className='setting'
                            dropdown-toggle='false'
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
                            }>
                            <NavDropdown.Item>{t('admin.profile')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogout()}>{t('admin.logout')}</NavDropdown.Item>
                        </NavDropdown>

                        <Languages />
                    </div>
                </div>

                <div className='admin-main'>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}
export default Admin;