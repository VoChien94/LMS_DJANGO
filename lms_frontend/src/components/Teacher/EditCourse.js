import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function EditCourse() {
    const [cats, setCats] = useState([]);
    const { course_id } = useParams();
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        prev_img: '',
        f_img: '',
        techs: ''
    });


    useEffect(() => {
        try {
            axios.get(`${BASE_URL}category/`)
                .then((res) => {
                    setCats(res.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios.get(BASE_URL + 'teacher-course-detail/' + course_id + '/')
                .then((res) => {
                    setCourseData({
                        category: res.data.category,
                        title: res.data.title,
                        description: res.data.description,
                        prev_img: res.data.featured_img,
                        f_img: '',
                        techs: res.data.techs,
                    });

                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    // Khi thay đổi dữ liệu text, select,...
    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    };

    // Khi chọn file ảnh
    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    };

    // Gửi form lên server
    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', 1); // tạm fix id=1 để test
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        if (courseData.f_img !== '') {
            _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        }

        _formData.append('techs', courseData.techs);

        try {
            axios.put(`${BASE_URL}teacher-course-detail/${course_id}/`, _formData, {
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
                        <h5 className="card-header">Edit Course</h5>
                        <div className="card-body">
                            <form>
                                {/* Category */}
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select name="category" value={courseData.category} onChange={handleChange} className="form-control">
                                        {cats.map((category, index) => {
                                            return <option key={index} value={category.id}>{category.title}</option>
                                        })}
                                    </select>
                                </div>

                                {/* Title */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text" value={courseData.title}
                                        onChange={handleChange}
                                        name="title"
                                        id="title"
                                        className="form-control"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        onChange={handleChange} value={courseData.description}
                                        name="description"
                                        className="form-control"
                                    ></textarea>
                                </div>

                                {/* Featured Image */}
                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label">Featured Image</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        name="f_img"
                                        id="video"
                                        className="form-control"
                                    />
                                    {courseData.prev_img &&
                                      <p className='mt-2'><img src={courseData.prev_img} width="300" /></p>  
                                    }

                                </div>

                                {/* Technologies */}
                                <div className="mb-3">
                                    <label htmlFor="techs" className="form-label">Technologies</label>
                                    <textarea
                                        onChange={handleChange} value={courseData.techs}
                                        name="techs"
                                        className="form-control"
                                        placeholder="Php, Python, Javascript, HTML, CSS"
                                        id="techs"
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

export default EditCourse;
