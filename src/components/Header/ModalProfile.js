import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import History from './History';

const ModalProfile = (props) => {
    let { show, setShow } = props

    const [key, setKey] = useState('home');
    const account = useSelector(state => state.user.account);
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size='lg'
            backdrop='static'

        >
            <Modal.Header closeButton>
                <Modal.Title>Hồ sơ của tôi</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Hồ sơ của tôi">
                        <UpdateProfile
                            account={account}
                            handleClose={handleClose}
                        />
                    </Tab>
                    <Tab eventKey="profile" title="Đổi mật khẩu">
                        <ChangePassword
                            handleClose={handleClose}
                        />
                    </Tab>
                    <Tab eventKey="contact" title="Lịch sử bài kiểm tra">
                        <History
                            handleClose={handleClose}
                        />
                    </Tab>
                </Tabs>
            </Modal.Body >
        </Modal >
    )
}

export default ModalProfile;