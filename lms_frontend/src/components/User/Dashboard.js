// Import Link để điều hướng giữa các trang React
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function Dashboard() {
  const [dashboardData, setdashboardData] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    // Fetch Courses
    try {
      axios
        .get(BASE_URL + "student/dashboard/" + studentId + "/")
        .then((res) => {
          console.log(res);
          setdashboardData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        <section className="col-md-9">
          <div className="row justify-content-center text-center">

            {/* Enrolled Courses */}
            <div className="col-md-4 mb-3">
              <div className="card border-primary h-100">
                <h5 className="card-header bg-primary text-white">
                  Enrolled Courses
                </h5>
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h3 className="mb-0">
                    <Link to="/my-courses" className="text-decoration-none">
                      {dashboardData.enrolled_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Favorite Courses */}
            <div className="col-md-4 mb-3">
              <div className="card border-success h-100">
                <h5 className="card-header bg-success text-white">
                  Favorite Courses
                </h5>
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h3 className="mb-0">
                    <Link to="/favorite-courses" className="text-decoration-none">
                      {dashboardData.favorite_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Assignments */}
            <div className="col-md-4 mb-3">
              <div className="card border-info h-100">
                <h5 className="card-header bg-info text-white">
                  Assignments
                </h5>
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="mb-0">
                    <Link to="/my-assignments" className="text-decoration-none">
                      Completed: {dashboardData.complete_assignments}, Pending:{" "}
                      {dashboardData.pending_assignments}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
