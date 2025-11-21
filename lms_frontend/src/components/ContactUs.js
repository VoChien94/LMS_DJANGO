// Import Link để điều hướng giữa các trang React
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api/contact/';
function ContactUs() {
    const [ContactData, setContactData] = useState({
        'full_name': '',
        'email': '',
        'query_txt': '',
        'status': '',

    });
    //Chang element value
    const handleChange = (event) => {
        setContactData({
            ...ContactData,
            [event.target.name]: event.target.value
        });
    }

    //End
    const listStyle = {
        'list-style': 'none',
    }

    // Submit Form
    const submitForm = (event) => {
        event.preventDefault();
        const contactFormData = new FormData();
        contactFormData.append("full_name", ContactData.full_name);
        contactFormData.append("email", ContactData.email);
        contactFormData.append("query_txt", ContactData.query_txt);

        try {
            axios.post(BASE_URL, contactFormData).then((response) => {
                setContactData({
                    'full_name': '',
                    'email': '',
                    'query_txt': '',
                    'status': 'success',

                })
            });
        } catch (error) {
            console.log(error);
            setContactData({ 'status': 'error' })
        }

    };
    useEffect(() => {
        document.title = "Contact Us"
    });

    // End

    return (
        // Khung chính của form (Bootstrap)
        <div className="container mt-4">
            <div className="row">
                <div className="col-7">
                    {ContactData.status == 'success' && <p class="text-success">Thanks for Contacting Us</p>}
                    {ContactData.status == 'error' && <p class="text-danger">Something wrong happened!</p>}
                    <div className="card">
                        <h5 className="card-header">Contact Us</h5>

                        {/* Phần thân form */}
                        <div className="card-body">
                            <form>
                                {/* Full Name */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        Full Name
                                    </label>
                                    <input value={ContactData.full_name} onChange={handleChange} name='full_name' type="text" className="form-control" />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        Email
                                    </label>
                                    <input value={ContactData.email} onChange={handleChange} name='email' type="email" className="form-control" />
                                </div>


                                {/* Interests */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        Query
                                    </label>
                                    <textarea rows="10" value={ContactData.query_txt} onChange={handleChange} name="query_txt" className="form-control"></textarea>
                                </div>

                                {/* Nút Register */}
                                <button onClick={submitForm} type="button" className="btn btn-primary">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-4 offset-1">
                    <h3 className="border-bottom">Address</h3>

                    <ul className="address-list m-0 p-0" style={listStyle}>
                        <li>
                            <label className="fw-bold">Address:</label>
                            <span className="ms-2">50, Green Avenue, New Delhi</span>
                        </li>
                        <li>
                            <label className="fw-bold">Mobile:</label>
                            <span className="ms-2">1234567890</span>
                        </li>
                        <li>
                            <label className="fw-bold">Phone:</label>
                            <span className="ms-2">121</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

// Xuất component để sử dụng
export default ContactUs;
