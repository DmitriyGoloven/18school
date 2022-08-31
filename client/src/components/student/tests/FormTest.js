import React, {useCallback, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import Question from "./Question";
import QuestionFree from "./QuestionFree";
import QuestionPicker from "./QuestionPicker";
import {useHttp} from "../../../hooks/http.hook";


const FormTest = ({test, userID}) => {

    const dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0]

    const [answer, setAnswer] = useState({testID: test._id, theme: test.theme, date: dateNow, answers: {}})


    const {loading, request} = useHttp()

    const localUserID = localStorage.getItem("userToken")

    // const changeHandler =(event, number)=>{
    //     // console.log({...answer, [event.target.name]: event.target.value})
    //     setAnswer({...answer, [event.target.name]: event.target.value})
    //     console.log({...answer})
    // }

    const changeHandler = (event, number, pickerName) => {

        console.log([event.target.name], event.target.value, event.target.checked, pickerName)
        let answer2 = answer
        if (pickerName) {
            if (event.target.checked && answer2.answers[pickerName]) {
                answer2.answers[pickerName][event.target.name] = event.target.value

            } else if (event.target.checked && !answer2.answers[pickerName]){
                answer2.answers[pickerName] = {}
                answer2.answers[pickerName][event.target.name] = event.target.value
            }
            else if (!event.target.checked ){
               delete answer2.answers[pickerName][event.target.name]
            }
            setAnswer(answer2)
            console.log(answer)
            return
        }

        answer2.answers[event.target.name] = event.target.value
        setAnswer(answer2)
        console.log(answer)
    }

    const saveHandler = async () => {
        try {
            const date = new Date().toLocaleString()


            const data = await request("/api/data/answer", "POST",
                {assessment: answer, userID: userID},
                {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }


        } catch (e) {
            console.log(e)
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
                        onClick={() => {
                        }}
                        variant="secondary"
                        size="lg"
                        // type="submit"
                        className="button"
                        // disabled={}
                    >
                        Зберегти відповіді
                    </Button>
                </div>
            </Form>

        </div>
    )
}
export default FormTest

