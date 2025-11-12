import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import CheckQuizinCourse from './CheckQuizinCourse';

import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function AssignQuiz() {
    const [quizData, setquizData] = useState([]);
    const [courseData, setcourseData] = useState([]);
    const Swal = require('sweetalert2');
    const teacherId = localStorage.getItem('teacherId');
    const { course_id } = useParams();

    useEffect(() => {
        try {
            axios.get(BASE_URL + 'teacher-quiz/' + teacherId + '/')
                .then((res) => {
                    setquizData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios.get(BASE_URL + 'course/' + course_id + '/')
                .then((res) => {
                    setcourseData(res.data);

                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    //Assign quiz to course
    const assignQuiz = (quiz_id) => {
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('course', course_id);
        _formData.append('quiz', quiz_id);

        try {
            axios.post(`${BASE_URL}quiz-assign-course/`, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Swal.fire({
                            title: 'Quiz is successfully assigned in this course',
                            icon: 'success',
                            toast: true,
                            timer: 10000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });

                    }
                });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <div className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">
                            Assign Quiz <span className="text-primary">({courseData.title})</span>
                        </h5>

                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row, index) =>
                                        <tr>
                                            <td>
                                                <Link to={'/all-questions/' + row.id}>{row.title}</Link>
                                            </td>
                                            <td>
                                                <CheckQuizinCourse quiz={row.id} course={course_id} />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignQuiz;
