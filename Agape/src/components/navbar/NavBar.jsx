import React from 'react'
import { Link } from 'react-router-dom';
import links from './links'
import LinkWidget from './LinkWidget'
import { Container, Figure, Nav, Navbar } from 'react-bootstrap'
require('../styles.css')
const NavBar = () => {
    return (
       

        //ESTA NAVBAR ESTA HECHA CON BOOTSTRAP
        //HAY UN ERROR/ADVERTENCIA GENERADA POR EL TOGGLE, SEGUN INTERNET ES PROPIO DE LA LIBRERIA

        <Navbar sticky="top" collapseOnSelect expand="lg" className="navbar">
            <Container fluid>
                <Nav.Link as={Link} to="/" className='mr-5'>
                    <Figure.Image
                        width={171}
                        height='auto'
                        alt="logo"
                        src="https://i.imgur.com/C3zXSSv.png"

                    />
                </Nav.Link >
                <Navbar.Toggle className="navbar-toggle" aria-controls="responsive-navbar-nav " />
                <Navbar.Collapse id="responsive-navbar-nav ">
                    <Nav className="me-auto">

                    {

                        //Mapeo el array links 
                    links.map((i,p ) =>{
                        return(
                            <Nav.Link key={p} className="mr-2" as={Link} to={i.to}>
                               <LinkWidget icon={i.icon} name={i.name}/>
                            </Nav.Link>
                        
                        )
                    })

                }
                     


                    </Nav>
                  
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar
