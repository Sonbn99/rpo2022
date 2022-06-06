import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
class NavigationBarClass extends React.Component {
    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }
    goHome() {
        this.props.navigate("Home")
    }
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><FontAwesomeIcon icon={faHome} />{' '}My RPO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                        <Nav.Link onClick={this.goHome}>goHome</Nav.Link>
                        <Nav.Link onClick={() => { this.props.navigate("\home") }}>Home again</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }
}
const NavigationBar = props => {
    const navigate = useNavigate();
    return <NavigationBarClass navigate={navigate} {...props} />
}
export default NavigationBar;