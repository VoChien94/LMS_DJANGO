import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

function AddChapter() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <div className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" id="title" name="title" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea id="description" name="description" className="form-control"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label">Video</label>
                                    <input type="file" id="video" name="video" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="techs" className="form-label">Remarks</label>
                                    <textarea placeholder="This is video is focused on basic" id="techs" name="techs" className="form-control"></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddChapter;
