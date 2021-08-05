import React from 'react'
import { Link } from 'react-router-dom';
import links from './links'
import LinkWidget from './LinkWidget'
import { Container, Figure, Nav, Navbar } from 'react-bootstrap'
import {useFirebase} from '../context/firebase-context'
import * as FcIcons from 'react-icons/fc'
import('./nav.css')
const NavBar = () => {
    
    const {isLogged,authGoogle,signOut} = useFirebase()
    
    const signIn = () => {
        authGoogle()
    }
    const exit = () => {
        signOut()
    }
    return (
       

        //ESTA NAVBAR ESTA HECHA CON BOOTSTRAP
        //HAY UN ERROR/ADVERTENCIA GENERADA POR EL TOGGLE, SEGUN INTERNET ES PROPIO DE LA LIBRERIA

        <Navbar sticky="top" collapseOnSelect expand="lg" className="navbar">
            <Container fluid>
                <Nav.Link as={Link} to="/" className='mr-5'>
                    <Figure.Image
                        width={150}
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
                               <LinkWidget icon={i.icon} name={i.name} />
                            </Nav.Link>
                        
                        )
                    })

                }
                   
                     {
                         
                         isLogged?<button onClick={exit} className="btn btn-danger">Salir de la cuenta</button>: <button onClick={signIn} className="btn btn-light d-flex align-items-center justify-content-center"><FcIcons.FcGoogle size={25}/><span className='text-dark  ml-2 '>Ingresar</span></button>
                     }

                    </Nav>
                  
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar
