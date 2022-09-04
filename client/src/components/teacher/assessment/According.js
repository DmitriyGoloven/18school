import React, {useState} from 'react';
import {Accordion, Card, Col, Row, Table, useAccordionButton} from "react-bootstrap";
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";

const According = ({student, index, setTest, HandleShow}) => {

    const localUserID = localStorage.getItem("userToken")

    const [assessment, setAssessment] = useState(null)
    const {loading, request} = useHttp()

    const getStudentAssess = async (userID) => {
        try {
            const data = await request("/api/data/user", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            data.assessment && setAssessment(data.assessment)

        } catch (e) {
            console.log(e)
        }
    }

    const delStudentAssess = async (testID, userID) => {

        delete assessment[testID]

        try {
            const data = await request("/api/data/answer", "POST", {assessment, userID}
                , {Authorization: `Bearer ${localUserID}`})

            if (data.message && data.message === "Відповідь прийнята") {
                toast.info("Тест видалено")
            } else toast.info(data.message)

        } catch (e) {
            console.log(e)
        }
    }

    function CustomToggle({children, eventKey, student}) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            getStudentAssess(student._id),
        );

        return (
            <div style={{marginBottom: "0"}}
                 onClick={decoratedOnClick}
            >
                {children}
            </div>
        );
    }

    return (
        <Accordion style={{cursor: "pointer"}}>
            <Card className={"studentAssess"}>
                <Card.Header>
                    <CustomToggle eventKey={index} student={student}>
                        <Row >
                            <Col xs={3} md={2}>{index + 1}</Col>
                            <Col xs={7} md={8}>{student.name}</Col>
                            <Col xs={2} md={2}>{student.grade}</Col>
                        </Row>
                    </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body>

                        <Row className={"table"} style={{fontWeight: "600"}}>
                            <Col xs={3} md={2}>Дата тесту</Col>
                            <Col xs={7} md={8}>Тема тесту</Col>
                            <Col xs={2} md={2}>X</Col>
                        </Row>


                        {assessment && Object.values(assessment).map((test, index) => {
                            return (
                                <Row className={"table"} key={index}>
                                    <Col xs={3} md={2} onClick={() => {
                                        setTest(test)
                                        HandleShow()
                                    }}>

                                        {test.date}
                                    </Col>
                                    <Col xs={7} md={8} onClick={() => {
                                        setTest(test)
                                        HandleShow()
                                    }}>

                                        {test.theme}
                                    </Col>
                                    <Col xs={2} md={2} style={{cursor: "pointer"}}
                                         onClick={() => {
                                             delStudentAssess(test.testID, student)
                                         }}>
                                        X
                                    </Col>

                                </Row>
                            )
                        })}


                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default According;