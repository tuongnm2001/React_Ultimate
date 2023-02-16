import React, { useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

const MyComponents = () => {

    const [listUsers, setListUsers] = useState(
        [
            { id: 1, name: 'Nguyen Van A ', age: 28, address: 'Ha Noi' },
            { id: 2, name: 'Nguyen Van B ', age: 29, address: 'TP Ho Chi Minh' },
            { id: 3, name: 'Nguyen Van C ', age: 30, address: 'Can Tho' },
        ]
    )

    const handleAddNewUser = (objUser) => {
        setListUsers([objUser, ...listUsers])
    }

    const handleDeleteUser = (userId) => {
        let listUsersClone = listUsers;
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        setListUsers(listUsersClone)
    }

    return (
        <div>
            <AddUserInfor
                handleAddNewUser={handleAddNewUser}
            />
            <br /><br />
            <DisplayInfor
                listUsers={listUsers}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    )
}
export default MyComponents;