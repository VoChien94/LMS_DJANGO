import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function AddAssignment() {
    const { teacher_id } = useParams();
    const { student_id } = useParams();
    const [assignmentData, setassignmentData] = useState({
        title: '',
        detail: '',
    });


    // Khi thay đổi dữ liệu text, select,...
    const handleChange = (event) => {
        setassignmentData({
            ...assignmentData,
            [event.target.name]: event.target.value
        });
    };


    // Gửi form lên server
    const formSubmit = () => {
        const _formData = new FormData();

        _formData.append('teacher', teacher_id); // tạm fix id=1 để test
        _formData.append('title', assignmentData.title);
        _formData.append('detail', assignmentData.detail);
        _formData.append('student', student_id);

        try {
            axios.post(BASE_URL + 'student-assignment/' + teacher_id + '/' + student_id + '/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Swal.fire({
                            title: 'Assignment has been added',
                            icon: 'success',
                            toast: true,
                            timer: 10000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                        // Save Notification Data
                        const _notifData = new FormData();
                        _notifData.append('teacher', teacher_id);
                        _notifData.append('notif_subject', 'assignment');
                        _notifData.append('notif_for', 'student');
                        _notifData.append('student', student_id);

                        axios.post(BASE_URL + 'save-notification/', _notifData, {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        })
                            .then((res) => {
                                console.log('Notification Added');
                            })

                        // End Notification
                        window.location.reload();

                        // End SweetAlert

                        window.location.reload();
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <div className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" onChange={handleChange}
                                        id="title" name="title" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="detail" className="form-label">Description</label>
                                    <textarea onChange={handleChange} id="description" name="detail" className="form-control"></textarea>
                                </div>

                                <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAssignment;
