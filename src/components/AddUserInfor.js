import React, { useState } from "react";

const AddUserInfor = (props) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeAge = (e) => {
        setAge(e.target.value)
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: name,
            age: age,
            address: address
        })
    }

    return (
        <div>
            <form onSubmit={(event) => { handleOnSubmit(event) }}>
                <br />
                <label>Your name </label>
                <input value={name} onChange={(e) => handleChangeName(e)} />
                <br />

                <label>Your age </label>
                <input value={age} onChange={(e) => handleChangeAge(e)} />
                <br />

                <label>Your address </label>
                <input value={address} onChange={(e) => handleChangeAddress(e)} />
                <br />
                <button>Click</button>
            </form>
        </div>
    )
}
export default AddUserInfor;