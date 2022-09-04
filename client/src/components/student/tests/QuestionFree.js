import React from 'react';
import {FloatingLabel, Form} from "react-bootstrap";

const QuestionFree = ({question, number, changeHandler}) => {

    return (
        <div>
            <Form.Label className={"testLabel"}>{question[`Q${number}`]}</Form.Label>

            <FloatingLabel controlId={question[`Q${number}`]} label="Відповідь">
                <Form.Control
                    as="textarea"
                    name={number+"."+question[`Q${number}`]}
                    placeholder={"Відповідь"}
                    style={{height: '100px'}}
                    onChange={() => changeHandler(event, number)}
                />
            </FloatingLabel>
        </div>
    );
};

export default QuestionFree;