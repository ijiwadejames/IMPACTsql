import { Link } from "react-router-dom"
const AdNav = () => {
  return (
                        <div className="m-auto align-items-center">
                            <div className="btn bg-dark text-white rounded-1 p-3 m-1">
                            <Link to="/admin" className="text-decoration-none text-white">Home</Link>
                            </div>
                            <div className="btn bg-dark text-white rounded-1 p-3 m-1">
                                <Link to="/mentees" className="text-decoration-none text-white">Mentees</Link>
                            </div>
                            <div className="btn bg-dark text-white rounded-1 p-3 m-1">
                                <Link to="/mentors" className="text-decoration-none text-white">Mentors</Link>
                            </div>
                            <div className="btn bg-dark text-white rounded-1 p-3 m-1">
                                <Link to="/reports" className="text-decoration-none text-white">Reports</Link>
                            </div>
                            <div className="btn bg-dark text-white rounded-1 p-3 m-1">
                                <Link to="/messages" className="text-decoration-none text-white">Messages</Link>
                            </div>
                        </div>
  )
}

export default AdNav
