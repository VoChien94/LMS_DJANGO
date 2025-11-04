// Import Link từ thư viện react-router-dom để có thể dùng thẻ <Link> cho điều hướng
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/';
// Định nghĩa component Login (dạng function component)
function TeacherLogin() {
  const[teacherLoginData,setteacherLoginData]=useState({
    email:'',
    password:''
  });
  const handleChange=(event)=>{
    setteacherLoginData({
        ...teacherLoginData,
        [event.target.name]:event.target.value
    });
  }

 const submitForm = (event) => {
    event.preventDefault();
    const teacherFormData=new FormData;
    teacherFormData.append('email', teacherLoginData.email)
    teacherFormData.append('password', teacherLoginData.password)
    try{
      axios.post(`${BASE_URL}teacher-login/`, teacherFormData)
      .then((res)=>{
      if(res.data.bool== true){
        localStorage.setItem('teacherLoginStatus', true);
        localStorage.setItem('teacherId', res.data.teacherId);
        window.location.href ='/teacher-dashboard';
      }
    });
    } catch(error){
      console.log(error);
    }
 }
  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
  if(teacherLoginStatus =='true'){
      window.location.href ='/teacher-dashboard';
  }
  useEffect(()=>{
     document.title='Teacher Login'
  });
  return (
    // container: tạo vùng bao có margin top (mt-4) để form cách trên một đoạn
    <div className="container mt-4">
      <div className="row"> {/* tạo 1 hàng trong Bootstrap grid */}
        {/* col-6 offset-3: tạo cột rộng 6/12 và đẩy sang giữa (offset-3 = lệch 3 cột) */}
        <div className="col-6 offset-3">
          <div className="card"> {/* thẻ card Bootstrap để hiển thị form đẹp */}
            <h5 className="card-header">Teacher Login</h5> {/* tiêu đề của form */}
            <div className="card-body"> {/* phần thân chứa form chính */}

              {/* Bắt đầu form đăng nhập */}
              <form>
                {/* Ô nhập Username */}
                <div className="mb-3"> {/* mb-3: thêm margin dưới */}
                  {/* label liên kết với input thông qua thuộc tính for */}
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input type="email" value={teacherLoginData.email} name='email' onChange={handleChange}
                   className="form-control" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password" value={teacherLoginData.password} name='password' onChange={handleChange}
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
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember Me
                  </label>
                </div> */}

                {/* Nút submit */}
                <button type="submit" onClick={submitForm} className="btn btn-primary">
                  Login
                </button>
              </form>
              {/* Kết thúc form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Xuất component để có thể import từ file khác
export default TeacherLogin;
