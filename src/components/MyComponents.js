import React from "react";

class MyComponents extends React.Component {

    state = {
        name: '',
        age: 0,
        address: 'Can Tho',
        arr: ['a', 'b', 'c']
    }

    handelClick = (e) => {
        this.setState({
            age: Math.floor(Math.random() * 100 + 1)
        })
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input value={this.state.name} onChange={(e) => this.handleChange(e)} />
                <button onClick={this.handelClick}>Click</button>
                My name is : {this.state.name}

                Age : {this.state.age}
            </div>
        )
    }
}

export default MyComponents;