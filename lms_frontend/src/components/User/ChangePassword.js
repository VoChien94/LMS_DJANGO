import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function ChangePassword() {
  const [studentData, setstudentData] = useState({
    'password': '',

  });
  const studentId = localStorage.getItem('studentId');
  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value
    });
  }

  // Submit Form
  const submitForm = (event) => {
    event.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append("password", studentData.password);
   
    try {
      axios.post(BASE_URL + 'student/change-password/' + studentId + '/', studentFormData)
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
          window.location.href = 'user-logout';
        }else{
          alert('Oop... Some error occured');
        }
      });
    } catch (error) {
      console.log(error);
      setstudentData({ 'status': 'error' })
    }

  };

  useEffect(() => {
    document.title = "Student Change Password"
  });
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
  if (studentLoginStatus !== 'true') {
    window.location.href = 'user-login';
  }
  return (

    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
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
                  <input type="text" name="password" value={studentData.password} onChange={handleChange} class="form-control" id="staticEmail" />
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
