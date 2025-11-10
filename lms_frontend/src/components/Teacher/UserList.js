import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function UserList() {
  const [StudentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem('teacherId');
  useEffect(() => {
    try {
      axios.get(BASE_URL + 'fetch-all-enrolled-students/' + teacherId + '/')
        .then((res) => {
          setStudentData(res.data);
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
          <TeacherSidebar />
        </aside>

        {/* Cột bên phải: Nội dung My Courses */}
        <div className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Student List </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Interested Categories</th>
                    <th>Assignment</th>
                  </tr>
                </thead>
                <tbody>
                  {StudentData.map((row, index) =>

                    <tr>
                      <td>
                        {row.student.full_name}
                      </td>
                     
                      <td>
                       {row.student.email}
                      </td>
                      <td>
                       {row.student.username}
                      </td>
                      <td>
                        {row.student.interested_categories}
                       
                      </td>
                      <td>
                        <Link to="#" className="btn btn-sm btn-warning">Assignment</Link>
                        <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-success ms-2">Add Assignment</Link>
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

export default UserList;
