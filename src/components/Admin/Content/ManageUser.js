import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useState } from 'react';
import TableUser from './TableUser';
import { useEffect } from "react";
import { getAllUser } from "../../../service/apiService";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setdataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})


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

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const handleShowViewModal = (user) => {
        setShowModalViewUser(true)
        setdataView(user)
    }

    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true)
        setDataDelete(user)
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                QUẢN LÍ NGƯỜI DÙNG
            </div>

            <div className="users-content">
                <button className='btn btn-success' onClick={() => setShowModalCreateUser(true)}><FcPlus /> Add New User</button>

                <div className='table-users-container'>
                    <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleShowViewModal={handleShowViewModal}
                        handleDeleteUser={handleDeleteUser}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />

                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    dataView={dataView}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                />
            </div>
        </div>
    )
}

export default ManageUser;