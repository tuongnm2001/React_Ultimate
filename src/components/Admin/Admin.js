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

const Admin = (props) => {
    const account = useSelector(state => state.user.account);

    const [collapsed, setCollapsed] = useState(false)

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
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>Log out</NavDropdown.Item>
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