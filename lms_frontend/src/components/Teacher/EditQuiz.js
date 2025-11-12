import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function EditQuiz() {
    const {quiz_id } = useParams();
    const teacherId = localStorage.getItem('teacherId');
    const [quizData, setquizData] = useState({
        title: '',
        detail: '',
    });


    useEffect(() => {
        try {
            axios.get(BASE_URL + 'teacher-quiz-detail/' + quiz_id + '/')
                .then((res) => {
                    setquizData({
                        title: res.data.title,
                        detail: res.data.detail,
                    });

                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    // Khi thay đổi dữ liệu text, select,...
    const handleChange = (event) => {
        setquizData({
            ...quizData,
            [event.target.name]: event.target.value
        });
    };

    // Gửi form lên server
    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('teacher', teacherId); 
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);

        try {
            axios.put(`${BASE_URL}teacher-quiz-detail/${quiz_id}/`, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            title: 'Data has been updated successfully!',
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
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

                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Edit Quiz</h5>
                        <div className="card-body">
                            <form>

                                {/* Title */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text" value={quizData.title}
                                        onChange={handleChange}
                                        name="title"
                                        id="title"
                                        className="form-control"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Detail</label>
                                    <textarea
                                        onChange={handleChange} value={quizData.detail}
                                        name="detail"
                                        className="form-control"
                                    ></textarea>
                                </div>

                                <button type="button" onClick={formSubmit} className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EditQuiz;
