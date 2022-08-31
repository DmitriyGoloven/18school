import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import FormRegistry from "./registration/FormRegistry";
import {Col, Container, Button, Form, Nav, Row, Table} from "react-bootstrap";
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import FormQuestions from "./addTestForm/FormQuestions";
import Navigation from "./Navigation";
import AddQuestion from "./addTestForm/AddQuestion";
import MyTests from "./MyTests";


const Teacher = () => {

    const navigate = useNavigate()
    const localUserID = localStorage.getItem("userToken")
    const localUserPosition = localStorage.getItem("userPosition")
    useEffect(() => {
        if (!localUserID || localUserPosition !== "teacher") {
            localStorage.clear()
            navigate('/auth');
        }
        getUser()
    }, [])


    const {loading, request} = useHttp()
    const [user, setUser] = useState([])


    const getUser = async () => {

        try {
            const userID = await localStorage.getItem("userID")
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

    return (
        <Container>
            <Navigation user={user}/>
            <FormQuestions localUserID={localUserID}/>
            <h2>Мої тести</h2>
            <MyTests localUserID={localUserID}
                     userID={user._id}/>
        </Container>
    );
};

export default Teacher;