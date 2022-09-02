import React, {useCallback, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {v4 as uuidv4} from "uuid"
import AddQuestion from "./AddQuestion";
import AddQuestionFree from "./AddQuestionFree";
import AddQuestionPicker from "./AddQuestionPicker";
import {toast} from "react-toastify";
import {useHttp} from "../../../hooks/http.hook";


const FormQuestions = ({localUserID, getTests}) => {

    const dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0]
    const teacherID = localStorage.getItem("userID")

    const [questions, setQuestions] = useState([])
    const [num, setNum] = useState(0)
    const [form, setForm] = useState({teacherID: teacherID, questions: {}, date: dateNow})

    const {loading, request} = useHttp()


    const changeHandler = (event, numb,type) => {
        // setForm({...form,[event.target.name]: event.target.value})
        let form2 = form
        if (event.target.name === 'grade') {
            event.target.value = event.target.value.toUpperCase()
        }

        if (numb){
            if(form2.questions[`${numb}`]){
                form2.questions[`${numb}`][event.target.name] = event.target.value
                form2.questions[`${numb}`]["type"] = type
            }
            else form2.questions[`${numb}`] = {}
            form2.questions[`${numb}`][event.target.name] = event.target.value
            form2.questions[`${numb}`]["type"] = type
            setForm(form2)

            return
        }
        form2[event.target.name] = event.target.value
        setForm(form2)

    }


// Додаткове питання
    const addQuestion = useCallback(() => {

        let number = num + 1
        const component = <AddQuestion changeHandler={changeHandler} number={number}/>
        setQuestions([...questions, component])
        setNum(number)


    }, [questions, num])

// Додаткове питання з вільною відповіддю
    const addQuestionFree = useCallback(() => {

        let number = num + 1
        const component = <AddQuestionFree changeHandler={changeHandler} number={number}/>
        setQuestions([...questions, component])
        setNum(number)
    }, [questions, num])

// Додаткове питання picker
    const addQuestionPicker = useCallback(() => {

        let number = num + 1
        const component = <AddQuestionPicker changeHandler={changeHandler} number={number}/>
        setQuestions([...questions, component])
        setNum(number)
    }, [questions, num])

    const sendForm = async () => {
        try {

            const data = await request("/api/test/add", "POST", {...form},
                {Authorization: `Bearer ${localUserID}`})
            if (data.message) {
                toast.info(data.message)
            }

            if (data) {
                getTests(teacherID)
                setForm({teacherID: teacherID, questions: {}, date: dateNow})
                setQuestions([])
                setNum(0)

                document.getElementById("formTheme").reset()
            }

        } catch (e) {
            console.log(e)
        }
    }

// return
    return (
        <div>
            <Form id={"formTheme"} className={"blockStyle"}>

                <Form.Label>
                    <h3>
                        Створити опитування для учнів
                    </h3>
                </Form.Label>

                <Row className="mb-3">
                    <Form.Group as={Col} md={3} xs={6} className="mb-3">
                        <Form.Label>Дата</Form.Label>
                        <Form.Control className={"formControl"}
                                      name={"date"}
                                      type="date"
                            defaultValue={dateNow}
                                      onChange={changeHandler}
                        />
                    </Form.Group>


                    <Form.Group as={Col} md={2} xs={6} className="mb-3">
                        <Form.Label>Клас</Form.Label>
                        <Form.Control className={"formControl"}
                                      name={"grade"}
                                      type="text"
                                      placeholder="5А"
                                      onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md={7} xs={12} className="mb-3">
                        <Form.Label>Тема уроку</Form.Label>
                        <Form.Control className={"formControl"}
                                      name={"theme"}
                                      type="text"
                                      row={2}
                                      placeholder="Введіть тему уроку"
                                      onChange={changeHandler}
                        />
                    </Form.Group>

                </Row>
                {questions.map((quest, index) => {
                    return <div key={index}>{quest}</div>

                })}


                <Button className={"button"} variant="outline-secondary" size="md"
                        onClick={addQuestion}
                >
                    Додати питання <br/> (1 з 3 відповідей)
                </Button>

                <Button className={"button"} variant="outline-secondary" size="md"
                        onClick={addQuestionFree}
                >
                    Додати питання<br/> (вільна відповідь)
                </Button>

                <Button className={"button"} variant="outline-secondary" size="md"
                        onClick={addQuestionPicker}
                >
                    Додати питання <br/> (декілька відповідей)
                </Button>


                <div id={"buttonSave"}>
                    <Button
                        onClick={sendForm}
                        variant="secondary"
                        size="lg"
                        // type="submit"
                        className="button"
                        disabled={!form.theme || !form.grade}
                    >
                        Створити опитування
                    </Button>
                </div>


            </Form>
        </div>

    );
}

export default FormQuestions;


