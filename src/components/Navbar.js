import React from 'react'
import { Link } from 'react-router-dom';


const Navbar =()=> {
  

  
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand fw-bold" to="/"><h4>Daily News</h4></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                      <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                  </li>
                  {/* <li className="nav-item"><Link className="nav-link text-light" to="/About">About</Link></li> */}
                  <li className="nav-item"><Link className="nav-link text-light" to="/business">Business</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/entertainment">Entertainment</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/general">General</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/health">Health</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/science">Science</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/sports">Sports</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/technology">Technology</Link></li>
                
                </ul>
                
            </div>
            </nav>
      </div>
    )
  
}

export default Navbar
