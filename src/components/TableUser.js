import Table from 'react-bootstrap/Table';
import './TableUser.scss'

const TableUser = (props) => {

    const { dataUser } = props



    return (
        <div className='table-container'>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataUser && dataUser.length > 0 &&
                        dataUser.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className='btn btn-warning m-3' onClick={() => props.handleUpdateUser(item)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => props.handleDeleteUser(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TableUser 