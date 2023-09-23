import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'

import { useState } from 'react'

// add specific typing with interface if necessary

interface Page {
    page: string
}

const navTabs: any = {
    "HomePage": ["Sign-up", "Log-in"], 
    "User": ["Home", "Friends", "Logout"]
}

export default function MainNav({page}: Page) {

    let navLinks: any[] = navTabs[page].map((tab:string) => {
        return <Nav.Link href ={("./" + tab)} style={{paddingRight:35}}>{tab}</Nav.Link>
    })




    return (

        // Change font to match the outline
        <>
        <Navbar data-bs-theme="dark" style={{background: "#3E3E3E", fontSize:25}}>

            <Navbar.Brand href="./" style={{fontSize:45, fontFamily: 'Koulen', marginRight: 20, marginLeft: 60}}> FilmFlix</Navbar.Brand>
            <div style={{width:"70%"}}>

            </div>
            <Nav variant="tabs" className="me-auto" style={{fontFamily: "Ubuntu", lineHeight: "133.023%", fontWeight: 400, fontStyle: "normal"}}>
                {navLinks}
            
            </Nav>


                

        </Navbar>
        </>

    )

}