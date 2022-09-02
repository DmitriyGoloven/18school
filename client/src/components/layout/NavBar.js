import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {useNavigate, NavLink} from "react-router-dom";
import logo from "./logo.png"


const NavBar = () => {

    let navigate = useNavigate();

    return (
        <Navbar style={{opacity:"0.8"}} expand="md" bg="dark" variant="dark">
            <Container>

                <div className="justify-content-start">

                    <h3 style={{color:"whitesmoke"}}>Тестування<br/>для учнів</h3>

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

            <div className="justify-content-end" style={{margin: "0 30px"}}>

                <Button variant={"secondary"}
                        onClick={() => {
                            // localStorage.removeItem("userToken")
                            // localStorage.removeItem("userId")
                            // localStorage.removeItem("userPosition")
                            localStorage.clear()
                            navigate("/auth", {replace: true})
                        }}>Вийти</Button>

            </div>


            </Container>
        </Navbar>
    );
};

export default NavBar;