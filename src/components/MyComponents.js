import React from "react";

class MyComponents extends React.Component {

    state = {
        name: 'Nguyen Minh Tuong',
        age: 22,
        address: 'Can Tho'
    }

    render() {

        return (
            <div>
                {this.state.name} {this.state.age}
            </div>
        )
    }
}

export default MyComponents;