import { NavDropdown } from "react-bootstrap";
import { useTranslation, Trans } from 'react-i18next';

const Languages = (props) => {

    const { t, i18n } = useTranslation();

    const handleChangLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <NavDropdown className='languages' title={i18n.language === 'vi' ? 'Việt Nam' : 'English'} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => handleChangLanguage('vi')}>Tiếng Việt</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleChangLanguage('en')}>English</NavDropdown.Item>
        </NavDropdown>
    )
}

export default Languages;