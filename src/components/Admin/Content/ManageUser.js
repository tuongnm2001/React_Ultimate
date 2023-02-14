import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useState } from 'react';
import TableUser from './TableUser';
import { useEffect } from "react";
import { getAllUser } from "../../../service/apiService";
const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchListUser();
    }, [])

    const fetchListUser = async () => {
        let data = await getAllUser();
        if (data.EC === 0) {
            setListUser(data.DT)
        }
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Quản lí người dùng
            </div>

            <div className="users-content">
                <button className='btn btn-success' onClick={() => setShowModalCreateUser(true)}><FcPlus /> Add New User</button>

                <div className='table-users-container'>
                    <TableUser
                        listUser={listUser}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )
}

export default ManageUser;