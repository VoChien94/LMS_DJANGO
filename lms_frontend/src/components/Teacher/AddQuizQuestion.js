import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function AddQuizQuestion() {
    const { quiz_id } = useParams();
    const [questionData, setquestionData] = useState({
        quiz: '',
        questions: '',
        ans1: '',
        ans2: '',
        ans3: '',
        ans4: '',
        right_ans: ''
    });



    // Khi thay đổi dữ liệu text, select,...
    const handleChange = (event) => {
        setquestionData({
            ...questionData,
            [event.target.name]: event.target.value
        });
    };


    // Gửi form lên server
    const formSubmit = () => {
        const _formData = new FormData();

        _formData.append('quiz', quiz_id);
        _formData.append('questions', questionData.questions);
        _formData.append('ans1', questionData.ans1);
        _formData.append('ans2', questionData.ans2);
        _formData.append('ans3', questionData.ans3);
        _formData.append('ans4', questionData.ans4);
        _formData.append('right_ans', questionData.right_ans);

        try {
            axios.post(`${BASE_URL}quiz-questions/${quiz_id}/`, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Swal.fire({
                            title: 'Data has been added',
                            icon: 'success',
                            toast: true,
                            timer: 5000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
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
                        <h5 className="card-header">Add Question</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" onChange={handleChange}
                                        id="questions" name="questions" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Ans 1</label>
                                    <input type="text" onChange={handleChange}
                                        id="title" name="ans1" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Ans 2</label>
                                    <input type="text" onChange={handleChange}
                                        id="title" name="ans2" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Ans 3</label>
                                    <input type="text" onChange={handleChange}
                                        id="title" name="ans3" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Ans 4</label>
                                    <input type="text" onChange={handleChange}
                                        id="title" name="ans4" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Right Answer</label>
                                    <input type="text" onChange={handleChange}
                                        id="title" name="right_ans" className="form-control" />
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

export default AddQuizQuestion;
