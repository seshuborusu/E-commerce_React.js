import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router DOM
import "./Navbar.css"
import { TfiMenu } from "react-icons/tfi";
import Loginmodal from "../Auth/model/Loginmodel";
const ResponsiveNavbar = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);



    return (
        <div>

            {/* Navbar with custom class for styling */}
            <Navbar expand="lg" bg="transparent" variant="light" className="navbar-custom border-bottom">
                <Container fluid className="mx-5 nav-container">
                    {/* Left Section - Logo */}
                    <Link to={"/"} className="text-decoration-none">  <Navbar.Brand className="fw-bold">LOGO</Navbar.Brand></Link>

                    {/* Middle Section - Navigation Links (Visible on Large Screens) */}
                    <div className="d-none d-lg-flex flex-grow-1 justify-content-start ">
                        <Nav>
                            <Nav.Item>
                                <Link to="/" className="nav-link mx-2">
                                    Home
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/electronics" className="nav-link mx-2">
                                    Electronics
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/jewellery" className="nav-link mx-2">
                                    Jewelery
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/mens" className="nav-link mx-2">
                                    Men
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/womens" className="nav-link mx-2">
                                    Womens
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    {/* Right Section - Cart, Heart Icon, Login Button */}
                    <div className="d-flex align-items-center p-1">
                        <div className="login-btn-hide">
                            <Loginmodal />
                        </div>

                        <div className="d-lg-none">
                            <svg width="21px" height="23px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-420.000000, -2119.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M378.083123,1964.99998 C378.083123,1962.79398 376.251842,1960.99998 374,1960.99998 C371.748158,1960.99998 369.916877,1962.79398 369.916877,1964.99998 C369.916877,1967.20598 371.748158,1968.99998 374,1968.99998 C376.251842,1968.99998 378.083123,1967.20598 378.083123,1964.99998 M381.945758,1978.99998 L380.124685,1978.99998 C379.561214,1978.99998 379.103904,1978.55198 379.103904,1977.99998 C379.103904,1977.44798 379.561214,1976.99998 380.124685,1976.99998 L380.5626,1976.99998 C381.26898,1976.99998 381.790599,1976.30298 381.523154,1975.66198 C380.286989,1972.69798 377.383888,1970.99998 374,1970.99998 C370.616112,1970.99998 367.713011,1972.69798 366.476846,1975.66198 C366.209401,1976.30298 366.73102,1976.99998 367.4374,1976.99998 L367.875315,1976.99998 C368.438786,1976.99998 368.896096,1977.44798 368.896096,1977.99998 C368.896096,1978.55198 368.438786,1978.99998 367.875315,1978.99998 L366.054242,1978.99998 C364.778266,1978.99998 363.773818,1977.85698 364.044325,1976.63598 C364.787453,1973.27698 367.107688,1970.79798 370.163906,1969.67298 C368.769519,1968.57398 367.875315,1966.88998 367.875315,1964.99998 C367.875315,1961.44898 371.023403,1958.61898 374.733941,1959.04198 C377.422678,1959.34798 379.650022,1961.44698 380.05323,1964.06998 C380.400296,1966.33098 379.456073,1968.39598 377.836094,1969.67298 C380.892312,1970.79798 383.212547,1973.27698 383.955675,1976.63598 C384.226182,1977.85698 383.221734,1978.99998 381.945758,1978.99998 M377.185857,1974.46398 C377.584982,1974.85498 377.584982,1975.48798 377.185857,1975.87898 L374,1978.99998 L371.834924,1976.87898 C371.435799,1976.48798 371.435799,1975.85498 371.834924,1975.46398 L371.834924,1975.46398 C372.233028,1975.07398 372.879183,1975.07398 373.278308,1975.46398 L374,1976.17198 L375.742473,1974.46398 C376.141598,1974.07398 376.787752,1974.07398 377.185857,1974.46398" id="profile_round-[#1345]"> </path> </g> </g> </g> </g></svg>
                        </div>
                        {/* Cart Icon */}
                        <Link to={"/cart"}>
                            <div className="ms-3">
                                <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </div>
                        </Link>

                        {/* Heart Icon (Triggers Offcanvas on Mobile) */}
                        <div className="ms-3 p-0" >
                            <TfiMenu onClick={handleShow}
                                className="d-sm-block d-lg-none menubar" />

                        </div>

                    </div>
                </Container>
            </Navbar>

            {/* Offcanvas for Mobile and Tablet */}
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                style={{ width: "70%" }} // Set width to 70% of the screen
                className="d-lg-none" // Hide on large screens (PC/Laptop)
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {/* Using Link from React Router for navigation */}
                        <Nav.Item>
                            <Link to="/" className="nav-link" onClick={handleClose} >
                                Home
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/electronics" className="nav-link" onClick={handleClose} >
                                Electronics
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/jewellery" className="nav-link" onClick={handleClose} >
                                Jewelery
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/mens" className="nav-link" onClick={handleClose} >
                                Men
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/womens" className="nav-link" onClick={handleClose} >
                                Womens
                            </Link>
                        </Nav.Item>

                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
};

export default ResponsiveNavbar;
