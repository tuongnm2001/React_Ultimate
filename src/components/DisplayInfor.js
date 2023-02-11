import React, { Component } from 'react';
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

    return (
        <div className='display-infor-container'>
            {
                true &&
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