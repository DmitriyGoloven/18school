import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import AssesList from "../layout/assesList";


const Children = () => {

    const navigate = useNavigate()
    const localUserID = localStorage.getItem("userToken")
    const localUserPosition = localStorage.getItem("userPosition")
    const userID = localStorage.getItem("userID")
    useEffect(() => {
        if (!localUserID || localUserPosition !== "student") {
            localStorage.clear()
            navigate('/auth');
        }
        getUser()

    }, [localUserID, navigate])


    const {loading, request} = useHttp()
    const [user, setUser] = useState({})
    const [value, setValue] = useState(null)

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

    const handleChange = (e) => {
        setValue(e.target.value)

    }

    const saveHandler = async () => {
        try {
            const date = new Date().toLocaleString()
            user.assessment.push([date, value])

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

    return (
        <Container>
            <div>
                <h2>{user.name}</h2>
                {/*<p>{user.email}</p>*/}
                {/*<p>{user.position}</p>*/}
            </div>
            <br/>


            <Form className={"blockStyle"}>
                <h3>
                    Самооцінка учня після уроку
                </h3>
                <Form.Check
                    label="Я трошки дурень"
                    name="group"
                    type={"radio"}
                    id={"radio1"}
                    value={"Я трошки дурень"}
                    onChange={handleChange}
                />
                <Form.Check
                    label="Мабуть поки зрозуміло"
                    name="group"
                    type={"c"}
                    id={"radio2"}
                    value={"Мабуть поки зрозуміло"}
                    onChange={handleChange}
                />
                <Form.Check
                    label="Я все зрузумів і я молодець)"
                    name="group"
                    type={"radio"}
                    id={"radio3"}
                    value={"Я все зрузумів і я молодець)"}
                    onChange={handleChange}
                />
                <Button
                    onClick={saveHandler}
                    variant="secondary"
                    disabled={!value}
                    style={{margin: "10px"}}
                >
                    Зберігти відповідь
                </Button>

            </Form>

            <div className={"blockStyle"}>
                <AssesList assessment={user.assessment}/>
            </div>


        </Container>
    );
};

export default Children;