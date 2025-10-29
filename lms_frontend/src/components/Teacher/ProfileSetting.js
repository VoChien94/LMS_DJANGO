// Import Link để điều hướng giữa các trang trong React
import { Link } from "react-router-dom";
// Import Sidebar để hiển thị menu bên trái
import SideBar from "./SideBar";

// Component ProfileSetting: hiển thị trang cài đặt thông tin người dùng
function ProfileSetting() {
  return (
    // Bao toàn bộ nội dung trong khung container Bootstrap
    <div className="container mt-4">
      <div className="row">
        {/* Cột bên trái: hiển thị menu điều hướng Dashboard */}
        <aside className="col-md-3">
          <SideBar />
        </aside>

        {/* Cột bên phải: hiển thị nội dung chính của trang (Profile Setting) */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Setting</h5>
            <div className="card-body">
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="staticEmail" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Email
                </label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="staticEmail" />
                </div>
              </div>
               <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">
                  Profile Photo
                </label>
                <div class="col-sm-10">
                  <input
                    type="file"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">
                  Password
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">
                  Interest
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              

              <hr />
              <button className="btn btn-primary">Update</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Xuất component để có thể import và sử dụng ở nơi khác (App.js, Router, v.v.)
export default ProfileSetting;
