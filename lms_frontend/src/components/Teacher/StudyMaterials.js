import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function StudyMaterials() {
    const [studyData, setstudyData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const { course_id } = useParams();


    useEffect(() => {
        try {
            axios.get(BASE_URL + 'study-materials/' + course_id + '/')
                .then((res) => {
                    settotalResult(res.data.length);
                    setstudyData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    // Delete Data
    const Swal = require('sweetalert2');
    const handleDeleteClick = (study_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(BASE_URL + 'study-material/' + study_id + '/')

                        .then((res) => {
                            Swal.fire('success', 'Data has been deleted.');
                            try {
                                axios.get(BASE_URL + 'study-materials/' + course_id + '/')
                                    .then((res) => {
                                        settotalResult(res.data.length);
                                        setstudyData(res.data);
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                        });
                        
                } catch (error) {
                    Swal.fire('error', 'Data has not been deleted!');
                }
            } else {
                Swal.fire('error', 'Data has not been deleted!');
            }
        });
    };

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
                        <h5 className="card-header">All Study Materials({totalResult}) <Link className="btn btn-success btn-sm float-end" to={`/add-study/`+course_id}>Add Study Material</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Upload</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studyData.map((row, index) =>

                                        <tr>
                                            <td>{row.title}</td>
                                            <td>
                                               <Link to={`/${row.upload}`}>File</Link>
                                            </td>
                                            <td>
                                                {row.remarks}
                                            </td>
                                            <td>
                                                
                                                <button onClick={() => handleDeleteClick(row.id)} className='btn btn-sm btn-danger ms-1'>
                                                    <i className="bi bi-trash"></i>
                                                </button>

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
    )
}
export default StudyMaterials;