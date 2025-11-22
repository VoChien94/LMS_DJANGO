// Import Link từ thư viện react-router-dom để có thể dùng thẻ <Link> cho điều hướng
import { Link, useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/';
// Định nghĩa component Login (dạng function component)
function VerifyTeacher() {
    const navigate=useNavigate();
  const[teacherData,setteacherData]=useState({
    otp_digit:'',
   
  });

  const[errorMsg,seterrorMsg]=useState(''); 
  const handleChange=(event)=>{
    setteacherData({
        ...teacherData,
        [event.target.name]:event.target.value
    });
  }
  const {teacher_id}=useParams();

 const submitForm = (event) => {
    event.preventDefault();
    const teacherFormData=new FormData();
    teacherFormData.append("otp_digit",teacherData.otp_digit)
    try{
      axios.post(`${BASE_URL}verify-teacher/`+teacher_id+'/', teacherFormData)
      .then((res)=>{
      if(res.data.bool== true){
        localStorage.setItem('teacherLoginStatus', true);
        localStorage.setItem('teacherId', res.data.teacher_id);
        navigate('/teacher-dashboard');
      }else{
        seterrorMsg(res.data.msg);
      }
    });
    } catch(error){
      console.log(error);
    }
 }

  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
  if(teacherLoginStatus =='true'){
       navigate('/teacher-dashboard');
  }
  useEffect(()=>{
     document.title='Verify Teacher'
  });
  return (
    
    <div className="container mt-4">
      <div className="row"> 
       
        <div className="col-6 offset-3">
          <div className="card"> 
            <h5 className="card-header">Enter 6 Digit OTP</h5> 
            <div className="card-body"> 
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <form>
                <div className="mb-3"> 
                  <label for="exampleInputEmail1" className="form-label">
                    OTP
                  </label>
                  <input type="number" value={teacherData.otp_digit} name='otp_digit' onChange={handleChange}
                   className="form-control" />
                </div>
                <button type="submit" onClick={submitForm} className="btn btn-primary">
                  Verify
                </button>
              </form>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Xuất component để có thể import từ file khác
export default VerifyTeacher;
