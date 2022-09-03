import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import FormQuestions from "./addTestForm/FormQuestions";
import Navigation from "./Navigation";
import MyTests from "./MyTests";
import {useNavigate} from "react-router-dom";

const Teacher = () => {

    const navigate = useNavigate()
    const localUserID = localStorage.getItem("userToken")
    const localUserPosition = localStorage.getItem("userPosition")
    const userID = localStorage.getItem("userID")

    useEffect(() => {
        if (!localUserID || localUserPosition !== "teacher") {
            localStorage.clear()
            navigate('/auth');
        }
        getUser()
    }, [navigate, userID])

    const {loading, request} = useHttp()
    const [user, setUser] = useState([])
    const [tests, setTests] = useState(null)

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

    const getTests = async (userID) => {
        try {
            const data = await request("/api/test/myTests", "POST", {userID}
                , {Authorization: `Bearer ${localUserID}`}
            )

            if (data.message) {
                toast.info(data.message)
            }
            setTests(data)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <Navigation user={user}/>
            <FormQuestions localUserID={localUserID} getTests={getTests}/>
            <h2>Мої тести</h2>
            {user._id && <MyTests userID={userID} getTests={getTests} tests={tests}/>}
        </Container>
    );
};

export default Teacher;