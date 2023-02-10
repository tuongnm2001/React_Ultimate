import React, { Component } from 'react';
import './DisplayInfor.scss'
import logo from './../logo.svg'

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
            <div className='display-infor-container'>
                <img className='logo' src={logo} />
                <button style={{ marginBottom: '20px' }}
                    onClick={() => { this.handleShowHide() }}>{isShowHide === true ? 'Hide' : 'Show'}</button>

                {
                    isShowHide &&
                    <div>
                        {
                            listUsers.map((item, index) => {
                                return (
                                    <div key={item.id} className={+item.age > 28 ? 'green' : 'red'}>
                                        <div>
                                            <div>Name : {item.name}</div>
                                            <div>Age : {item.age}</div>
                                            <div>Address : {item.address}</div>
                                        </div>

                                        <div>
                                            <button onClick={() => this.props.handleDeleteUser(item.id)}>Delete</button>
                                        </div>
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