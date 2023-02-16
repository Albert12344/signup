import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "../Pages/Home"
import Student from "../Pages/Student"
import Teacher from "../Pages/Teacher"
import StudentLogin from "../Login/studentLogin"
import StudentSignup from "../Login/studentSignup"
import TeacherLogin from "../Login/teacherLogin"
import TeacherSignup from "../Login/teacherSignup"
import ResetStudentPassword from "../resetPassword/ResetStudentPassword"
import ResetTeacherPassword from "../resetPassword/ResetTeacherPassword"
import NewStudentPassword from "../updatePassword/NewStudentPass"
import NewTeacherPassword from "../updatePassword/NewTeacherPass"


function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path='student/home' element={<Student/>}/>
              <Route path='teacher/home' element={<Teacher/>}/>
              <Route path="Student/signup" element={<StudentSignup/>}/>
              <Route path="teacher/signup" element={<TeacherSignup/>}/>
              <Route path="student/login" element={<StudentLogin/>}/>
              <Route path="teacher/login" element={<TeacherLogin/>}/>
              <Route path="student/resetpassword" element={<ResetStudentPassword/>}/>
              <Route path="teacher/resetpassword" element={<ResetTeacherPassword/>}/>
              <Route path="student/updatepassword" element={<NewStudentPassword/>}/>
              <Route path="teacher/updatepassword" element={<NewTeacherPassword/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
