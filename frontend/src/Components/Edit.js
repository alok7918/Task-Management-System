import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Edit = () => {
  // Get the task ID from the URL params
  const { id } = useParams();
  const myNav = useNavigate();
  const [input, setInput] = useState({});

  // Function to fetch the task data for editing
  const loadData = () => {
    let url = "http://localhost:8000/task/geteditdata";
    axios.post(url, { id: id }).then((res) => {
      setInput(res.data);
      console.log(res.data);
    });
  };

  // Function to handle input changes
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    let url = "http://localhost:8000/task/editsave";
    axios.post(url, input).then((res) => {
      alert("Task updated successfully");
      myNav("/display");
    });
  };

  // Load task data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <center style={{ backgroundColor: "#2d2d2d" }}>
        <h1 style={{ color: "green" }}>Edit Task Here</h1>
        <div>
          <div class="form-container">
            <form class="form">
              <div class="form-group">
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
                  rows="8"
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
                <label for="priority">Priority:</label>
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
                Update Task
              </button>
            </form>
          </div>
        </div>
      </center>
    </>
  );
};

export default Edit;
