import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "../Pages/Home"
import Student from "../student/Student"
import Teacher from "../teacher/Teacher"
import StudentLogin from "../Login/studentLogin"
import StudentSignup from "../Login/studentSignup"
import TeacherLogin from "../Login/teacherLogin"
import TeacherSignup from "../Login/teacherSignup"
import ResetStudentPassword from "../resetPassword/ResetStudentPassword"
import ResetTeacherPassword from "../resetPassword/ResetTeacherPassword"
import Admin from "../student/Admin";
import ProtectedRoutes from "../Pages/ProtectedRoutes";
import CreateQuiz from "../teacher/CreateQuiz";
import Title from "../teacher/Title";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="student/signup" element={<StudentSignup/>}/>
              <Route path="teacher/signup" element={<TeacherSignup/>}/>
              <Route path="student/login" element={<StudentLogin/>}/>
              <Route path="teacher/login" element={<TeacherLogin/>}/>
              <Route element={<ProtectedRoutes/>}>
                <Route exact path="student/home" element={<Student/>}/>
                <Route exact path="teacher/home"  element={<Teacher/>}/>
                <Route exact path="student/home/admin" element={<Admin/>}/>
                <Route exact path="teacher/home/title" element={<Title/>}/>
                <Route exact path="teacher/home/create" element={<CreateQuiz/>}/>
              </Route>
              <Route path="student/resetpassword" element={<ResetStudentPassword/>}/>
              <Route path="teacher/resetpassword" element={<ResetTeacherPassword/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
