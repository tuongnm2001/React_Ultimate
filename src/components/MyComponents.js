import { async } from "q";
import React, { useState } from "react";
import ModalAddUser from "./ModalAddUser";
import TableUser from "./TableUser";
import { fetchAllUser, deleteUser } from "../service/apiService";
import { useEffect } from "react";
import ModalDelete from "./ModalDelete";
import ModalUpdateUser from "./ModalUpdateUser";

const MyComponents = () => {

    const [showModalUser, setShowModalUser] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)

    const [dataUser, setDataUser] = useState([])
    const [dataDeleteUser, setDataDeleteUser] = useState([])
    const [dataUpdateUser, setDataUpdateUser] = useState([])

    useEffect(() => {
        fetAllUser()
    }, [])

    const fetAllUser = async () => {
        let res = await fetchAllUser()
        if (res && res.EC === 0) {
            setDataUser(res.DT)
        }
    }

    const handleDeleteUser = async (user) => {
        setShowModalDelete(true)
        setDataDeleteUser(user)
    }

    const handleUpdateUser = (user) => {
        setShowModalUpdate(true)
        setDataUpdateUser(user)
    }

    return (
        <div>
            <div className='my-2'>
                <button className='btn btn-success' onClick={() => setShowModalUser(true)}>Add User</button>
            </div>

            <TableUser
                dataUser={dataUser}
                fetAllUser={fetAllUser}
                handleDeleteUser={handleDeleteUser}
                handleUpdateUser={handleUpdateUser}
            />

            <ModalAddUser
                showModalUser={showModalUser}
                setShowModalUser={setShowModalUser}
                fetAllUser={fetAllUser}
            />

            <ModalDelete
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                dataDeleteUser={dataDeleteUser}
                fetAllUser={fetAllUser}
            />

            <ModalUpdateUser
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                dataUpdateUser={dataUpdateUser}
                fetAllUser={fetAllUser}
            />
        </div>
    )
}
export default MyComponents;