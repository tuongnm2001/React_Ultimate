import React, { Component } from 'react';

class DisplayInfor extends Component {

    state = {
        isShowHide: true
    }

    handleShowHide = () => {
        this.setState({
            isShowHide: !this.state.isShowHide
        })
    }

    render() {

        let { listUsers } = this.props
        let { isShowHide } = this.state

        return (
            <div>
                <button style={{ marginBottom: '20px' }}
                    onClick={() => { this.handleShowHide() }}>{isShowHide === true ? 'Hide' : 'Show'}</button>

                {
                    isShowHide &&
                    <div>
                        {
                            listUsers.map((item, index) => {
                                return (
                                    <div key={index} className={item.age > 28 ? 'green' : 'red'}>
                                        <div>Name : {item.name}</div>
                                        <div>Age : {item.age}</div>
                                        <div>Address : {item.address}</div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        );
    }
}

export default DisplayInfor;