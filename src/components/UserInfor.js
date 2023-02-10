import React from "react";

class UserInfor extends React.Component {

    state = {
        name: '',
        age: 22,
        address: 'Can Tho',
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    handleChangeAge = (e) => {
        this.setState({
            age: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <label>Your name </label>
                    <input value={this.state.name} onChange={(e) => this.handleChange(e)} />

                    <label>Your age </label>
                    <input value={this.state.age} onChange={(e) => this.handleChangeAge(e)} />
                    <button>Click</button>
                </form>
            </div>
        )
    }
}

export default UserInfor;