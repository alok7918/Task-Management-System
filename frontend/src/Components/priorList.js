import React, { useState, useEffect } from "react";
import axios from "axios";
import "./priorList.css";

const PriorityList = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    // Function to fetch task data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/task/Display");
        // Set task data in state
        setTaskData(response.data);
        // Store task data in local storage
        localStorage.setItem("taskData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching task data:", error);
        // Handle error (e.g., show a message to the user)
      }
    };

    // Retrieve task data from local storage
    const storedTaskData = JSON.parse(localStorage.getItem("taskData"));
    if (storedTaskData) {
      // If task data exists in local storage, set it in state
      setTaskData(storedTaskData);
    } else {
      // If task data doesn't exist in local storage, fetch it from the server
      fetchData();
    }
  }, []);

  // Function to handle drag start event
  const onDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  // Function to handle drag over event
  const onDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle drop event
  const onDrop = (event, priority) => {
    event.preventDefault();
    const task = JSON.parse(event.dataTransfer.getData("task"));
    const originalPriority = task.priority;

    if (originalPriority !== priority) {
      // Move task to a different priority level
      const updatedTaskData = taskData.map((t) =>
        t.title === task.title && t.description === task.description
          ? { ...t, priority }
          : t
      );
      setTaskData(updatedTaskData);
      localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
      axios
        .put(`http://localhost:8000/task/${task._id}`, { priority })
        .then((res) => {
          console.log("Task priority updated successfully:", res.data);
        })
        .catch((error) => {
          console.error("Error updating task priority:", error);
          // Handle error (e.g., show a message to the user)
        });
    } else {
      // Move task within the same priority level
      const updatedTaskData = [...taskData];
      const removedTaskIndex = updatedTaskData.findIndex((t) => t.title === task.title && t.description === task.description);
      const removedTask = updatedTaskData.splice(removedTaskIndex, 1)[0];
      const dropIndex = updatedTaskData.findIndex((t) => t.priority === priority);
      updatedTaskData.splice(dropIndex, 0, removedTask);
      setTaskData(updatedTaskData);
      localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
    }
  };

  // Function to get task style based on priority
  const getTaskStyle = (priority) => {
    switch (priority) {
      case "High":
        return { backgroundColor: "red" }; // Red for high priority
      case "Medium":
        return { backgroundColor: "green" }; // Green for medium priority
      case "Low":
        return { backgroundColor: "orange" }; // Orange for low priority
      default:
        return {};
    }
  };

  // Function to render tasks by priority
  const renderTasksByPriority = (priority) =>
    taskData
      .filter((task) => task.priority === priority)
      .map((task, index) => (
        <div
          key={index}
          draggable
          onDragStart={(event) => onDragStart(event, task)}
          className="taskpriority"
          style={getTaskStyle(priority)} // Apply dynamic style based on priority
        >
          <span className="list2">Title:</span>
          <span className="list1">{task.title}</span>
          <br/>
          <hr/>
          <span className="list2">Description:</span>
          <span className="list">{task.description}</span>
        </div>
      ));

  return (
    <>
      <div style={{backgroundColor:"#2d2d2d"}}>
        <div style={{backgroundColor:"#2d2d2d", height:"20px", width:"100%"}}></div>
        <div>
          <div className="order">
            <span className="olist">High:</span><div className="b1"  id="box"></div>
            <span className="olist">Medium:</span><div  className=" b2"id="box"></div>
            <span className="olist">Low:</span><div className="b3" id="box"></div>
          </div>
        </div>

        <div className="priority">
          <div
            className="prioritybox"
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, "High")}
          >
            {renderTasksByPriority("High")}
          </div>
          <div
            className="prioritybox"
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, "Medium")}
          >
            {renderTasksByPriority("Medium")}
          </div>
          <div
            className="prioritybox"
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, "Low")}
          >
            {renderTasksByPriority("Low")}
          </div>
        </div>
      </div>
    </>
  );
};

export default PriorityList;
