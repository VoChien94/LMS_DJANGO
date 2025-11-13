import SideBar from "./SideBar";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function CourseQuizList() {
    const [quizData, setquizData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    const { course_id } = useParams();
    // fetch student when page load
    useEffect(() => {
        try {
            axios.get(BASE_URL + 'fetch-assigned-quiz/' + course_id + '/')
                .then((res) => {
                    setquizData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Cột bên trái: Menu điều hướng Dashboard */}
                <aside className="col-md-3">
                    <SideBar />
                </aside>

                {/* Cột bên phải: Nội dung My Courses */}
                <div className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Quiz List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Quiz</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row, index) =>
                                        <tr>
                                            <td>
                                                {row.quiz.title}
                                            </td>
                                            <td>
                                                <Link className='btn btn-warning btn-sm' to={'/take-quiz/' + row.quiz.id}>Take Quiz</Link>
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

export default CourseQuizList;
