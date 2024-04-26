import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Insert from "./Components/Insert";
import Home from "./Components/Home";
import Display from "./Components/Display";
import Edit from "./Components/Edit";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AdminHome from "./adminHomeComponent/AdminHome";
import UserHome from "./UserHomeComponent/UserHome";
import Logout from "./Components/Logout";
import Description from "./Components/Description";
import Manageusers from "./Components/ManageUsers";
import Prioritylist from "./Components/priorList";
import UserDisplay from "./Components/UserDisplay";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home routes */}
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin/home" element={<Home />} />

            {/* Insert route */}
            <Route path="insert" element={<Insert />} />

            {/* Display routes */}
            <Route path="/admin/display" element={<Display />} />
            <Route path="/display" element={<UserDisplay />} />

            {/* Priority list route */}
            <Route path="/admin/Priority" element={<Prioritylist />} />

            {/* Edit route */}
            <Route path="edit/:id" element={<Edit />} />

            {/* Register and login routes */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            {/* Admin and user home routes */}
            <Route path="admin" element={<AdminHome />} />
            <Route path="user" element={<UserHome />} />

            {/* Manage users route */}
            <Route path="manageuser" element={<Manageusers />} />

            {/* Description route */}
            <Route path="/Des/:description/:date/:descriptiondetail" element={<Description />} />
          </Route>

          {/* Logout route */}
          <Route path="logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
