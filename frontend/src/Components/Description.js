import { useParams, useNavigate } from "react-router-dom";
import img1 from "../Asset/Two.jpg";

const Description = () => {
  // Get URL parameters
  const { description, date, descriptiondetail } = useParams();
  const mynav = useNavigate();

  // Function to navigate back to the display page
  const navigateBack = () => {
    mynav("/admin/display");
  };

  return (
    <>
      <div style={{ backgroundColor: "#2d2d2d", height: "700px" }}>
        <div>
          <div className="details">
            <h3 style={{ marginLeft: "60px", marginTop: "10px" }}>Description Box</h3>
            {/* Image */}
            <img
              style={{
                width: "350px",
                height: "200px",
                marginLeft: "20px",
                marginTop: "20px",
                borderRadius: "10px",
              }}
              src={img1}
              alt="Description Image"
            />
            <br />
            {/* Date */}
            <span className="detdate">Date: {date}</span>
            <span>
              {/* Description Title */}
              <h5 className="detdes">Description title:</h5>
              <p className="detdesc">{description}</p>
            </span>
            {/* Full Description */}
            <h5 className="detdesc">Full Description:</h5>
            <p className="detdesc">{descriptiondetail}</p>

            {/* Back Button */}
            <div className="detdates">
              <button onClick={navigateBack}>back</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
