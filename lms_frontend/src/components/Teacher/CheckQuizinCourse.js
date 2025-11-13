import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function CheckQuizinCourse(props) {
  const [quizData, setquizData] = useState([]);
  const teacherId = localStorage.getItem('teacherId');

  // Fetch quiz assign status when component loads
  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}fetch-quiz-assign-status/${props.quiz}/${props.course}/`)
        .then((res) => {
          setquizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [props.quiz, props.course]);

  // Assign quiz to course
  const assignQuiz = (quiz_id) => {
    const _formData = new FormData();
    _formData.append('teacher', teacherId);
    _formData.append('course', props.course);
    _formData.append('quiz', props.quiz);

    try {
      axios
        .post(`${BASE_URL}quiz-assign-course/`, _formData, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <td>
      {quizData.bool === false && (
        <button
          onClick={() => assignQuiz(props.quiz)}
          className="btn btn-success btn-sm ms-2"
        >
          Assign Quiz
        </button>
      )}

      {quizData.bool === true && (
        <span className="text-success">Assigned</span>
      )}
    </td>
  );
}

export default CheckQuizinCourse;
