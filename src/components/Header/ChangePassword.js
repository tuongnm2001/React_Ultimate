import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postChangePassword } from '../../service/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ChangePassword = (props) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const { t } = useTranslation();

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
                    <Form.Label>{t('profile.currentPassword')}</Form.Label>
                    <Form.Control type="password" onChange={(event) => setCurrentPassword(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{t('profile.newPassword')}</Form.Label>
                    <Form.Control type="password" onChange={(event) => setNewPassword(event.target.value)} />
                </Form.Group>

                <Button variant="danger" className='mx-3' onClick={() => props.handleClose()}>
                    {t('setting.close')}
                </Button>

                <Button variant="success" onClick={() => handleChangePassword()}>
                    {t('setting.save')}
                </Button>
            </Form>
        </div>
    )
}

export default ChangePassword;