import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
const Display = () => {

  const mynav = useNavigate()
  const [taskData, setTaskData] = useState([])


  // pagination functionality
  const [currentPage, setCurrentPage] = useState(1);
  const recordsperPage = 5;
  const lastIndex = currentPage * recordsperPage;
  const firstIndex = lastIndex - recordsperPage;
  const records = taskData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(taskData.length / recordsperPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);



  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }


  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }


  const changeCPage = (id) => {
    setCurrentPage(id);
  }



  // getting data from backend
  const loadData = () => {
    axios.get("http://localhost:8000/task/Display").then((res) => {
      setTaskData(res.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])


  // change status 
  const handleToggleStatus = async (id, status) => {
    try {
      const newStatus = status === 'pending' ? 'completed' : 'pending';
      const updatedTodo = await axios.put(`http://localhost:8000/task/Display/${id}`, { status: newStatus });
      setTaskData(taskData.map(todo => (todo._id === id ? updatedTodo.data : todo)));
    } catch (error) {
      console.error(error);
    }
  };


  // delete functionality
  const del = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const url = "http://localhost:8000/task/Delete";
      axios.post(url, { id: id })
        .then((res) => {

          loadData();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };


  //edit function
  const edit = (id) => {
    mynav("/edit/" + id);
  }

  //to view description on next page
  const descriptionHere = (description, date, descriptiondetail) => {
    mynav(`/Des/${description}/${date}/${descriptiondetail}`);
  };


  const mydata = records.map((key, index) => {

    return (
      <>
        <tbody className="tbody">
          <tr className="trs">
            <td className="sr">{index + 1}</td>
            <td className="td1">  {key.title}</td>
            <td className="tds" onClick={() => descriptionHere(key.description, key.date, key.descriptiondetail)}>{key.description}</td>
            <td className="date"> {key.date}</td>
            <td className="date">
              <div style={{ display: "flex" }} >
                <div className="stat">
                  {key.status}
                </div>
                <label class="material-checkbox">
                  <input onClick={() => handleToggleStatus(key._id, key.status)} type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div></td>
            <td className="edit1">
              <button onClick={() => { edit(key._id) }} class="edit-button">
                <svg class="edit-svgIcon" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
            </td>
            <td className="edit1">
              <button onClick={() => { del(key._id) }} class="Btn">
              <div class="sign">
                <svg
                    viewBox="0 0 16 16"
                    class="bi bi-trash3-fill"
                    fill="currentColor"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                    ></path>
                  </svg>
                </div>
                <div class="text">Delete</div>
              </button>
            </td>
          </tr>
        </tbody>
      </>
    )

  })
  return (
    <>
      <div style={{ backgroundColor: "#2d2d2d", height: "700px" ,marginLeft:"-100px" }}>
        <center>
          <h1 style={{ color: "green", paddingTop: "20px" }} >Assigned Tasks</h1> </center>
        <div className="sidebar" >
          <div>
            <table style={{ paddingTop: "20px", marginTop: "20px" }} class="tables ">
              <thead class="tablehead" >
                <tr className="trs">
                  <th className="sr">Sr.</th>
                  <th>Title</th>
                  <th >description</th>
                  <th>date</th>
                  <th>status</th>
                  <th className="edit1">Edit</th>
                  <th className="edit1">Delete</th>
                </tr>
              </thead>
              {mydata}
            </table>

            {/* for pagination */}
            <nav class="page">
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" onClick={prevPage}>Prev</a>
                </li>
                {
                  numbers.map((n, i) => (
                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                      <a href="#" className="page-link" onClick={() => { changeCPage(n) }} >{n}</a>
                    </li>
                  ))
                }
                <li className="page-item">
                  <a href="#" className="page-link" onClick={nextPage}>Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div style={{ margin: "100px", padding: "20px" }}>
        </div>
      </div>


    </>
  )
}

export default Display;

