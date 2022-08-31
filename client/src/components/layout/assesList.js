import React from 'react';
import {Container, Table} from "react-bootstrap";

const AssesList = ({assessment}) => {

    return (
        <Container fluid>
            <Table striped bordered hover size="xs" >
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Відповідь</th>
                </tr>
                </thead>
                <tbody>
                {assessment && assessment.map((asses, index) => {
                    return (
                        <tr key={index}>
                            <td>{asses[0]}</td>
                            <td>{asses[1]}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Container>
    );


};

export default AssesList;