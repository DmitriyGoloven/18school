import React from 'react';
import {Col, Form, Row, Button} from "react-bootstrap";

const AddQuestion = ({number, changeHandler}) => {
    const type = "default"
    return (
        <div>
            <Form.Group key={number} className="mb-3">
                <Form.Label className={"testLabel"}> Питання {number} </Form.Label>
                <Form.Control className={"formControl"}
                              name={`Q${number}`}
                              type={"text"}
                              placeholder={`Введіть питання (${number})`}
                              onChange={() => changeHandler(event, number, type)}
                />

                <Row className="mb-3">
                    <Form.Group as={Col} lg={4} md={12} controlId={`firstQ${number}`}>
                        <Form.Control className={"formControl"}
                                      name={`Q${number} A1`}
                                      type={"text"}
                                      placeholder="Відповідь 1"
                                      onChange={() => changeHandler(event, number, type)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} lg={4} md={12} controlId={`secondQ${number}`}>
                        <Form.Control className={"formControl"}
                                      name={`Q${number} A2`}
                                      type={"text"}
                                      placeholder="Відповідь 2"
                                      onChange={() => changeHandler(event, number, type)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} lg={4} md={12} controlId={`thirdQ${number}`}>
                        <Form.Control className={"formControl"}
                                      name={`Q${number} A3`}
                                      type={"text"}
                                      placeholder="Відповідь 3"
                                      onChange={() => changeHandler(event, number, type)}
                        />
                    </Form.Group>
                </Row>
            </Form.Group>
        </div>
    );
};

export default AddQuestion;

