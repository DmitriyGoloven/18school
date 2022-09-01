import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {ToastContainer} from "react-toastify";
import {Routes, BrowserRouter, Route} from "react-router-dom"
import NavBar from "./components/layout/NavBar";
import Teacher from "./components/teacher/Teacher";
import Auth from "./components/Auth";
import Footer from "./components/layout/Footer";
import Student from "./components/student/Student";
import RegisterAndChange from "./components/teacher/registration/RegisterAndChange";
import Assessment from "./components/teacher/assessment/Assessment";

function App() {
    return (
        <div className="App">
            <div className="top">
                <BrowserRouter>
                    <NavBar/>
                    <ToastContainer theme="light"
                                    position="top-center"
                                    autoClose={3000}
                                    hideProgressBar={true}/>
                    <Routes>
                        <Route exact path="/*" element={<Auth/>}/>
                        <Route exact path="/teacher" element={<Teacher/>}/>
                        <Route exact path="/student" element={<Student/>}/>
                        <Route exact path="/register" element={<RegisterAndChange/>}/>
                        <Route exact path="/assessment" element={<Assessment/>}/>
                        <Route exact path="/auth" element={<Auth/>}/>
                    </Routes>


                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
