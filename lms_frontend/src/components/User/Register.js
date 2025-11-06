// Import Link để điều hướng giữa các trang React
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/student/';
// Component Register hiển thị form đăng ký người dùng
function Register() {
  const [studentData, setstudentData] = useState({
    'full_name': '',
    'email': '',
    'password': '',
    'username': '',
    'interested_categories': '',
    'status': ''
  });
  //Chang element value
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
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("password", studentData.password);
    studentFormData.append("username", studentData.username);
    studentFormData.append("interested_categories", studentData.interested_categories);

    try {
      axios.post(BASE_URL, studentFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          setstudentData({
            'full_name': '',
            'email': '',
            'password': '',
            'username': '',
            'interested_categories': '',
            'status': 'success'
          });
        });
    } catch (error) {
      console.log(error);
      setstudentData({ 'status': 'error' });
    }

  };
  useEffect(() => {
    document.title = "Student Register"
  });

  //End
  return (
    // Khung chính của form (Bootstrap)
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {studentData.status == 'success' && <p class="text-success">Thanks for your registeration</p>}
          {studentData.status == 'error' && <p class="text-danger">Something wrong happened!</p>}
          <div className="card">
            <h5 className="card-header">User Register</h5>

            {/* Phần thân form */}
            <div className="card-body">

              {/* Full Name */}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Full Name
                </label>
                <input value={studentData.full_name} type="text" name='full_name' onChange={handleChange} className="form-control" />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input value={studentData.email} type="email" name='email' onChange={handleChange} className="form-control" />
              </div>

              {/* Username */}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input value={studentData.username} type="text" name='username' onChange={handleChange} className="form-control" />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input value={studentData.password}
                  type="password" name='password' onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              {/* Interests */}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Interests
                </label>
                <textarea value={studentData.interested_categories} onChange={handleChange} name='interested_categories' className="form-control"></textarea>
                <div id="emailHelp" className="form-text">
                  Php, Python, Javascript, etc
                </div>
              </div>

              {/* Nút Register */}
              <button onClick={submitForm} type="submit" className="btn btn-primary">
                Register
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Xuất component để sử dụng
export default Register;
