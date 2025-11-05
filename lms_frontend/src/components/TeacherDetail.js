import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";

const BASE_URL = 'http://127.0.0.1:8000/api/';
function TeacherDetail() {
  const [teacherData, setteacherData] = useState([]);
  const [courseData, setcourseData] = useState([]);
  let { teacher_id } = useParams();
  useEffect(() => {
    try {
      axios.get(BASE_URL + 'teacher/' + teacher_id + '/')
        .then((res) => {
          setteacherData(res.data);
          setcourseData(res.data.teacher_courses);

        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-3">
      {/* ====================== COURSE INFO SECTION ====================== */}
      <div className="row">
        {/* Course Image */}
        <div className="col-4">
          <img
            src="/logo512.png"
            className="img-thumbnail"
            alt="Teacher Image"
          />
        </div>

        {/* Course Details */}
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>
            {teacherData.detail}
          </p>

          <p className="fw-bold">
            Skills: <Link to="/category/php">Php</Link>,
            <Link to="/category/python">Python</Link>,
            <Link to="/category/javascripts">Javascripts</Link>
          </p>
          <p className="fw-bold">
            Recent Course: <Link to="/category/reactjs">ReactJs Course</Link>
          </p>

          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      {/* ====================== COURSE VIDEOS SECTION ====================== */}
      <div className="card mt-4">
        <h5 className="card-header">Course List</h5>

        <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <Link
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action">
              {course.title}
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}
export default TeacherDetail;
