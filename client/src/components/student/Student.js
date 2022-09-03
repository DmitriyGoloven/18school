import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {toast} from "react-toastify";
import {Container, Table} from "react-bootstrap";
import FormTest from "./tests/FormTest";


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


    return (
        <Container>
            {user &&
            <div>
                <h2>{user.name} {user.grade}</h2>
            </div>}
            <br/>
            {dayTest && user && dayTest.map((test, index) => {
                let testReady
                {user.assessment && (testReady = Object.keys(user.assessment).includes(test._id, 0))}
                if (testReady)
                    return (<h3 className={"blockStyle"}
                                key={index}>{`Тест: "${test.theme}" відовіді прийняті на перевірку.`}
                    </h3>)

                return (<div key={index}><FormTest setUser={setUser} userID={userID} test={test}/></div>)

            })
            }
            <h3>Зараховані тести</h3>
            {user && (<Table striped bordered size="sm">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Тема</th>
                </tr>
                </thead>
                <tbody>
                {user.assessment &&
                Object.values(user.assessment).map((test, index) => {
                    return (<tr key={index}>
                        <td>{test.date}</td>
                        <td>{test.theme}</td>
                    </tr>)
                })}
                </tbody>
            </Table>)
            }
        </Container>
    )
}

export default Student


