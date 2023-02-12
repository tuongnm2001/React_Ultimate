import ModalCreateUser from './ModalCreateUser';

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Quản lí người dùng
            </div>

            <div className="users-content">
                <button>Add New User</button>
            </div>

            <div>
                Table
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManageUser;