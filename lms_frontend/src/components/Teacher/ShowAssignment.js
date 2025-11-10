import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function ShowAssignment() {
    const [assignmentData, setassignmentData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const { student_id } = useParams();
    const { teacher_id } = useParams();


    useEffect(() => {
        try {
            axios.get(BASE_URL + 'student-assignment/' + teacher_id + '/'+ student_id +'/')
                .then((res) => {
                    settotalResult(res.data.length);
                    setassignmentData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    // Delete Data
    const Swal = require('sweetalert2');
 
    return (
        <div className="container mt-4">
            <div className="row">
                {/* Cột bên trái: Menu điều hướng Dashboard */}
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                {/* Cột bên phải: Nội dung My Courses */}
                <div className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Assignment({totalResult}) <Link className="btn btn-success btn-sm float-end" to={`/add-assignment/${student_id}/${teacher_id}`}>Add Assignment</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignmentData.map((chapter, index) =>

                                        <tr>
                                            <td>{chapter.title}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShowAssignment;