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

            if (data.message) {
                toast.info(data.message)
            }

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
                        <Row>
                            <Col sm={1} md={1}>{index}</Col>
                            <Col sm={9} md={7}>{student.name}</Col>
                            <Col sm={2} md={4}>{student.grade}</Col>
                        </Row>
                    </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body>
                        <Table striped bordered hover size="xs">
                            <thead>
                            <tr>
                                <th>Дата тесту</th>
                                <th>Тема тесту</th>
                                <th>X</th>
                            </tr>
                            </thead>
                            <tbody>
                            {assessment && Object.values(assessment).map((test, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={() => {
                                            setTest(test)
                                            HandleShow()
                                        }}>

                                            {test.date}
                                        </td>
                                        <td onClick={() => {
                                            setTest(test)
                                            HandleShow()
                                        }}>

                                            {test.theme}
                                        </td>
                                        <td style={{cursor: "pointer"}}
                                            onClick={() => {
                                                delStudentAssess(test.testID, student)
                                            }}>
                                            X
                                        </td>

                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default According;