import React, { Component } from 'react';

class DisplayInfor extends Component {
    render() {
        return (
            <div>
                <div>My name is {this.props.name} : </div>
                <div>My age is {this.props.age} </div>
            </div>
        );
    }
}

export default DisplayInfor;