import React from 'react';
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Navigation = ({user}) => {
    return (
        <div>



            <Nav fill variant="tabs" style={{margin:"1.5em 0"}}>
                <Nav.Item>
                    <NavLink className={"App-link"} to="/teacher">Додати тест</NavLink>
                </Nav.Item>

                <Nav.Item>
                    <NavLink className={"App-link"} to="/assessment">Успішність</NavLink>
                </Nav.Item>

                <Nav.Item>
                    <NavLink className={"App-link"} to="/register">Реєстрація</NavLink>
                </Nav.Item>
            </Nav>
            <h2>{user.name}</h2>
        </div>
    );
};

export default Navigation;