import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import {Col, Container, Row, Table} from "react-bootstrap";
import Navigation from "./Navigation";

const MyTests = ({userID,localUserID}) => {

    const [tests, setTests] = useState(null)




    const {loading,request} = useHttp()

    const getTests =useCallback( async (userID) => {
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
    },[tests])

    const delTest = async (testID) => {
        try {
            const data = await request("/api/test/testDel", "DELETE", {testID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            getTests().then()

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        getTests(userID)
    }, [userID,loading])

    return (
        <Container>

            <div className={"blockStyle"}>
                <Row>
                    <Col >
                        <Table striped bordered hover size="xl">
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
                                        <td className={ "td"}>

                                            {test.date}
                                        </td>
                                        <td className={ "td"}>

                                            {test.grade}
                                        </td>
                                        <td className={ "td"}>

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