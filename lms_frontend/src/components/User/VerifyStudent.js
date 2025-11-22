// Import Link từ thư viện react-router-dom để có thể dùng thẻ <Link> cho điều hướng
import { Link, useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/';
// Định nghĩa component Login (dạng function component)
function VerifyStudent() {
    const navigate=useNavigate();
  const[studentData,setstudentData]=useState({
    otp_digit:'',
   
  });

  const[errorMsg,seterrorMsg]=useState(''); 
  const handleChange=(event)=>{
    setstudentData({
        ...studentData,
        [event.target.name]:event.target.value
    });
  }
  const {student_id}=useParams();

 const submitForm = (event) => {
    event.preventDefault();
    const studentFormData=new FormData();
    studentFormData.append("otp_digit",studentData.otp_digit)
    try{
      axios.post(`${BASE_URL}verify-student/`+student_id+'/', studentFormData)
      .then((res)=>{
      if(res.data.bool== true){
        localStorage.setItem('studentLoginStatus', 'true');
        localStorage.setItem('studentId', res.data.student_id);
        navigate('/user-dashboard');
      }else{
        seterrorMsg(res.data.msg);
      }
    });
    } catch(error){
      console.log(error);
    }
 }

  const userLoginStatus=localStorage.getItem('userLoginStatus');
  if(userLoginStatus =='true'){
       navigate('/user-dashboard');
  }
  useEffect(()=>{
     document.title='Verify Student'
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
                  <input type="number" value={studentData.otp_digit} name='otp_digit' onChange={handleChange}
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
export default VerifyStudent;
