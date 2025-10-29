import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import CourseDetail from "./CourseDetail";
import Login from "./User/Login";
import Register from "./User/Register";

import Dashboard from "./User/Dashboard";
import FavoriteCourses from "./User/FavoriteCourses"; 
// Teacher
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherDashboard from "./Teacher/TeacherDashboard";

import { Route, Routes as Swicth} from "react-router-dom";
import MyCourses from "./User/MyCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import ProfileSetting from "./User/ProfileSetting";
import ChangePassword from "./User/ChangePassword";

function App() {
  return (
    <div className="App">
        <Header />
        <Swicth>
            <Route path="/" element ={<Home />} />
            <Route path="/about" element ={<About />} />
            <Route path="/detail/:course_id" element ={<CourseDetail />} />
            <Route path="/user-login" element ={<Login />} />
            <Route path="/user-register" element ={<Register />} />
            <Route path="/user-dashboard" element ={<Dashboard />} />
            <Route path="/my-courses" element ={<MyCourses />} />
            <Route path="/favorite-courses" element ={<FavoriteCourses />} />
            <Route path="/recommended-courses" element ={<RecommendedCourses />} />
            <Route path="/profile-setting" element ={<ProfileSetting />} />
            <Route path="/change-password" element ={<ChangePassword />} />
            <Route path="/teacher-login" element ={<TeacherLogin />} />
            <Route path="/teacher-register" element ={<TeacherRegister />} />
            <Route path="/teacher-dashboard" element ={<TeacherDashboard />} />
        </Swicth>
        <Footer />
    </div>
  );
}

export default App;
