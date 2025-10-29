// Import Link để điều hướng giữa các trang React
import { Link } from "react-router-dom";
import SideBar from "./SideBar"
// Component Dashboard: hiển thị giao diện chính của bảng điều khiển người dùng
function Dashboard() {
  return (
    // Khung chính với Bootstrap container
    <div className="container mt-4">
      <div className="row">
        {/* Cột bên trái: Menu điều hướng Dashboard */}
        <aside className="col-md-3">
        <SideBar />
        </aside>

        {/* Cột bên phải: hiển thị nội dung chính (component MyCourses) */}
        <section className="col-md-9">
          Dashboard
        </section>
      </div>
    </div>
  );
}

// Xuất component để dùng trong nơi khác (App.js, Router, v.v.)
export default Dashboard;
