import React, { Component } from 'react';

class DisplayInfor extends Component {
    render() {

        let { listUsers } = this.props

        return (
            <div>
                {
                    listUsers.map((item, index) => {
                        return (
                            <div key={index}>
                                <div>Name : {item.name}</div>
                                <div>Age : {item.age}</div>
                                <div>Address : {item.address}</div>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default DisplayInfor;