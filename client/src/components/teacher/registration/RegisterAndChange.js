import React, {useEffect, useState} from 'react';
import {Container, Nav} from "react-bootstrap";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";
import Navigation from "../Navigation";
import FormQuestions from "../addTestForm/FormQuestions";
import FormRegistry from "./FormRegistry";

const RegisterAndChange = () => {

    const navigate = useNavigate()
    const localUserID = localStorage.getItem("userToken")
    const localUserPosition = localStorage.getItem("userPosition")
    useEffect(() => {
        if (!localUserID || localUserPosition !== "teacher") {
            localStorage.clear()
            navigate('/auth');
        }
        getUser()
    }, [localUserID, navigate])


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
            <div>
                <Navigation user={user}/>
                <FormRegistry/>
            </div>
        </Container>

    );
};

export default RegisterAndChange;