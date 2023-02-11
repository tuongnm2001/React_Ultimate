import React, { Component, useState } from 'react';
import './DisplayInfor.scss'
import logo from './../logo.svg'

// class DisplayInfor extends Component {

//     render() {

//         let { listUsers } = this.props

//         return (
//             <div className='display-infor-container'>
//                 {
//                     true &&
//                     <div>
//                         {
//                             listUsers.map((item, index) => {
//                                 return (
//                                     <div key={item.id} className={+item.age > 28 ? 'green' : 'red'}>
//                                         <div>
//                                             <div>Name : {item.name}</div>
//                                             <div>Age : {item.age}</div>
//                                             <div>Address : {item.address}</div>
//                                         </div>

//                                         <div>
//                                             <button onClick={() => this.props.handleDeleteUser(item.id)}>Delete</button>
//                                         </div>
//                                         <hr />
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                 }
//             </div>
//         );
//     }
// }

const DisplayInfor = (props) => {
    let { listUsers } = props
    const [isShowHide, setIsShowHide] = useState(true)

    let handleShowHideUser = () => {
        setIsShowHide(!isShowHide)
    }

    return (
        <div className='display-infor-container'>
            <div>
                <span onClick={() => { handleShowHideUser() }} style={{ cursor: 'pointer' }}>{isShowHide === true ? 'Hide list Users ' : 'Show list Users '}</span>
            </div>

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
                                        <button onClick={() => props.handleDeleteUser(item.id)}>Delete</button>
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

export default DisplayInfor;