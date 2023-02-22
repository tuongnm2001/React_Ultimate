import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useState } from 'react';
import TableUser from './TableUser';
import { useEffect } from "react";
import { getAllUser, getUserWithPaginate } from "../../../service/apiService";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';
import { useTranslation, Trans } from 'react-i18next';

const ManageUser = (props) => {

    const LIMIT_USER = 6;
    const { t } = useTranslation();

    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setdataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [listUser, setListUser] = useState([])


    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, [])

    const fetchListUser = async () => {
        let data = await getAllUser();
        if (data.EC === 0) {
            setListUser(data.DT)
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let data = await getUserWithPaginate(page, LIMIT_USER);
        if (data.EC === 0) {
            setListUser(data.DT.users)
            setPageCount(data.DT.totalPages)
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
                {t('manage-user.manage-user')}
            </div>

            <div className="users-content">
                <button className='btn btn-success add-new-user' onClick={() => setShowModalCreateUser(true)}><FcPlus /> {t('manage-user.adduser')}</button>

                <div className='table-users-container'>
                    {/* <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleShowViewModal={handleShowViewModal}
                        handleDeleteUser={handleDeleteUser}
                    /> */}

                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleShowViewModal={handleShowViewModal}
                        handleDeleteUser={handleDeleteUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    dataView={dataView}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;