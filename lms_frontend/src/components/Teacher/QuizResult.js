import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';
function QuizResult(props) {
    const [resultData, setresultData] = useState([]);

    // Fetch quiz assign status when component loads
    useEffect(() => {
        try {
            axios
                .get(`${BASE_URL}fetch-quiz-result/${props.quiz}/${props.student}/`)
                .then((res) => {
                    setresultData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [props.quiz, props.student]);


    return (
      
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Quiz Result</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <tr>
                                <td>Total Questions</td>
                                <td>{resultData.total_questions}</td>
                            </tr>
                            <tr>
                                <td>Attempted Questions</td>
                                <td>{resultData.total_attempted_questions}</td>
                            </tr>
                        </table>
                    </div>

                </div>
            </div>
        

    );
}

export default QuizResult;
