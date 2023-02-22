import { NavDropdown } from "react-bootstrap";
import { useTranslation, Trans } from 'react-i18next';
import vietnam from '../../assets/vietnam.png';
import uk from '../../assets/uk.png'
import './Languages.scss'
import { useState } from "react";

const Languages = (props) => {

    const { t, i18n } = useTranslation();
    const [isShowHide, setIsShowHide] = useState(false)

    const handleChangLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <NavDropdown
            className='languages'
            onMouseEnter={() => setIsShowHide(true)}
            onMouseLeave={() => setIsShowHide(false)}
            show={isShowHide}
            title=
            {
                i18n.language === 'vi' ?
                    <div >
                        <img src={vietnam} /><span>Việt Nam</span>
                    </div>
                    :
                    <div >
                        <img src={uk} /><span>English</span>
                    </div>
            }
            id="basic-nav-dropdown"
        >
            <NavDropdown.Item onClick={() => handleChangLanguage('vi')}><img src={vietnam} />Tiếng Việt</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleChangLanguage('en')}><img src={uk} />English</NavDropdown.Item>
        </NavDropdown>
    )
}

export default Languages;