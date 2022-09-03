import React, {useEffect, useState} from 'react';
import {Container, Modal, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";
import Navigation from "../Navigation";
import FormRegistry from "./FormRegistry";
import FormStudent from "./FormStudent";


const RegisterAndChange = () => {

    const navigate = useNavigate()
    const localUserID = localStorage.getItem("userToken")
    const localUserPosition = localStorage.getItem("userPosition")
    useEffect(() => {
        if (!localUserID || localUserPosition !== "teacher") {
            localStorage.clear()
            navigate('/auth');
        }
        getUser()
        getStudents()
    }, [localUserID, navigate])


    const {loading, request} = useHttp()
    const [user, setUser] = useState([])
    const [students, setStudents] = useState([])
    const [student, setStudent] = useState(null)
    const [show, setShow] = useState(false)

    const HandleClose = () => {
        setShow(false);
        getStudents()
    }

    const HandleShow = () => setShow(true)

    const getStudent = async (userID) => {
        try {
            const data = await request("/api/data/user", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            setStudent(data)
            HandleShow()
            console.log("registerandch s46", data)

        } catch (e) {
            console.log(e)
        }
    }

    const delStudent = async (userID) => {
        try {
            const data = await request("/api/data/userDel", "DELETE", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            getStudents()

        } catch (e) {
            console.log(e)
        }
    }

    const getStudents = async () => {
        try {

            const data = await request("/api/data/students", "GET", null
                , {Authorization: `Bearer ${localUserID}`})

            if (data.message) {
                toast.info(data.message)
            }
            setStudents(data)

        } catch (e) {
            console.log(e)
        }
    }

    const getUser = async () => {
        try {
            const userID = await localStorage.getItem("userID")
            const data = await request("/api/data/user", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            setUser(data)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <div>
                <Navigation user={user}/>
                <FormRegistry getStudents={getStudents}/>
            </div>

            <div className={"blockStyle"}>

                <Table striped bordered hover size="xs">
                    <thead>
                    <tr>
                        <th>Імʼя учня</th>
                        <th>Клас</th>
                        <th>X</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students && students.map((children, index) => {

                        return (
                            <tr key={index}>
                                <td className={"td"}
                                    onClick={() => {
                                        getStudent(children._id)
                                    }}>
                                    {children.name}
                                </td>
                                <td
                                    onClick={() => {
                                        getStudent(children._id)
                                    }}>
                                    {children.grade}
                                </td>
                                <td style={{cursor: "pointer"}}
                                    onClick={() => {
                                        delStudent(children._id)
                                    }}>
                                    X
                                </td>

                            </tr>
                        )
                    })
                    }
                    </tbody>
                </Table>
            </div>

            <Modal show={show} onHide={HandleClose}>
                <Modal.Header closeButton>
                    <h3>
                        Данні користовача
                    </h3>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
                    <FormStudent student={student} HandleClose={HandleClose}/>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default RegisterAndChange;