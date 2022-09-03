import React, {useEffect, useState} from 'react';
import {Accordion, Card, Col, Container, Modal, Nav, Row, Table, useAccordionButton} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";
import Navigation from "../Navigation";
import According from "./According";


const Assessment = () => {

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
    const [test, setTest] = useState(null)
    const [show, setShow] = useState(false)

    const HandleClose = () => setShow(false)
    const HandleShow = () => setShow(true)


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
            <Navigation user={user}/>
            <div className={"blockStyle"}>
                {students && students.map((student, index) => {

                    return (
                        <According key={index} setTest={setTest} HandleShow={HandleShow} student={student} index={index}/>
                    )

                })}
            </div>

            {test && <> <Modal size="lg" show={show} onHide={HandleClose}>
                <Modal.Header closeButton >
                   <h3>{test.theme}</h3>
                </Modal.Header>
                <Modal.Body >

                    <Row key={test._id} className={"blockStyle"}>
                        {Object.entries(test.answers).map((answer, index) => {
                            return (<>
                                <Row key={index}>
                                    <h3>{index+1}) {answer[0]}</h3>
                                </Row>
                                <Row key={index+1} style={{backgroundColor: "white", marginLeft: "0px", borderRadius: "10px"}}>
                                    <span key={index -1} style={{textAlign:"center", fontSize: "1.4em"}}>{typeof answer[1] === "string" ? answer[1] :
                                        Object.values(answer[1]).map((ans,index)=>{return (<p key={index}>` ${ans}; `</p>)})
                                    }</span>
                                </Row>
                            </>)
                        })}
                    </Row>
                </Modal.Body>


                    </Modal>
                    </>}

        </Container>
    );
};

export default Assessment;