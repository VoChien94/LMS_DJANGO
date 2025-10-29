// Import Link từ thư viện react-router-dom để có thể dùng thẻ <Link> cho điều hướng
import { Link } from "react-router-dom";

// Định nghĩa component Login (dạng function component)
function Login() {
  return (
    // container: tạo vùng bao có margin top (mt-4) để form cách trên một đoạn
    <div className="container mt-4">
      <div className="row"> {/* tạo 1 hàng trong Bootstrap grid */}
        {/* col-6 offset-3: tạo cột rộng 6/12 và đẩy sang giữa (offset-3 = lệch 3 cột) */}
        <div className="col-6 offset-3">
          <div className="card"> {/* thẻ card Bootstrap để hiển thị form đẹp */}
            <h5 className="card-header">User Login</h5> {/* tiêu đề của form */}
            <div className="card-body"> {/* phần thân chứa form chính */}

              {/* Bắt đầu form đăng nhập */}
              <form>
                {/* Ô nhập Username */}
                <div className="mb-3"> {/* mb-3: thêm margin dưới */}
                  {/* label liên kết với input thông qua thuộc tính for */}
                  <label for="exampleInputEmail1" className="form-label">
                    Username
                  </label>
                  {/* Input type="email" (có thể đổi sang text nếu muốn), class form-control để có style đẹp */}
                  <input type="email" className="form-control" />
                </div>

                {/* Ô nhập Password */}
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

                {/* Checkbox “Remember Me” */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember Me
                  </label>
                </div>

                {/* Nút submit */}
                <button type="submit" className="btn btn-primary">
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
export default Login;
