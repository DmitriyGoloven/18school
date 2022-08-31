import React, {useCallback, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import Question from "./Question";
import QuestionFree from "./QuestionFree";
import QuestionPicker from "./QuestionPicker";
import {useHttp} from "../../../hooks/http.hook";


const FormTest = ({test, userID}) => {
    const [answer, setAnswer] = useState({})

    const {loading, request} = useHttp()

    const localUserID = localStorage.getItem("userToken")

    const changeHandler =(event, number)=>{
        console.log({...answer, [event.target.name]: event.target.value})
        setAnswer({...answer, [event.target.name]: event.target.value})
    }

    const saveHandler = async () => {
        try {
            const date = new Date().toLocaleString()


            const data = await request("/api/data/answer", "POST",
                {assessment: user.assessment, userID: userID},
                {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }


        } catch (e) {
            console.log(e)
        }
    }

    const quest = useCallback( (questions) => {

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
    },[])


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
                    onClick={()=>{}}
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

