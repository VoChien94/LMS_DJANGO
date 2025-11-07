// ====================== IMPORTS ======================
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const SITE_URL = 'http://127.0.0.1:8000/';
const BASE_URL = 'http://127.0.0.1:8000/api/';

// ====================== COMPONENT ======================
function CourseDetail() {
  const [courseData, setcourseData] = useState([]);
  const [chapterData, setchapterData] = useState([]);
  const [teacherData, setteacherData] = useState([]);
  const [relatedcourseData, setrelatedcourseData] = useState([]);
  const [techListData, settechListData] = useState([]);
  const [userLoginStatus, setuserLoginStatus] = useState();
  const [enrollStatus, setenrollStatus] = useState();
  const [ratingStatus, setratingStatus] = useState('');
  const [AvgRating, setAvgRating] = useState(0);
  let { course_id } = useParams();
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(BASE_URL + 'course/' + course_id + '/')
        .then((res) => {
          setcourseData(res.data);
          setchapterData(res.data.course_chapters);
          setteacherData(res.data.teacher);
          setrelatedcourseData(JSON.parse(res.data.related_videos));
          settechListData(res.data.tech_list);
          if(res.data.course_rating !='' && res.data.course_rating != null){
            setAvgRating(res.data.course_rating)
          }
        });
    } catch (error) {
      console.log(error);
    }

    //Fetch enroll status 
    try {
      axios.get(BASE_URL + 'fetch-enroll-status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool === true) {
            setenrollStatus('success');
          } else {
            setenrollStatus('');
          }
        });
    } catch (error) {
      console.log(error);
    }

    //Fetch rating status 
    try {
      axios.get(BASE_URL + 'fetch-rating-status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool === true) {
            setratingStatus('success');
          } else {
            setratingStatus('');
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus === 'true') {
      setuserLoginStatus('success');
    }
  }, []);


  const enrollCourse = () => {
    const studentId = localStorage.getItem('studentId');
    const _formData = new FormData();
    _formData.append('course', parseInt(course_id));
    _formData.append('student', parseInt(studentId));


    try {
      axios.post(`${BASE_URL}student-enroll-course/`, _formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: 'You have successfully enrolled in this course',
              icon: 'success',
              toast: true,
              timer: 10000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
            });
            setuserLoginStatus('success');
          }
        });
    } catch (error) {
      console.log(error);
    }

  }
  //Add Rating
  const [ratingData, setratingData] = useState({
    rating: '',
    reviews: ''
  });



  // Khi thay đổi dữ liệu text, select,...
  const handleChange = (event) => {
    setratingData({
      ...ratingData,
      [event.target.name]: event.target.value
    });
  };
  const formSubmit = () => {
    const _formData = new FormData();

    _formData.append('course', course_id); // tạm fix id=1 để test
    _formData.append('student', studentId);
    _formData.append('rating', ratingData.rating);
    _formData.append('reviews', ratingData.reviews);

    try {
      axios.post(`${BASE_URL}course-rating/` + course_id + '/', _formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: 'Rating has been saved',
              icon: 'success',
              toast: true,
              timer: 5000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
            });
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3 pb-2">

      {/* ====================== COURSE INFO SECTION ====================== */}
      <div className="row">
        {/* Course Image */}
        <div className="col-4">
          <img
            src={courseData.featured_img}
            className="img-thumbnail"
            alt={courseData.title}
          />
        </div>

        {/* Course Details */}
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>
            {courseData.description}
          </p>

          <p className="fw-bold">
            Course By: <Link to={`/teacher-detail/${teacherData.id}`}> {teacherData.full_name}</Link>
          </p>
          <p className="fw-bold">Techs:&nbsp;
            {techListData.map((tech, index) => <>
              <Link to={`/category/${tech.trim()}`} className='badge badge-pill text-dark bg-warning mr-2'>
                {tech.trim()}
              </Link>&nbsp;
            </>
            )}
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} Student(s)
          </p>

          <div className="fw-bold">
            Rating: {AvgRating}/5
            {enrollStatus === "success" && userLoginStatus === "success" && (
              <>
                {ratingStatus != "success" && (
                  <button
                    className="btn btn-success btn-sm ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                  >
                    Rating
                  </button>
                )}

                {ratingStatus == "success" && (
                  <small className="badge bg-info text-dark m2-2">
                    You already rated this course
                  </small>
                )}
              </>
            )}
          </div>

          <div
            className="modal fade"
            id="ratingModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Rate for {courseData.title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Rating
                      </label>
                      <select
                        onChange={handleChange}
                        className="form-control"
                        name="rating"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Review
                      </label>
                      <textarea
                        onChange={handleChange}
                        className="form-control"
                        name="reviews"
                        rows="10"
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      onClick={formSubmit}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>


          {enrollStatus === "success" && userLoginStatus === "success" && (
            <p>
              <span>You are already enrolled in this course</span>
            </p>
          )}

          {userLoginStatus === "success" && enrollStatus !== "success" && (
            <p>
              <button
                onClick={enrollCourse}
                type="button"
                className="btn btn-success"
              >
                Enroll in this course
              </button>
            </p>
          )}

          {userLoginStatus !== "success" && (
            <p>
              <Link to="/user-login">Please login to enroll in this course</Link>
            </p>
          )}


        </div>
      </div>

      {/* ====================== COURSE VIDEOS SECTION ====================== */}
      <div className="card mt-4">
        <h3 className="card-header">In this course</h3>

        <ul className="list-group list-group-flush">
          {chapterData.map((chapter, index) => (
            <li className="list-group-item" key={index}>
              {chapter.title}
              <span className="float-end">
                <span className="me-5">1 Hour 30 Minutes</span>
                <button
                  className="btn btn-sm btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#videoModal1"
                >
                  <i className="bi-youtube"></i>
                </button>
              </span>
              {/*Video Modal Start*/}
              <div
                className="modal fade"
                id="videoModal1"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Video 1
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={chapter.video}
                          title={chapter.title}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*Video Modal End*/}
            </li>
          ))}
        </ul>
      </div>

      {/* ====================== RELATED COURSES SECTION ====================== */}
      <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
      <div className="row mb-4">
        {relatedcourseData.map((rcourse, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link target="__blank" to={`/detail/${rcourse.pk}`}>
                <img
                  src={`${SITE_URL}media/${rcourse.fields.featured_img}`}
                  className="card-img-top"
                  alt={rcourse.fields.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CourseDetail;

