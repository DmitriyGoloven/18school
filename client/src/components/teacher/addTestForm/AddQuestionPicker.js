import React, {useCallback, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const AddQuestionPicker = ({number, changeHandler}) => {
const type = "picker"
  return (
        <div>
            <Form.Label className={"testLabel"}>Питання {number}</Form.Label>
            <Form.Control className={"formControl"}
                          name={`Q${number} P`}
                          type={"text"}
                          placeholder={`Введіть питання (${number})`}
                          onChange={()=>changeHandler(event,number, type)}
            />

            <Row className="mb-3">
                <Form.Group as={Col} lg={3} md={12} controlId={`firstQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A1`}
                                  type={"text"}
                                  placeholder="Відповідь 1"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`secondQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A2`}
                                  type={"text"}
                                  placeholder="Відповідь 2"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`thirdQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A3`}
                                  type={"text"}
                                  placeholder="Відповідь 3"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`thirdQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A4`}
                                  type={"text"}
                                  placeholder="Відповідь 4"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} lg={3} md={12} controlId={`firstQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A5`}
                                  type={"text"}
                                  placeholder="Відповідь 5"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`secondQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A6`}
                                  type={"text"}
                                  placeholder="Відповідь 6"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`thirdQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A7`}
                                  type={"text"}
                                  placeholder="Відповідь 7"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`thirdQ${number}`}>
                    <Form.Control className={"formControl"}
                                  name={`Q${number} P A8`}
                                  type={"text"}
                                  placeholder="Відповідь 8"
                                  onChange={()=>changeHandler(event,number,type)}
                    />
                </Form.Group>

            </Row>
        </div>

    );
};

export default AddQuestionPicker;