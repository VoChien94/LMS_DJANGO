import { Link } from "react-router-dom";
import AllCourses from "./AllCourses";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";
function Home() {
  const [courseData, setCourseData] = useState([]);
  const[popularcourseData, setpopularcourseData] = useState([]);
  const[popularteacherData, setpopularteacherData] = useState([]);
  const[testimonialData,settestimonialData] = useState([]);

  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(BASE_URL + "course/?result=4")
        .then((res) => {
          setCourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axios.get(BASE_URL + "popular-courses/?popular=1")
        .then((res) => {
          setpopularcourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axios.get(BASE_URL + "popular-teachers/?popular=1")
        .then((res) => {
          setpopularteacherData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
     try {
      axios.get(BASE_URL + "student-testimonial/")
        .then((res) => {
          settestimonialData (res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container mt-4">

      {/* ====================== LATEST COURSES ====================== */}
      <h3 className="pb-1 mb-4">
        Latest Courses
        <Link to="/all-courses" className="float-end btn btn-primary">
          See All
        </Link>
      </h3>

      <div className="row mb-4">
        {courseData && courseData.map((course, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card">
              <Link to={`/detail/${course.id}`}>
                <img src={course.featured_img} className="card-img-top" alt={course.title} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${course.id}`}>{course.title}</Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================== POPULAR COURSES ====================== */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Courses
        <Link to="/popular-courses" className="float-end btn btn-primary">
          See All
        </Link>
      </h3>

      <div className="row mb-4">
        {popularcourseData && popularcourseData.map((row, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link to={`/detail/${row.id}`}>
                <img src={row.featured_img} className="card-img-top" alt={row.title} />
              </Link>

              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${row.id}`}>{row.title}</Link>
                </h5>
              </div>

              <div className="card-footer">
                <div className="title">
                  <span>Rating: {row.avg_rating?.toFixed(1) || 0}/5</span>
                  <span className="float-end">Views: {row.course_views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================== POPULAR TEACHERS ===================== */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Teachers
        <Link to="/popular-teachers" className="float-end">
          See All
        </Link>
      </h3>

      <div className="row mb-4">
        {popularteacherData && popularteacherData.map((teacher, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link to={`/teacher-detail/${teacher.id}`}>
                <img src={teacher.profile_img} className="card-img-top" alt="Teacher" />
              </Link>

              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/teacher-detail/${teacher.id}`}>
                    {teacher.full_name}
                  </Link>
                </h5>
              </div>

              <div className="card-footer">
                <div className="title">
                  <span>Total Courses: {teacher.total_teacher_courses}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================== STUDENT TESTIMONIAL ================== */}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>

      <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">

        <div className="carousel-indicators">
          {testimonialData && testimonialData.map((row, index) =>
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
            ></button>
          )}
        </div>

        <div className="carousel-inner">
          {testimonialData && testimonialData.map((row, i) =>
            <div key={i} className={i === 0 ? "carousel-item text-center active" : "carousel-item text-center"}>
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>{row.reviews}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {row.course.title}
                  <cite className="ms-2" title="Student">{row.student.full_name}</cite>
                </figcaption>
              </figure>
            </div>
          )}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

    </div>
  );
}

export default Home;