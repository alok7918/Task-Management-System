import { useState } from "react";
import axios from "axios";

const Insert = () => {
  // State to manage form input values
  const [input, setInput] = useState({});

  // Function to update input state when user types in the form fields
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // API endpoint for inserting task data
    let url = "http://localhost:8000/task/insert";
    // Send a POST request to the API with the input data
    axios.post(url, input).then((res) => {
      // Display success message
      alert("Task saved successfully");
      console.log(res);
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "#2d2d2d" }}>
        <center style={{ marginTop: "1px" }}>
          <div class="form-container">
            <form class="form">
              <div class="form-group">
                <h1>Assign Task</h1>
                <label for="title">Task Name:</label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleInput}
                />
              </div>

              <div class="form-group">
                <label>Enter Description Title:</label>
                <input
                  type="text"
                  class="form-control"
                  name="description"
                  value={input.description}
                  onChange={handleInput}
                />
              </div>

              <div class="form-group">
                <label for="textarea">Enter Description:</label>
                <textarea
                  id="textarea"
                  rows="10"
                  cols="50"
                  name="descriptiondetail"
                  value={input.descriptiondetail}
                  onChange={handleInput}
                ></textarea>
              </div>

              <div class="form-group">
                <label for="pwd">Due Date</label>
                <input
                  type="date"
                  name="date"
                  value={input.date}
                  onChange={handleInput}
                />
              </div>

              <div class="form-group">
                <label for="priority">priority:</label>
                <select
                  name="priority"
                  value={input.priority}
                  onChange={handleInput}
                >
                  <option>Select Task Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <button
                class="form-submit-btn"
                type="submit"
                onClick={handleSubmit}
              >
                Assign Task
              </button>
            </form>
          </div>
        </center>
      </div>
    </>
  );
};

export default Insert;
