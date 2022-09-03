import React from 'react';
import {Col, Form, Row} from "react-bootstrap";


const Question = ({number, question, changeHandler}) => {

    return (
        <Form.Group key={number} className="mb-3">
            <Form.Label className={"testLabel"}> {question[`Q${number}`]} </Form.Label>

            <Row className="mb-3">
                <Form.Group as={Col} lg={4} md={12}>
                    <Form.Check className={question[`Q${number} A1`] ? "formControl" : "none"}
                                label={question[`Q${number} A1`]}
                                type={"radio"}
                                id={`firstQ${number} A`}
                                name={question[`Q${number}`]}
                                defaultValue={question[`Q${number} A1`]}
                                onChange={() => changeHandler(event, number)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={4} md={12}>
                    <Form.Check className={question[`Q${number} A2`] ? "formControl" : "none"}
                                label={question[`Q${number} A2`]}
                                type={"radio"}
                                id={`secondQ${number}`}
                                name={question[`Q${number}`]}
                                defaultValue={question[`Q${number} A2`]}
                                onChange={() => changeHandler(event, number)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={4} md={12}>
                    <Form.Check className={question[`Q${number} A3`] ? "formControl" : "none"}
                                label={question[`Q${number} A3`]}
                                type={"radio"}
                                id={`thirdQ${number}`}
                                name={question[`Q${number}`]}
                                defaultValue={question[`Q${number} A3`]}
                                onChange={() => changeHandler(event, number)}
                    />
                </Form.Group>
            </Row>
        </Form.Group>
    );
};

export default Question;

