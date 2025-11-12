import SideBar from "./SideBar";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function CourseQuizList() {
    const [couseData, setcouseData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    // fetch student when page load
    useEffect(() => {
        try {
            axios.get(BASE_URL + 'fetch-enrolled-courses/' + studentId + '/')
                .then((res) => {
                    setcouseData(res.data);
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
                                    <tr>
                                        <td>Python Quiz</td>
                                        <td className="text-success">Attempted</td>
                                    </tr>
                                    <tr>
                                        <td>Django Quiz</td>
                                        <td> <Link className='btn btn-sm btn-warning' to={`/take-quiz/1`}>Take Quiz</Link></td>
                                    </tr>

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
