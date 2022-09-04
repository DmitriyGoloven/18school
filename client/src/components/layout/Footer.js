import React from 'react';
import {Container} from "react-bootstrap";


const Footer = () => {
    return (
        <>
            <Container fluid className={"footer"}>
                <span style={{fontSize: "11px", color: "white"}}>©2022 Holoven M.M.</span>
            </Container>
        </>
    );
};

export default Footer;