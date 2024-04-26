import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


const Layout = () => {

  //to set header according to the role
  const [Headercontent, setHeadercontent] = useState();
  const myNav = useNavigate();


  //to remove the locally stored login data 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id",);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("mobile");
    localStorage.removeItem("address");
    localStorage.removeItem("city");
    localStorage.removeItem("gender");
    localStorage.removeItem("role");
    localStorage.removeItem("info");

    myNav("/Home");
  }
  //to select between roles every time user login
  useEffect(() => {
    if (localStorage.getItem("role") === "user") {
      setHeadercontent(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <div className="Navset">
            <h3>User Panel</h3>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><Link to="display" className="Nlinks" >View Task</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><Link to="home" onClick={handleLogout} className="Nlinks" >Logout</Link></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      setHeadercontent(
        <div className="nbar">
          <div className="bars">
            <div className="navi">
              <h6 className="logo">TMS<br />solutions</h6>
              <div className="bar">
                <h6 className="tab">Solutions</h6>
                <h6 className="tab">Pricing</h6>
                <h6 className="tab">Task</h6>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
  return (
    <>
      {Headercontent}
      <Outlet />
    </>
  );
}

export default Layout;
