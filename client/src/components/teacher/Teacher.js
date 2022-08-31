import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import FormRegistry from "./FormRegistry";
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import FormQuestions from "./addTestForm/FormQuestions";


const Teacher = () => {

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


    const {loading,request} = useHttp()
    const [user, setUser] = useState([])
    const [students, setStudents] = useState([])
    const [student, setStudent] = useState(null)


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

    const getStudent = async (userID) => {
        try {
            const data = await request("/api/data/user", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            setStudent(data)

        } catch (e) {
            console.log(e)
        }
    }

    const delStudent = async (userID) => {
        try {
            const data = await request("/api/data/userDel", "POST", {userID}
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

    const delAsses = async (index) => {
        const item = {...student}

        item.assessment.splice(index, 1)
        setStudent(item)

        try {

            const data = await request("/api/data/answer", "POST", {assessment: student.assessment, userID: student._id}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message === "Відповідь прийнята") {
                toast.info("Відповідь видалена")
            } else toast.info(data.message)


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


    return (
        <Container>
            <div>
                <h2>{user.name}</h2>
            </div>
            <FormQuestions localUserID={localUserID}/>
            <div className={"blockStyle"}>
            <Row>
                <Col xl={5} md={5} xs={12}>
                    <Table striped bordered hover size="xs">
                        <thead>
                        <tr>
                            <th>Імʼя учня</th>
                            <th>X</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students && students.map((children, index) => {
                            return (
                                <tr key={index}>
                                    <td className={student && children.name === student.name ? "tdActive" : "td"}
                                        onClick={() => {
                                            getStudent(children._id)
                                        }}>
                                        {children.name}
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
                </Col>
                <Col xl={7} md={7} xs={12} style={{textAlign: "center"}}>

                    {student &&
                    <Table striped bordered hover size="xs">
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Відповідь</th>
                            <th>X</th>
                        </tr>
                        </thead>
                        <tbody>
                        {student.assessment.map((asses, index) => {
                            return (
                                <tr key={index}>
                                    <td>{asses[0]}</td>
                                    <td>{asses[1]}</td>
                                    <td style={{cursor: "pointer"}} onClick={() => {
                                        delAsses(index)
                                    }}>X
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>}
                </Col>
            </Row>
            </div>

            <FormRegistry getStudents={getStudents}/>

        </Container>
    );
};

export default Teacher;