import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import CourseDetail from "./CourseDetail";

import { Route, Routes as Swicth} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header />
        <Swicth>
            <Route path="/" element ={<Home />} />
            <Route path="/about" element ={<About />} />
            <Route path="/detail/:course_id" element ={<CourseDetail />} />
        </Swicth>
        <Footer />
    </div>
  );
}

export default App;
