import React from "react";
import DisplayInfor from "./DisplayInfor";
import UserInfor from "./UserInfor";

class MyComponents extends React.Component {

    render() {
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor
                    name='Nguyen Minh Tuong'
                    age='20'
                />
            </div>
        )
    }
}

export default MyComponents;