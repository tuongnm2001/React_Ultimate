import React from "react";

class MyComponents extends React.Component {

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

    render() {
        return (
            <div>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input onChange={(e) => this.handleChange(e)} />
                    <button>Click</button>
                    My name is : {this.state.name}

                    Age : {this.state.age}
                </form>
            </div>
        )
    }
}

export default MyComponents;