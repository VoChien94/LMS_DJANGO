import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import CourseDetail from "./CourseDetail";

//Users
import Login from "./User/Login";
import Register from "./User/Register";
import Logout from "./User/StudentLogout";
import Dashboard from "./User/Dashboard";
import FavoriteCourses from "./User/FavoriteCourses";
import MyCourses from "./User/MyCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import StudentAssignments from "./User/StudentAssignments";
import ProfileSetting from "./User/ProfileSetting";
import ChangePassword from "./User/ChangePassword";
// Teachers
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherLogout from "./Teacher/TeacherLogout";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherCourses from "./Teacher/TeacherCourses";
import EnrolledStudents from "./Teacher/EnrolledStudents";
import AddCourse from "./Teacher/AddCourse";
import EditCourse from "./Teacher/EditCourse";
import AddChapter from "./Teacher/AddChapter";
import UserList from "./Teacher/UserList";
import AddAssignment from "./Teacher/AddAssignment";
import ShowAssignment from "./Teacher/ShowAssignment";
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";

import { Routes as Switch, Route } from "react-router-dom";
import TeacherDetail from "./TeacherDetail";
import AllCourses from "./AllCourses";
import AllChapters from "./Teacher/CourseChapters";
import EditChapter from "./Teacher/EditChapter.js";
import PopularCourses from "./PopularCourses";
import PopularTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";
import TeacherSkillCourses from "./TeacherSkillCourses";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-logout" element={<Logout />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favorite-courses" element={<FavoriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/add-assignment/:student_id/:teacher_id" element={<AddAssignment />} />
        <Route path="/show-assignment/:student_id/:teacher_id" element={<ShowAssignment />} />
        <Route path="/my-assignments/" element={<StudentAssignments />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/enrolled-students/:course_id" element={<EnrolledStudents />} />
        <Route
          path="/teacher-profile-setting"
          element={<TeacherProfileSetting />}
        />
        <Route
          path="/teacher-change-password"
          element={<TeacherChangePassword />}
        />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/teacher-users" element={<UserList />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/all-chapters/:course_id" element={<AllChapters />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/popular-teachers" element={<PopularTeachers />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />
        <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses />} />

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
