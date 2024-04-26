import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Insert from '../Components/Insert';
import Display from '../Components/Display';
import PriorityList from '../Components/priorList';
import Manageusers from '../Components/ManageUsers';
import { useNavigate } from 'react-router-dom';
import six from "../Asset/six.jpg"
import "../Components/Sidebar.css"

function SideNavbar() {
  const mynav = useNavigate();

  // State variable for managing component visibility
  const [showImage, setShowImage] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);

  // Function to handle image click
  const handleImageClick = () => {
    setShowImage(false);
  };

  // Function to handle navigation button click and hide image
  const handleNavigationClick = (componentName) => {
    setShowImage(false);
    setActiveComponent(componentName);
  };

  // Function to handle logout
  const logout = () => {
    mynav("/home");
  };

  return (
    <>
      {showImage && <img src={six} width="100%" onClick={handleImageClick} />}

      <div className="side-navbar">
        <ul>
        <h4 style={{color:"green",marginTop:"30px"}}>Admin Panel</h4>
          <ul className="navbar-nav">

            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleNavigationClick('Insert')}>Assign Task</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleNavigationClick('Display')}>View</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleNavigationClick('PriorityList')}>Priority View</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleNavigationClick('ManageUsers')}>Users Information</a>
            </li>
            <li className="nav-item">
              <button className='btns'>
              <Link to="Home" className='btnsl' onClick={logout}>Logout</Link>
              </button>
            </li>
          </ul>
        </ul>
      </div>

      {/* Render active component */}
      {activeComponent === 'Insert' && <Insert />}
      {activeComponent === 'Display' && <Display />}
      {activeComponent === 'PriorityList' && <PriorityList />}
      {activeComponent === 'ManageUsers' && <Manageusers />}

    </>
  );
}

export default SideNavbar;
