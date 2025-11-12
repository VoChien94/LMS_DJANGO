import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function Sidebar() {
  const [notifData, setnotifData] = useState([]);
  const studentId = localStorage.getItem('studentId');
  const location = useLocation();

  useEffect(() => {
    // Fetch Courses
    try {
      axios.get(BASE_URL + 'student/fetch-all-notifications/' + studentId)
        .then((res) => {
          console.log(res.data);
          setnotifData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [location]);

  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link to="/user-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
        <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
        <Link to="/favorite-courses" className="list-group-item list-group-item-action">Favorite Courses</Link>
        <Link to="/recommended-courses" className="list-group-item list-group-item-action">Recommended Courses</Link>
        <Link to="/my-assignments" className="list-group-item list-group-item-action">
          Assignments <span className="float-end badge bg-danger mt-1">{notifData.length}</span>
        </Link>
        <Link to="/profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
        <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
        <Link to="/user-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
      </div>
    </div>
  );
}

export default Sidebar;
