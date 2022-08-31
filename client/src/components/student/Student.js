import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import AssesList from "../layout/assesList";
import FormTest from "./tests/FormTest";
import Question from "./tests/Question";
import QuestionFree from "./tests/QuestionFree";
import QuestionPicker from "./tests/QuestionPicker";


const Student = () => {

    const navigate = useNavigate()
    const localUserID = localStorage.getItem("userToken")
    const localUserPosition = localStorage.getItem("userPosition")
    const userID = localStorage.getItem("userID")

    const [user, setUser] = useState(null)
    const [dayTest, setDayTest] = useState([])

    useEffect(() => {
        if (!localUserID || localUserPosition !== "student") {
            localStorage.clear()
            navigate('/auth');
        }
        getUser()
    }, [])


    const {loading, request} = useHttp()


    const dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0]

    const getUser = async () => {
        try {

            const data = await request("/api/data/user", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            setUser(data)



        } catch (e) {
            console.log(e)
        }
    }

    const getTests = async () => {
        try {

            const data = await request("/api/test/dayTest", "POST",
                {userID: userID, grade: user.grade, date: dateNow}
                , {Authorization: `Bearer ${localUserID}`}
            )
            if (data.message) {
                toast.info(data.message)
            }
            setDayTest(data.tests)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (user) {
            getTests()
        }
    }, [user])



    // const saveHandler = async () => {
    //     try {
    //         const date = new Date().toLocaleString()
    //         user.assessment.push([date, value])
    //
    //         const data = await request("/api/data/answer", "POST",
    //             {assessment: user.assessment, userID: userID},
    //             {Authorization: `Bearer ${localUserID}`}
    //         )
    //
    //         if (data.message) {
    //             toast.info(data.message)
    //         }
    //
    //
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <Container>
            {user &&
            <div>
                <h2>{user.name} {user.grade}</h2>
            </div>}
            <br/>


            {dayTest && dayTest.map((test, index)=>{
               return (<div key={index}><FormTest userID={userID} test={test}/></div>)

            })}

            {/*{user && <div className={"blockStyle"}>*/}
            {/*    <AssesList assessment={user.assessment}/>*/}
            {/*</div>}*/}

        </Container>
    )
}

export default Student;