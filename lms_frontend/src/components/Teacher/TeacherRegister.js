// Import Link để điều hướng giữa các trang React
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/teacher/';
function TeacherRegister() {
  const [teacherData, setteacherData] = useState({
    'full_name': '',
    'email': '',
    'password': '',
    'qualification': '',
    'mobile_no': '',
    'skills': '',
    'status': ''
  });
  //Chang element value
  const handleChange = (event) => {
    setteacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    });
  }

  //End

  // Submit Form
  const submitForm = (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);

    try {
      axios.post(BASE_URL, teacherFormData).then((response) => {
        setteacherData({
          'full_name': '',
          'email': '',
          'password': '',
          'qualification': '',
          'mobile_no': '',
          'skills': '',
          'status': 'success'
        })
      });
    } catch (error) {
      console.log(error);
      setteacherData({'status':'error'})
    }

  };
useEffect(()=>{
  document.title="Teacher Register"
});
 const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  if(teacherLoginStatus =='true'){
      window.location.href ='teacher-dashboard';
  }
  // End

  return (
    // Khung chính của form (Bootstrap)
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {teacherData.status =='success' && <p class="text-success">Thanks for your registeration</p>}
          {teacherData.status =='error'&& <p class="text-danger">Something wrong happened!</p>}
          <div className="card">
            <h5 className="card-header">Teacher Register</h5>

            {/* Phần thân form */}
            <div className="card-body">
              <form>
                {/* Full Name */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input value={teacherData.full_name} onChange={handleChange} name='full_name' type="text" className="form-control" />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input value={teacherData.email}onChange={handleChange} name='email' type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input value={teacherData.password}onChange={handleChange} name='password'
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Qualification
                  </label>
                  <input value={teacherData.qualification} onChange={handleChange} type="text" name="qualification" className="form-control" />
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Mobile Number
                  </label>
                  <input value={teacherData.mobile_no} onChange={handleChange} type="number" name="mobile_no" className="form-control" />
                </div>

                {/* Interests */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Skills
                  </label>
                  <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"></textarea>
                  <div id="emailHelp" className="form-text">
                    Php, Python, Javascript, etc
                  </div>
                </div>

                {/* Nút Register */}
                <button onClick={submitForm} type="button" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Xuất component để sử dụng
export default TeacherRegister;
