import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import {Col, Container, Row, Table} from "react-bootstrap";


const MyTests = ({userID, localUserID}) => {

    const [tests, setTests] = useState(null)

    document.getElementById("buttonSave").
    addEventListener("mousedown",()=>{console.log("click")})

    const {loading, request} = useHttp()

    const getTests = async (userID) => {
        console.log("FGettest s14")
        try {
            const data = await request("/api/test/myTests", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            setTests(data)

        } catch (e) {
            console.log(e)
        }
    }

    const delTest = async (testID) => {
        try {
            const data = await request("/api/test/testDel", "DELETE", {testID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            getTests(userID).then(() => {
                console.log("Fdel s38")
            })

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTests(userID).then(() => {
            console.log("useefect s47")
        })
    }, [])

    return (
        <Container>

            <div className={"blockStyle"}>
                <Row>
                    <Col>
                        <Table striped bordered hover size="xs">
                            <thead>
                            <tr>
                                <th>Дата тесту</th>
                                <th>Клас</th>
                                <th>Тема тесту</th>
                                <th>X</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tests && tests.map((test, index) => {
                                return (
                                    <tr key={index}>
                                        <td >

                                            {test.date}
                                        </td>
                                        <td >

                                            {test.grade}
                                        </td>
                                        <td >

                                            {test.theme}
                                        </td>
                                        <td style={{cursor: "pointer"}}
                                            onClick={() => {
                                                delTest(test._id)
                                            }}>
                                            X
                                        </td>

                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>

        </Container>
    );
};

export default MyTests;