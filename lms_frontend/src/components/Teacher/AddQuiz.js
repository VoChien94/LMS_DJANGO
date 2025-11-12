import TeacherSidebar from './TeacherSidebar';
import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';
function AddQuiz() {
    const [quizData, setquizData] = useState({
        title: '',
        detail: '',

    });

    // Khi thay đổi dữ liệu text, select,...
    const handleChange = (event) => {
        setquizData({
            ...quizData,
            [event.target.name]: event.target.value
        });
    };

    // Gửi form lên server
    const formSubmit = () => {
        const teacherId = localStorage.getItem('teacherId');
        const _formData = new FormData();
        _formData.append('teacher', teacherId); 
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);

        try {
            axios.post(`${BASE_URL}quiz/`, _formData, {
            })
                .then((res) => {
                    // console.log(res.data);
                    window.location.href='/add-quiz/';
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
                        <h5 className="card-header">Add Quiz</h5>
                        <div className="card-body">
                            <form>

                                {/* Title */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
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
                                        onChange={handleChange}
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

export default AddQuiz;
