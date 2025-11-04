import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';
function AddChapter() {
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: '',
        remarks: ''
    });


   
    // Khi thay đổi dữ liệu text, select,...
    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    };

    // Khi chọn file ảnh
    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    };

    // Gửi form lên server
    const formSubmit = () => {
        const _formData = new FormData();
    
        _formData.append('course', 1); // tạm fix id=1 để test
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        _formData.append('video', chapterData.video, chapterData.video.name);
        _formData.append('remarks', chapterData.remarks);

        try {
            axios.post(`${BASE_URL}chapter/`, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    // console.log(res.data);
                    window.location.href='/add-chapter/1';
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
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text"  onChange={handleChange}
                                        id="title" name="title" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label">Video</label>
                                    <input type="file" onChange={handleFileChange} id="video" name="video" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="techs" className="form-label">Remarks</label>
                                    <textarea onChange={handleChange} placeholder="This is video is focused on basic" id="remarks" name="remarks" className="form-control"></textarea>
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

export default AddChapter;
