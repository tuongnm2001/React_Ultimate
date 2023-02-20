import { NavDropdown } from "react-bootstrap";

const Languages = (props) => {
    return (
        <NavDropdown className='languages' title="Ngôn ngữ" id="basic-nav-dropdown">
            <NavDropdown.Item>Tiếng Việt</NavDropdown.Item>
            <NavDropdown.Item>English</NavDropdown.Item>
        </NavDropdown>
    )
}

export default Languages;