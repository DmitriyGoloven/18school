import React, {useState} from 'react';
import {useHttp} from "../../../hooks/http.hook";
import {toast} from "react-toastify";
import {Button, Container, Form} from "react-bootstrap";

const FormStudent = ({student, HandleClose}) => {

    const {loading, request} = useHttp()
    const localUserID = localStorage.getItem("userToken")
    const [form, setForm] = useState({
        email: student.email, name: student.name,
        grade: student.grade, position: student.position, userID: student._id
    })


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changeRegisterHandler = async () => {
        try {

            if (!form.password && form.password === "") delete form.password

            const data = await request("/api/auth/change", "POST", {...form},
                {Authorization: `Bearer ${localUserID}`})
            if (data.message || data.message === "Данні збережено") {
                toast.info(data.message)
                HandleClose()
            } else toast.info(data.message)

        } catch (e) {
            console.log(e)
        }
    }

    return (

        <Form>
            <Form.Group className="mb-3">
                <Form.Label className={"testLabel"}>Email учня</Form.Label>
                <Form.Control
                    name={"email"}
                    type="email"
                    defaultValue={student.email}
                    onChange={changeHandler}
                />

                <Form.Label className={"testLabel"}>Повне ім'я учня</Form.Label>
                <Form.Control
                              name={"name"}
                              type={"text"}
                              defaultValue={student.name}
                              onChange={changeHandler}
                />

                <Form.Label className={"testLabel"}>Пароль</Form.Label>
                <Form.Control
                    name={"password"}
                    type="text"
                    placeholder={"Змінити пароль"}
                    onChange={changeHandler}
                />

                <Form.Label className={"testLabel"}>Клас</Form.Label>
                <Form.Control className={"upperCase"}
                              name={"grade"}
                              type="text"
                              defaultValue={student.grade}
                              onChange={changeHandler}
                />

                <Form.Label className={"testLabel"}>student або teacher</Form.Label>
                <Form.Select name={"position"} defaultValue={"student"} onChange={changeHandler}>
                    <option name={"position"}
                            value="student">student
                    </option>
                    <option name={"position"}
                            value="teacher">teacher
                    </option>
                </Form.Select>
            </Form.Group>

            <Button
                onClick={changeRegisterHandler}
                variant="secondary"
                size="lg"
            >
                Зберегти данні
            </Button>
        </Form>
    );
};

export default FormStudent;