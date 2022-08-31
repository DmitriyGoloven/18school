import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {useNavigate, NavLink} from "react-router-dom";
import logo from "./logo.png"


const NavBar = () => {

    let navigate = useNavigate();

    return (
        <Navbar expand="md" bg="dark" variant="dark">
            <Container>

                <div className="justify-content-start">

                    <h3 style={{color:"whitesmoke"}}>Самооцінка<br/>учнів</h3>
                    {/*<Button variant={"secondary"}*/}
                    {/*        onClick={() => {*/}
                    {/*            navigate("/student", {replace: true})*/}
                    {/*        }}>Учень</Button>*/}
                </div>
                            <Navbar.Brand
                                onClick={() => {
                                    navigate("/", {replace: true})
                                }}
                            >
                                <img
                                    src={logo}
                                    width="80px"
                                    height="70px"
                                    alt="ЗСШФК 18"
                                />

                                <h1>ЗСШФК №18</h1>

                            </Navbar.Brand>

                {/*<Navbar.Toggle aria-controls="responsive-navbar-nav" />*/}
                {/*<Navbar.Collapse id="responsive-navbar-nav">*/}
                {/*    <Nav className="me-auto" style={{justifyContent: "center"}}>*/}
                {/*            <NavLink className={"App-link"} to={"/student"}>Учні</NavLink>*/}
                {/*            /!*<NavLink className={"App-link"} to={"/teacher"}>Вчитель</NavLink>*!/*/}
                {/*    </Nav>*/}

                {/*    <div className="justify-content-end">*/}

                {/*        <Button variant={"secondary"}*/}
                {/*                onClick={() => {*/}
                {/*                    navigate("/teacher", {replace: true})*/}
                {/*                }}>Вчитель</Button>*/}
                {/*    </div>*/}

                {/*</Navbar.Collapse>*/}

            <div className="justify-content-end" style={{margin: "0 30px"}}>

                <Button variant={"secondary"}
                        onClick={() => {
                            // localStorage.removeItem("userToken")
                            // localStorage.removeItem("userId")
                            // localStorage.removeItem("userPosition")
                            localStorage.clear()
                            navigate("/auth", {replace: true})
                        }}>Вийти</Button>

                {/*<Button variant={"secondary"}*/}
                {/*        onClick={() => {*/}
                {/*            navigate("/teacher", {replace: true})*/}
                {/*        }}>Вчитель</Button>*/}
            </div>


            </Container>
        </Navbar>
    );
};

export default NavBar;