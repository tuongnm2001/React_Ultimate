import React from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

class MyComponents extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: 'Nguyen Van A ', age: 28, address: 'Ha Noi' },
            { id: 2, name: 'Nguyen Van B ', age: 29, address: 'TP Ho Chi Minh' },
            { id: 3, name: 'Nguyen Van C ', age: 30, address: 'Can Tho' },
        ]

    }

    handleAddNewUser = (objUser) => {
        this.setState({
            listUsers: [objUser, ...this.state.listUsers]
        })
    }

    render() {
        return (
            <div>
                <AddUserInfor
                    handleAddNewUser={this.handleAddNewUser}
                />
                <br /><br />
                <DisplayInfor
                    listUsers={this.state.listUsers}
                />
            </div>
        )
    }
}

export default MyComponents;