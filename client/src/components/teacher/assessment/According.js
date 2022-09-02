import React, {useState} from 'react';
import {Accordion, Card, Table, useAccordionButton} from "react-bootstrap";
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";

const According = ({student, index}) => {

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

            console.log(assessment)

        } catch (e) {
            console.log(e)
        }
    }


    function CustomToggle({children, eventKey}) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            getStudentAssess(student._id),
        );

        return (
            <p

                // className={"studentAssess"}
                onClick={decoratedOnClick}
            >
                {children}
            </p>
        );
    }

    return (
        <Accordion key={index}>
            <Card key={index} className={"studentAssess"}>
                <Card.Header key={index}>
                    <CustomToggle eventKey={index}>
                        {student.name + " " + student.grade}
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
                                        <td>

                                            {test.date}
                                        </td>
                                        <td>

                                            {test.theme}
                                        </td>
                                        <td style={{cursor: "pointer"}}
                                            onClick={() => {
                                                // delTest(test._id)
                                            }}>
                                            X
                                        </td>

                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>

                        {/*<p key={index}>{test.date} {test.theme}</p>*/}
                        {/*)*/}
                        {/*})}*/}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default According;