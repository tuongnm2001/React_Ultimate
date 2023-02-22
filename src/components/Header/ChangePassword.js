import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postChangePassword } from '../../service/apiService';
import { toast } from 'react-toastify';

const ChangePassword = (props) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleChangePassword = async () => {
        let res = await postChangePassword(currentPassword, newPassword)
        if (res && res.EC === 0) {
            toast.success('Đổi mật khẩu thành công')
            props.handleClose()
        } else {
            toast.error('Đổi mật khẩu thất bại')
            props.handleClose()
        }
    }

    return (
        <div className='changepassword-container'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control type="password" onChange={(event) => setCurrentPassword(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control type="password" onChange={(event) => setNewPassword(event.target.value)} />
                </Form.Group>

                <Button variant="danger" className='mx-3' onClick={() => props.handleClose()}>
                    Đóng
                </Button>

                <Button variant="success" onClick={() => handleChangePassword()}>
                    Lưu
                </Button>
            </Form>
        </div>
    )
}

export default ChangePassword;