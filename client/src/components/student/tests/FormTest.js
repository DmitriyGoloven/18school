import React, {useCallback, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import Question from "./Question";
import QuestionFree from "./QuestionFree";
import QuestionPicker from "./QuestionPicker";
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";

const FormTest = ({test, userID, setUser}) => {

    const dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0]

    const [answer, setAnswer] = useState({testID: test._id, theme: test.theme, date: dateNow, answers: {}})

    const {loading, request} = useHttp()

    const localUserID = localStorage.getItem("userToken")

    const changeHandler = (event, number, pickerName) => {

        let answer2 = answer
        if (pickerName) {
            if (event.target.checked && answer2.answers[pickerName]) {
                answer2.answers[pickerName][event.target.name] = event.target.value

            } else if (event.target.checked && !answer2.answers[pickerName]) {
                answer2.answers[pickerName] = {}
                answer2.answers[pickerName][event.target.name] = event.target.value
            } else if (!event.target.checked) {
                delete answer2.answers[pickerName][event.target.name]
            }
            setAnswer(answer2)

            return
        }

        answer2.answers[event.target.name] = event.target.value
        setAnswer(answer2)

    }

    const saveHandler = async () => {
        try {

            const dataUser = await request("/api/data/user", "post", {userID},
                {Authorization: `Bearer ${localUserID}`})
            const userAnswers = dataUser.assessment

            const assess = {...userAnswers, [answer.testID]: answer}

            const user = {...dataUser, assessment: assess}
            const data = await request("/api/data/answer", "POST",
                {assessment: assess, userID: userID},
                {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            if (data.message === "Відповідь прийнята") setUser(user)


        } catch (e) {
            alert(e)
        }
    }

    const quest = useCallback((questions) => {

        return Object.entries(questions).map((q, index) => {

            switch (q[1].type) {
                case 'default':
                    return <div key={index}><Question changeHandler={changeHandler}
                                                      question={q[1]}
                                                      number={q[0]}
                    /></div>
                case 'free':
                    return <div key={index}><QuestionFree changeHandler={changeHandler}
                                                          question={q[1]}
                                                          number={q[0]}
                    /></div>
                case 'picker':
                    return <div key={index}><QuestionPicker changeHandler={changeHandler}
                                                            question={q[1]}
                                                            number={q[0]}
                    /></div>
                default:
                    return <p>Тестів сьогодні немає</p>
            }
        })
    }, [])

    return (
        <div>


            <Form className={"blockStyle"}>
                <h3>
                    {test.theme}
                </h3>
                <h4>
                    {test.date}
                </h4>
                {quest(test.questions)}

                <div>
                    <Button
                        onClick={saveHandler}
                        variant="secondary"
                        size="lg"
                        className="button"
                    >
                        Зберегти відповіді
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default FormTest

