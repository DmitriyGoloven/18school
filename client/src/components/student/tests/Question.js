import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {v4 as uuidv4} from "uuid"

const Question = ({number, question, changeHandler}) => {

    // const [answer, setAnswer] = useState({})
    //
    // const changeHandler = (event) => {
    //     setAnswer({...answer, [event.target.name]: event.target.value})
    //     console.log(answer)
    // }

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
                                    onChange={()=>changeHandler(event, number)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} lg={4} md={12}>
                        <Form.Check className={question[`Q${number} A2`] ? "formControl" : "none"}
                                    label={question[`Q${number} A2`]}
                                    type={"radio"}
                                    id={`secondQ${number}`}
                                    name={question[`Q${number}`]}
                                    defaultValue={question[`Q${number} A2`]}
                                    onChange={()=>changeHandler(event, number)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} lg={4} md={12}>
                        <Form.Check className={question[`Q${number} A3`] ? "formControl" : "none"}
                                    label={question[`Q${number} A3`]}
                                    type={"radio"}
                                    id={`thirdQ${number}`}
                                    name={question[`Q${number}`]}
                                    defaultValue={question[`Q${number} A3`]}
                                    onChange={()=>changeHandler(event, number)}
                        />
                    </Form.Group>

                </Row>

            </Form.Group>

    );
};

export default Question;


// <Form className={"blockStyle"}>
//     <h3>
//         Самооцінка учня після уроку
//     </h3>
//     <Form.Check
//         label="Я трошки дурень"
//         name="group"
//         type={"radio"}
//         id={"radio1"}
//         value={"Я трошки дурень"}
//         onChange={handleChange}
//     />
//     <Form.Check
//         label="Мабуть поки зрозуміло"
//         name="group"
//         type={"radio"}
//         id={"radio2"}
//         value={"Мабуть поки зрозуміло"}
//         onChange={handleChange}
//     />
//     <Form.Check
//         label="Я все зрузумів і я молодець)"
//         name="group"
//         type={"radio"}
//         id={"radio3"}
//         value={"Я все зрузумів і я молодець)"}
//         onChange={handleChange}
//     />
//     <Button
//         onClick={saveHandler}
//         variant="secondary"
//         disabled={!value}
//         style={{margin: "10px"}}
//     >
//         Зберігти відповідь
//     </Button>
//
// </Form>