// Import Link từ thư viện react-router-dom để có thể dùng thẻ <Link> cho điều hướng
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/';
// Định nghĩa component Login (dạng function component)
function Login() {

  const[studentLoginData,setstudentLoginData]=useState({
    email:'',
    password:''
  });

  
  const[errorMsg,seterrorMsg]=useState(''); 
  const handleChange=(event)=>{
    setstudentLoginData({
        ...studentLoginData,
        [event.target.name]:event.target.value
    });
  }

const submitForm = (event) => {
    event.preventDefault();
    const StudentFormData=new FormData();
    StudentFormData.append('email', studentLoginData.email)
    StudentFormData.append('password', studentLoginData.password)
    try{
      axios.post(`${BASE_URL}student-login/`, StudentFormData)
      .then((res)=>{
      if(res.data.bool== true){
        localStorage.setItem('studentLoginStatus', true);
        localStorage.setItem('studentId', res.data.studentId);
        window.location.href ='/student-dashboard';
      }else{
        seterrorMsg('Invalid Email or Password!!');
      }
    });
    } catch(error){
      console.log(error);
    }
 }

  const studentLoginStatus=localStorage.getItem('studentLoginStatus');
  if(studentLoginStatus =='true'){
      window.location.href ='/student-dashboard';
  }
  useEffect(()=>{
     document.title='Student Login'
  });


  return (
    <div className="container mt-4">
      <div className="row"> {/* tạo 1 hàng trong Bootstrap grid */}
        {/* col-6 offset-3: tạo cột rộng 6/12 và đẩy sang giữa (offset-3 = lệch 3 cột) */}
        <div className="col-6 offset-3">
          <div className="card"> {/* thẻ card Bootstrap để hiển thị form đẹp */}
            <h5 className="card-header">User Login</h5> {/* tiêu đề của form */}
            <div className="card-body"> {/* phần thân chứa form chính */}
                 {errorMsg && <p className="text-danger">{errorMsg}</p>}
              {/* Bắt đầu form đăng nhập */}
              
                {/* Ô nhập Username */}
                <div className="mb-3"> {/* mb-3: thêm margin dưới */}
                  {/* label liên kết với input thông qua thuộc tính for */}
                  <label for="exampleInputEmail1" className="form-label">
                    Username
                  </label>
                  {/* Input type="email" (có thể đổi sang text nếu muốn), class form-control để có style đẹp */}
                  <input type="email" name='email' value={studentLoginData.email} onChange={handleChange} className="form-control" />
                </div>

                {/* Ô nhập Password */}
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input onChange={handleChange} value={studentLoginData.password} name='password'
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                {/* Checkbox “Remember Me” */}
                {/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  /> */}
                  {/* <label className="form-check-label" for="exampleCheck1">
                    Remember Me
                  </label>
                </div> */}
                
                {/* Nút submit */}
                <button type="submit" onClick={submitForm} className="btn btn-primary">
                  Login
                </button>
              {/* Kết thúc form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Xuất component để có thể import từ file khác
export default Login;
