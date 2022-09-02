import React, {useEffect, useState} from 'react';
import {Form, Button, Container} from "react-bootstrap"
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";

const FormRegistry = ({getStudents}) => {

    const {loading, request} = useHttp()

    const [form, setForm] = useState({
        email: "", password: "", name: "", grade: ""
    })


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form})
            if (data.message) {
                toast.success(data.message)
            }

            if (data) {

                await setForm({...form, email: "", password: "", name: ""})

                document.getElementById("form").reset()
                getStudents()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={"blockStyle"}>
            <Container style={{padding: "3% 10%"}}>
                <Form id={"form"}>
                    <Form.Label><h3>
                        Додати нового учня
                    </h3></Form.Label>

                    <Form.Group className="mb-3">
                        <Form.Label>Email учня</Form.Label>
                        <Form.Control
                            name={"email"}
                            type="email"
                            placeholder="Пошта"
                            onChange={changeHandler}
                        />

                        <Form.Label>Повне ім'я учня</Form.Label>
                        <Form.Control className={"name"}
                            name={"name"}
                            type={"text"}
                            placeholder="Ім'я"
                            onChange={changeHandler}
                        />

                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            name={"password"}
                            // type="password"
                            type="text"
                            placeholder="Пароль"
                            onChange={changeHandler}
                        />

                        <Form.Label>Клас</Form.Label>
                        <Form.Control className={"upperCase"}
                            name={"grade"}
                            type="text"
                            placeholder="5А"
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Button
                        onClick={registerHandler}
                        variant="secondary"
                        size="lg"
                        type="submit"
                        disabled={loading || !form.email || !form.password || !form.name || !form.grade}
                    >
                        Зареєсувати
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default FormRegistry;