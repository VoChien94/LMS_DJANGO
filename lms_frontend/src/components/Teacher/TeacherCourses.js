import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";

function MyCourses() {
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
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Php Development</td>
                    <td>
                      <Link to="/">123</Link>
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm active">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
