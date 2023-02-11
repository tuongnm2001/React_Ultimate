import React, { useState } from "react";

// class AddUserInfor extends React.Component {

//     state = {
//         name: '',
//         age: '',
//         address: '',
//     }

//     handleChangeName = (e) => {
//         this.setState({
//             name: e.target.value
//         })
//     }

//     handleChangeAge = (e) => {
//         this.setState({
//             age: e.target.value
//         })
//     }

//     handleChangeAddress = (e) => {
//         this.setState({
//             address: e.target.value
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1),
//             name: this.state.name,
//             age: this.state.age,
//             address: this.state.address
//         })

//         this.setState({
//             name: '',
//             age: '',
//             address: ''
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <br />
//                     <label>Your name </label>
//                     <input value={this.state.name} onChange={(e) => this.handleChangeName(e)} />
//                     <br />

//                     <label>Your age </label>
//                     <input value={this.state.age} onChange={(e) => this.handleChangeAge(e)} />
//                     <br />

//                     <label>Your address </label>
//                     <input value={this.state.address} onChange={(e) => this.handleChangeAddress(e)} />
//                     <br />
//                     <button>Click</button>
//                 </form>
//             </div>
//         )
//     }
// }

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