import React, {useState} from 'react';
import {FloatingLabel, Form} from "react-bootstrap";

const QuestionFree = ({question, number, changeHandler}) => {

    // const [answer, setAnswer] = useState({})
    //
    // const changeHandler = (event) => {
    //     setAnswer({...answer, [event.target.name]: event.target.value})
    //     console.log(answer)
    // }

    return (

       <div>
            <Form.Label className={"testLabel"}>{question[`Q${number}`]}</Form.Label>

            <FloatingLabel controlId={question[`Q${number}`]} label="Відповідь">
                <Form.Control
                    as="textarea"
                    name={question[`Q${number}`]}
                    placeholder={"Відповідь"}
                    style={{height: '100px'}}
                    onChange={()=>changeHandler(event, number)}
                />
            </FloatingLabel>

       </div>

    );
};

export default QuestionFree;