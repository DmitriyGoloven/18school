import React, {useEffect, useState} from 'react';
import {Col, Container, Nav, Row, Table} from "react-bootstrap";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";
import Navigation from "../Navigation";
import FormQuestions from "../addTestForm/FormQuestions";
import FormRegistry from "./FormRegistry";

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

    const getStudent = async (userID) => {
        try {
            const data = await request("/api/data/user", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            // setStudent(data)
            console.log(data)

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
                , {Authorization: `Bearer ${localUserID}`}
            )

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
                <FormRegistry/>
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
                                        <td className={"td"}
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
                            })}
                            </tbody>
                        </Table>

            </div>

        </Container>

    );
};

export default RegisterAndChange;