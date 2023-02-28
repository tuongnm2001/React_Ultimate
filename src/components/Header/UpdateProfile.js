import './UpdateProfile.scss'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { postUpdateProfile } from '../../service/apiService';
import noImage from '../../assets/no-image.jpg';
import vn from '../../assets/vietnam.png'
import _ from 'lodash';
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";

const UpdateProfile = (props) => {

    let { account, handleClose } = props;

    const { t } = useTranslation();
    const [image, setImage] = useState(false)
    const [username, setUsername] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setUsername(account.username)
            setPreviewImage(`data:image/jpeg;base64,${account.image}`)
        }
    }, [account])

    const handleChangeImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage('')
        }
    }

    const handleSaveUpdateProfile = async () => {
        let res = await postUpdateProfile(username, image);
        if (res && res.EC === 0) {
            toast.success('Cập nhật thành công')
            handleClose(false)
        } else {
            toast.success('Cập nhật thất bại')
            handleClose(false)
        }
    }

    const handeCloseModal = () => {
        handleClose(false)
    }

    return (
        <div className="update-profile-container">
            <div className='img-profile'>
                <div>
                    {
                        previewImage ?
                            <img src={previewImage} />
                            :
                            <img src={noImage} />
                    }

                </div>

                <div>
                    <label className="form-label label-upload" htmlFor='lableUpload'>
                        {t('manage-user.upload-image')}
                    </label>
                    <input
                        onChange={(event) => handleChangeImage(event)}
                        hidden
                        type='file'
                        id='lableUpload'
                    />
                </div>
            </div>

            <div className="col-md-6">
                <label>{t('setting.username')}</label>
                <input className="form-control mt-3"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} />
            </div>

            <button className="btn btn-success mr-3" onClick={() => handleSaveUpdateProfile()}>{t('setting.save')}</button>
            <button className="btn btn-danger mx-3" onClick={() => handeCloseModal()}>{t('setting.close')}</button>
        </div>
    )
}

export default UpdateProfile