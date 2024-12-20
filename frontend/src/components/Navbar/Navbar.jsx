import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Loginmodel from '../Aurh/model/Loginmodel';
import "./Navbar.css"
import { Link } from 'react-router-dom';

function NavScrollExample() {
    return (
        <Navbar expand="lg" className="bg-body-transparent border-bottom p-2 navbaras " style={{ fontFamily: "sans-serif", color: "black" }}>
            <Container >
               <Link to={"/"} > <Navbar.Brand className='fw-bold fs-3 p-3 '><img src='https://e7.pngegg.com/pngimages/784/183/png-clipart-shopify-logo-e-commerce-business-super-sale-angle-text.png' height={50} width={70}></img></Navbar.Brand></Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2  my-lg-0 fw-semibold "
                        style={{ maxHeight: '100px' }}
                        navbarScroll >
                        <Link to={"/electronics"} className='text-decoration-none'><Nav.Link href="#action2" className='link-font'>Electronics</Nav.Link></Link>

                        <Link to={"/jewellery"} className='text-decoration-none'>  <Nav.Link href="x" className=' link-font'>
                            Jewelery
                        </Nav.Link></Link>
                        <Link to={"/mens"} className='text-decoration-none'> <Nav.Link href="f" className='link-font' >
                            Men
                        </Nav.Link></Link>
                        <Link to={"/womens"} className='text-decoration-none'> <Nav.Link href="f" className='link-font' >
                            Womens
                        </Nav.Link></Link>

                    </Nav>
                    <div className='d-flex justify-content-between seach-container' >
                        <div className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Looking For..."
                                className=" me-2 bar"
                                aria-label="Search"
                                style={{ backgroundColor: "whitesmoke" }}

                            />
                            <div style={{ width: "140px" }}><Loginmodel/></div>

                        </div>
                        <div><Link to={"/cart"}><i class="bi bi-bag-check fs-4 bag text-dark"></i></Link></div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;