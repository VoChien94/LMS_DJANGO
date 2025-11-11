// Import Link để điều hướng giữa các trang trong React
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideBar from "./SideBar";
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function ProfileSetting() {

  const [studentData, setstudentData] = useState({
    'full_name': '',
    'email': '',
    'username': '',
    'interested_categories': '',
    'profile_img': '',
    'p_img': '',
  });
  const studentId = localStorage.getItem('studentId');
  useEffect(() => {
    //Fetch current teacher data
    try {
      axios.get(BASE_URL + 'student/' + studentId + '/')
        .then((res) => {
          setstudentData({
            full_name: res.data.full_name,
            email: res.data.email,
            username: res.data.username,
            interested_categories: res.data.interested_categories,
            profile_img: res.data.profile_img,
            p_img: '',
          });

        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Chang element value
  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value
    });
  }

  //End
  const handleFileChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.files[0]
    });
  };

  // Submit Form
  const submitForm = (event) => {
    event.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("username", studentData.username);
    studentFormData.append("interested_categories", studentData.interested_categories);


    if (studentData.p_img !== '') {
      studentFormData.append('profile_img', studentData.p_img, studentData.p_img.name);
    }

    try {
      axios.put(BASE_URL + 'student/' + studentId + '/', studentFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.status === 200) {
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
      setstudentData({ 'status': 'error' })
    }

  };

  useEffect(() => {
    document.title = "My Profile"
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
            <h5 className="card-header">Profile Setting</h5>
            <div className="card-body">
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div class="col-sm-10">
                  <input type="text" name="full_name" value={studentData.full_name} onChange={handleChange} class="form-control" id="staticEmail" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Email
                </label>
                <div class="col-sm-10">
                  <input type="email" name="email" value={studentData.email} onChange={handleChange} class="form-control" id="staticEmail" />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="video" class="col-sm-2 col-form-label">Profile Image</label>
                <div class="col-sm-10">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="p_img"
                    id="video"
                    className="form-control"
                  />
                  {studentData.profile_img &&
                    <p className='mt-2'><img src={studentData.profile_img} width="300" alt={studentData.full_name} /></p>
                  }
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                  <input type="text" className="form-control" name="username" value={studentData.username} onChange={handleChange}></input>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" name="interested_categories" class="col-sm-2 col-form-label" >Interested Categories</label>
                <div class="col-sm-10">
                  <textarea className="form-control" value={studentData.interested_categories} onChange={handleChange} name="qualification"></textarea>
                  <div id="emailHelp" class="form-text">Php, Python, Javascript</div>
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


export default ProfileSetting;
