// Import Link để điều hướng giữa các trang React
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function TeacherDashboard(){
  const [dashboardData, setdashboardData] = useState([]);
  const teacherId = localStorage.getItem('teacherId');

  useEffect(()=>{
    try{
      axios.get(BASE_URL+'teacher/dashboard/'+ teacherId +'/')
      .then((res)=>{
        console.log(res);
        setdashboardData(res.data);
      });
    }catch(error){
      console.log(error);
    }
  },[]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>

        <section className="col-md-9">
          {/* row chứa 2 card, căn giữa + text-center */}
          <div className="row justify-content-center text-center">
            <div className="col-md-6 mb-3">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white text-center">
                  Total Courses
                </h5>
                <div className="card-body">
                  <h3 className="mb-0">
                    <Link to="/teacher-courses" className="text-decoration-none">
                      {dashboardData.total_teacher_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card border-success">
                <h5 className="card-header bg-success text-white text-center">
                  Total Students
                </h5>
                <div className="card-body">
                  <h3 className="mb-0">
                    <Link to="/teacher-users" className="text-decoration-none">
                      {dashboardData.total_teacher_students}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;