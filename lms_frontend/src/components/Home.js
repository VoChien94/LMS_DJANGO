import { Link } from "react-router-dom";
import AllCourses from "./AllCourses";
import { useEffect } from "react";
function Home() {
  useEffect(()=>{
    document.title ='LMS | Home Page';
  });
  return (
    <div className="container mt-4">
      {/* ====================== LATEST COURSES ====================== */}
      <h3 className="pb-1 mb-4">
        Latest Courses{" "}
        <Link to="/all-courses" className="float-end">
          See All
        </Link>
      </h3>

      <div className="row">
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
      {/* ==================== END LATEST COURSES ==================== */}

      {/* ====================== POPULAR COURSES ====================== */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Courses{" "}
        <Link to="/popular-courses " className="float-end">
          See All
        </Link>
      </h3>

      <div className="row">
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
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 74985</span>
              </div>
            </div>
          </div>
        </div>

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
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 74985</span>
              </div>
            </div>
          </div>
        </div>

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
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 74985</span>
              </div>
            </div>
          </div>
        </div>

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
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 74985</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ==================== END POPULAR COURSES ==================== */}

      {/* ====================== POPULAR TEACHERS ===================== */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Teachers{" "}
        <Link to="/popular-teachers" className="float-end">
          See All
        </Link>
      </h3>

      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teacher Name</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teacher Name</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teacher Name</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teacher Name</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ==================== END POPULAR TEACHERS ==================== */}

      {/* ====================== STUDENT TESTIMONIALS ================== */}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>

      <div
        id="carouselExampleIndicators"
        className="carousel slide bg-dark text-white py-5"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          />
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>

          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>

          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* ==================== END STUDENT TESTIMONIALS ================= */}
    </div>
  );
}

export default Home;
