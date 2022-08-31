import React, {useCallback, useEffect, useState} from 'react';
import {Form, Button, Container} from "react-bootstrap"
import {useHttp} from "../hooks/http.hook";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Auth = () => {

    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: "", password: ""
    })

    const login = useCallback((jwtToken, id, position) => {
        localStorage.setItem("userToken", jwtToken)
        localStorage.setItem("userID", id)
        localStorage.setItem("userPosition", position)
    }, [])


    useEffect(() => {
        if (error) {
            toast.error(`${error}`)
            clearError()
        }
    }, [error, clearError])

    const navigate = useNavigate()

    const localUserID = localStorage.getItem("userToken")
    useEffect(() => {
        if (localUserID){
            const localUserPosition = localStorage.getItem("userPosition")

            localUserPosition === "teacher" ? navigate('/teacher') : navigate('/student')

    }}, [localUserID, navigate])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form})
            login(data.token, data.userId, data.position)
            if (data.message) {
                toast.info(data.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Container fluid={"sm"} style={{padding: "10% 15%"}}>
                <Form>
                    <h3>
                        Вхід
                    </h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Введіть поштову адресу</Form.Label>
                        <Form.Control
                            name={"email"}
                            type="email"
                            placeholder="Enter email"
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Введіть пароль</Form.Label>
                        <Form.Control
                            name={"password"}
                            type="password"
                            placeholder="Password"
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Button
                        onClick={loginHandler}
                        variant="primary"
                        type="submit"
                        disabled={loading}
                    >
                        Увійти
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Auth;