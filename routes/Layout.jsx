import { Outlet, Link } from "react-router-dom"
import '../src/App.css'
import drama from "../src/assets/drama.png"
function Layout() {

    return (
        <div className="nav-bar">
            <div className="nav-content">
                <div className="nav-title">
                <img style={{width:"5vw", paddingRight:"1vw"}}src={drama}/>
                <h2 >K-Drama Hub</h2>
                </div>
                <nav>
                    <ul className="home">
                        <li className="home-link" key="home-button">
                            <Link style={{ color: "white" }} to="/">Home</Link>
                        </li>
                        <li className="home-link" key="create-button">
                            <Link style={{ color: "white" }} to="/create"> Create New Post</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="page-content">
            <Outlet />
            </div>
        </div >
    )
}

export default Layout
