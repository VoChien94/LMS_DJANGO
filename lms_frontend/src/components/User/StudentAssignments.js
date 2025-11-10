import SideBar from "./SideBar";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function StudentAssignments() {
  const [assignmentData, setassignmentData] = useState([]);
  const studentId = localStorage.getItem('studentId');
  // fetch student when page load
  useEffect(() => {
    try {
      axios.get(BASE_URL + 'my-assignments/' + studentId + '/')
        .then((res) => {
          setassignmentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Cột bên trái: Menu điều hướng Dashboard */}
        <aside className="col-md-3">
          <SideBar />
        </aside>

        {/* Cột bên phải: Nội dung My Courses */}
        <div className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Assignments</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Detail</th>
                    <th>Teacher</th>
              
                  </tr>
                </thead>
                <tbody>
                  {assignmentData.map((row, index) =>
                  <tr>
                    <td>{row.title}</td>
                     <td>{row.detail}</td>
                    <td>
                      <Link to={`/teacher-detail/`+ row.teacher.id}>{row.teacher.full_name}</Link>
                    </td>
                    <td>
                  
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAssignments;
