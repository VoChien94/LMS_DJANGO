import SideBar from "./SideBar";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function RecommendedCourses() {
  const [couseData, setcouseData] = useState([]);
  const studentId = localStorage.getItem('studentId');
  // fetch student when page load
  useEffect(() => {
    try {
      axios.get(BASE_URL + 'fetch-recommended-courses/' + studentId + '/')
        .then((res) => {
          setcouseData(res.data);
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
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Technologies</th>

                  </tr>
                </thead>
                <tbody>
                  {couseData.map((row, index) => (
                    <tr key={index}>
                      <td><Link to={`/detail/${row.id}`}>{row.title}</Link></td>
                      <td>{row.techs}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendedCourses;
