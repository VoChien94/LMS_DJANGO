import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function AddStudyMaterial() {
    const { course_id } = useParams();
    const [studyData, setstudyData] = useState({
        title: '',
        description: '',
        upload: '',
        remarks: ''
    });



    // Khi thay đổi dữ liệu text, select,...
    const handleChange = (event) => {
        setstudyData({
            ...studyData,
            [event.target.name]: event.target.value
        });
    };

    // Khi chọn file ảnh
   const handleFileChange = (event) => {
    window.URL = window.URL || window.webkitURL;
    var upload = document.createElement('upload');
    upload.src = URL.createObjectURL(event.target.files[0]);

    setstudyData({
        ...studyData,
        [event.target.name]: event.target.files[0]
    });
};


    // Gửi form lên server
    const formSubmit = () => {
        const _formData = new FormData();

        _formData.append('course', course_id); 
        _formData.append('title', studyData.title);
        _formData.append('description', studyData.description);
        _formData.append('upload', studyData.upload, studyData.upload.name);
        _formData.append('remarks', studyData.remarks);

        try {
            axios.post(BASE_URL+'study-materials/'+course_id +'/', _formData, {
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
                            timer: 3000,
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
                        <h5 className="card-header">Add Study Material</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" onChange={handleChange}
                                        id="title" name="title" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea onChange={handleChange} id="description" name="description" className="form-control"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="upload" className="form-label">Upload</label>
                                    <input type="file" onChange={handleFileChange} id="upload" name="upload" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="remarks" className="form-label">Remarks</label>
                                    <textarea onChange={handleChange} id="remarks" name="remarks" className="form-control"></textarea>
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

export default AddStudyMaterial;
