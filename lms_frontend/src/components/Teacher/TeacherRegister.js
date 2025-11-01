// Import Link để điều hướng giữa các trang React
import { Link } from "react-router-dom";
import { useEffect } from "react";
// Component Register hiển thị form đăng ký người dùng
function TeacherRegister() {
  useEffect(()=>{
    document.title ='Teacher Register';
  });
  return (
    // Khung chính của form (Bootstrap)
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
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
                  <input type="text" className="form-control" />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Qualification
                  </label>
                  <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Mobile Number
                  </label>
                  <input type="number" className="form-control" />
                </div>

                {/* Interests */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Skills
                  </label>
                  <textarea className="form-control"></textarea>
                  <div id="emailHelp" className="form-text">
                    Php, Python, Javascript, etc
                  </div>
                </div>

                {/* Nút Register */}
                <button type="submit" className="btn btn-primary">
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
