import UserImage from "../Asset/User.webp"; // Importing the user image with a more descriptive name

function Userhome() {
  return (
    <>
      {/* User Home Section */}
      <div id="UserHome">
        <img src={UserImage} alt="User" style={{ width: "100%", height: "580px" }} /> {/* Displaying the user image */}
        <div>{/* Any additional content for the User Home section */}</div>
      </div>
      {/* User Home Section End */}
    </>
  );
}

export default Userhome;
