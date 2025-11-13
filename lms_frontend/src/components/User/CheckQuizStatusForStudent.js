import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function CheckQuizinCourse(props) {
    const [quizData, setquizData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    // Fetch quiz assign status when component loads
    useEffect(() => {
        try {
            axios
                .get(`${BASE_URL}fetch-quiz-attempt-status/${props.quiz}/${props.student}/`)
                .then((res) => {
                    setquizData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [props.quiz, props.course]);



    return (
        <td>
            {quizData.bool === true && (
                <span className="text-success">Attempted</span>
            )}

            {quizData.bool === false && (
                
                <Link to={`take-quiz/${props.quiz}`}
                    className="btn btn-success btn-sm ms-2"
                >
                    Take Quiz
                </Link>
            )}
        </td>
    );
}

export default CheckQuizinCourse;
