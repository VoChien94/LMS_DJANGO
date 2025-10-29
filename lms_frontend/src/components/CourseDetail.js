// ====================== IMPORTS ======================
import { useParams, Link } from "react-router-dom";

// ====================== COMPONENT ======================
function CourseDetail() {
  const { course_id } = useParams();

  return (
    <div className="container mt-3">
      {/* ====================== COURSE INFO SECTION ====================== */}
      <div className="row">
        {/* Course Image */}
        <div className="col-4">
          <img
            src="/logo512.png"
            className="img-thumbnail"
            alt="Course Image"
          />
        </div>

        {/* Course Details */}
        <div className="col-8">
          <h3>Course Title</h3>
          <p>
            Using a combination of grid and utility classes, cards can be made
            horizontal in a mobile-friendly and responsive way. In the example
            below, we remove the grid gutters with <code>.g-0</code> and use{" "}
            <code>.col-md-*</code> classes to make the card horizontal at the md
            breakpoint. Further adjustments may be needed depending on your card
            content.
          </p>

          <p className="fw-bold">
            Course By: <a href="#">Teacher 1</a>
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">Total Enrolled: 456 Students</p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      {/* ====================== COURSE VIDEOS SECTION ====================== */}
      <div className="card mt-4">
        <h3 className="card-header">Course Videos</h3>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Introduction
            <span className="float-end">
              <span className="me-5">1 Hour 30 Minutes</span>
              <button className="btn btn-sm btn-danger">
                <i className="bi-youtube">x</i>
              </button>
            </span>
          </li>
          
          <li className="list-group-item">
            Introduction
            <span className="float-end">
              <span className="me-5">1 Hour 30 Minutes</span>
              <button className="btn btn-sm btn-danger">
                <i className="bi-youtube">x</i>
              </button>
            </span>
          </li>

          <li className="list-group-item">
            Introduction
            <span className="float-end">
              <span className="me-5">1 Hour 30 Minutes</span>
              <button className="btn btn-sm btn-danger">
                <i className="bi-youtube">x</i>
              </button>
            </span>
          </li>
        </ul>
      </div>

      {/* ====================== RELATED COURSES SECTION ====================== */}
      <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>

      <div className="row mb-4">
        {/* Related Course 1 */}
        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Course title</Link>
              </h5>
            </div>
          </div>
        </div>

        {/* Related Course 2 */}
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====================== EXPORT ======================
export default CourseDetail;
