import SideBar from "./SideBar";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function TakeQuiz() {
  const [couseData, setcouseData] = useState([]);
  const studentId = localStorage.getItem('studentId');
  // fetch student when page load
  useEffect(() => {
    try {
      axios.get(BASE_URL + 'fetch-enrolled-courses/' + studentId + '/')
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
            <h4 className="mb-3 border-bottom pb-1">Quiz Title</h4>
          <div className="card">
            <h5 className="card-header">Question Title</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td><input type='radio'/></td>
                    <th>Option 1</th>
                  </tr>
                  <tr>
                    <td><input type='radio'/></td>
                    <th>Option 2</th>
                  </tr>
                  <tr>
                    <td><input type='radio'/></td>
                    <th>Option 3</th>
                  </tr>
                  <tr>
                    <td><input type='radio'/></td>
                    <th>Option 4</th>
                  </tr>
      
                </tbody>
              </table>
              <button className="btn btn-dark">Skip</button>
              <button className="btn btn-primary ms-2">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;
