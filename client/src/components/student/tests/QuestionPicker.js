import React from 'react';
import {Col, Form, Row} from "react-bootstrap";

const QuestionPicker = ({question, number, changeHandler, testID}) => {

    const questionName = number+"."+ question[`Q${number} P`]
    return (
        <div>
            <Form.Label className={"testLabel"}>{question[`Q${number} P`]}</Form.Label>

            <Row className="mb-3">
                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A1 ${testID}`}>
                    <Form.Check className={question[`Q${number} P A1`] ? "formControl" : "none"}
                                label={question[`Q${number} P A1`]}
                                type={"checkbox"}
                                id={`Q${number} P A1 ${testID}`}
                                name={`Q${number} P A1`}
                                defaultValue={question[`Q${number} P A1`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A2 ${testID}`}>
                    <Form.Check className={question[`Q${number} P A2`] ? "formControl" : "none"}
                                label={question[`Q${number} P A2`]}
                                type={"checkbox"}
                                id={`Q${number} P A2 ${testID} `}
                                name={`Q${number} P A2`}
                                defaultValue={question[`Q${number} P A2`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />

                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A3 ${testID}`}>
                    <Form.Check className={question[`Q${number} P A3`] ? "formControl" : "none"}
                                label={question[`Q${number} P A3`]}
                                type={"checkbox"}
                                id={`Q${number} P A3 ${testID}`}
                                name={`Q${number} P A3`}
                                defaultValue={question[`Q${number} P A3`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A4 ${testID}`} >
                    <Form.Check className={question[`Q${number} P A4`] ? "formControl" : "none"}
                                label={question[`Q${number} P A4`]}
                                type={"checkbox"}
                                id={`Q${number} P A4 ${testID}`}
                                name={`Q${number} P A4`}
                                defaultValue={question[`Q${number} P A4`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A5 ${testID}`}>
                    <Form.Check className={question[`Q${number} P A5`] ? "formControl" : "none"}
                                label={question[`Q${number} P A5`]}
                                type={"checkbox"}
                                id={`Q${number} P A5 ${testID}`}
                                name={`Q${number} P A5`}
                                defaultValue={question[`Q${number} P A5`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A6 ${testID}`}>
                    <Form.Check className={question[`Q${number} P A6`] ? "formControl" : "none"}
                                label={question[`Q${number} P A6`]}
                                type={"checkbox"}
                                id={`Q${number} P A6 ${testID}`}
                                name={`Q${number} P A6`}
                                defaultValue={question[`Q${number} P A6`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A7 ${testID}`}>
                    <Form.Check className={question[`Q${number} P A7`] ? "formControl" : "none"}
                                label={question[`Q${number} P A7`]}
                                type={"checkbox"}
                                id={`Q${number} P A7 ${testID}`}
                                name={`Q${number} P A7`}
                                defaultValue={question[`Q${number} P A7`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />
                </Form.Group>

                <Form.Group as={Col} lg={3} md={12} controlId={`Q${number} P A8 ${testID}`}>
                    <Form.Check className={question[`Q${number} P A8`] ? "formControl" : "none"}
                                label={question[`Q${number} P A8`]}
                                type={"checkbox"}
                                id={`Q${number} P A8 ${testID}`}
                                name={`Q${number} P A8`}
                                defaultValue={question[`Q${number} P A8`]}
                                onChange={() => changeHandler(event, number, questionName)}
                    />
                </Form.Group>
            </Row>
        </div>
    )
}

export default QuestionPicker;