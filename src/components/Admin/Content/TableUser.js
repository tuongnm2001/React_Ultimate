import { useEffect, useState } from "react";
import { getAllUser } from "../../../service/apiService";

const TableUser = (props) => {

    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchListUser();
    }, [])

    const fetchListUser = async () => {
        let data = await getAllUser();
        if (data.EC === 0) {
            setListUser(data.DT)
        }
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-info">Views</button>
                                        <button className="btn btn-warning mx-3" >Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser;