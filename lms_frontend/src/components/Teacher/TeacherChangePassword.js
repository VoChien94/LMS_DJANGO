import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function ChangePassword() {
  const [teacherData, setteacherData] = useState({
    'password': '',

  });
  const teacherId = localStorage.getItem('teacherId');
  const handleChange = (event) => {
    setteacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    });
  }

  // Submit Form
  const submitForm = (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("password", teacherData.password);
   
    try {
      axios.post(BASE_URL + 'teacher/change-password/' + teacherId + '/', teacherFormData)
      .then((response) => {
        if (response.status === 200) {
            Swal.fire({
                      title: 'Data has been updated successfully!',
                      icon: 'success',
                      toast: true,
                      timer: 10000,
                      position: 'top-right',
                      timerProgressBar: true,
                      showConfirmButton: false
                    });
          window.location.href = 'teacher-logout';
        }else{
          alert('Oop... Some error occured');
        }
      });
    } catch (error) {
      console.log(error);
      setteacherData({ 'status': 'error' })
    }

  };

  useEffect(() => {
    document.title = "Teacher Change Password"
  });
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if (teacherLoginStatus !== 'true') {
    window.location.href = 'teacher-login';
  }
  return (

    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">ChangePassword</h5>
            <div className="card-body">
              
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  New Password
                </label>
                <div class="col-sm-10">
                  <input type="text" name="password" value={teacherData.password} onChange={handleChange} class="form-control" id="staticEmail" />
                </div>
              </div>

              <hr />
              <button className="btn btn-primary" onClick={submitForm}>Update</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangePassword;
