import React, { Component } from 'react';
import './DisplayInfor.scss'
import logo from './../logo.svg'

class DisplayInfor extends Component {

    constructor(props) {
        console.log('>> call me constructor');
        super(props)
        this.state = {
            isShowHide: true
        }
    }

    componentDidMount() {
        console.log('>> call me component didmount');
        setTimeout(() => {
            document.title = 'Balotelli'
        }, 3000)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('>> call me component didUpdate', this.props, 'prevProps', prevProps);
        if (this.props.listUsers !== prevProps.listUsers) {
            if (this.props.listUsers.length === 5) {
                alert('you got 5 user')
            }
        }
    }

    handleShowHide = () => {
        this.setState({
            isShowHide: !this.state.isShowHide
        })
    }

    render() {
        console.log('>> call me render');

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