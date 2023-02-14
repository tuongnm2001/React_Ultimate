import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useState } from 'react';
import TableUser from './TableUser';

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    return (
        <div className="manage-user-container">
            <div className="title">
                Quản lí người dùng
            </div>

            <div className="users-content">
                <button className='btn btn-success' onClick={() => setShowModalCreateUser(true)}><FcPlus /> Add New User</button>

                <div className='table-users-container'>
                    <TableUser />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}

                />
            </div>
        </div>
    )
}

export default ManageUser;