import { useState , useEffect } from 'react'; 
import axios from 'axios';
import {_apiurluser } from '../Components/APIurlpath/_apiurl';

function Manageusers() {
  const [userDetails , setUserDetails] = useState([]); 
  
  // Function to load user data from the API
  const loadData=()=>{
    axios.get(_apiurluser+"fetch?role=user").then((response)=>{
        setUserDetails(response.data); 
    })
  }

  // useEffect hook to load data when the component mounts
  useEffect(()=>{
    loadData();
  },[]);      

  // Function to manage user status (verify, block, delete)
  const manageuserstatus=(_id,s)=>{
    if(s==="block")
    {
        let updateDetails={"condition_object":{"_id":_id},"set_condition":{"status":0}};
        axios.patch(_apiurluser+"update",updateDetails).then((response)=>{
            loadData();
        }).catch((err)=>{
            console.log(err);
        });            
    }   
    else if(s==="verify")
    {
        let updateDetails={"condition_object":{"_id":_id},"set_condition":{"status":1}};
        axios.patch(_apiurluser+"update",updateDetails).then((response)=>{
            loadData();
        }).catch((err)=>{
            console.log(err);
        });            
    }
    else
    {
        let deleteDetails={"data":{"_id":_id}};
        axios.delete(_apiurluser+"delete",deleteDetails).then((response)=>{
            loadData();
        }).catch((err)=>{
            console.log(err);
        });            
    }
  }
    
  return (
    <>
      <center style={{backgroundColor:"#2d2d2d",height:"600px"}}>
        <div  >
          <h4 style={{color:"green",paddingTop:"50px"}}>
            View & Manage <span>User Details</span>
          </h4>
          <table style={{marginTop:"80px",marginLeft:"150px"}} class="tables " >
            <thead class="tablehead">
              <tr className="trs">
                <th className='tablesr1' >RegID</th>
                <th className='tname'>Name</th>    
                <th className='temail'>Email</th>
                <th  className='temail'>Mobile</th>
                <th className='tinfo'>Info</th>
                <th className='td1'>Date</th>
                <th className='taction'>Action</th>
                <th>Delete</th>
              </tr>    
            </thead>
            {/* Mapping through the user details and rendering them in the table */}
            {userDetails.map((row)=>(
              <tr  className="trs">    
                <td className='tablesr1'>{row._id}</td>
                <td className='tname'>{row.name}</td>   
                <td  className='temail'>{row.email}</td>
                <td  className='temail'>{row.mobile}</td>
                <td className='tinfo'>{row.gender}</td>
                <td className='td1'>{row.info}</td>
                <td className='taction'>
                  {/* Conditional rendering based on user status */}
                  {row.status === 0 &&
                    <a style={{"color":"green"}}  onClick={()=>{ manageuserstatus(row._id,"verify") }} >Verify User</a>
                  }
                  {row.status === 1 &&
                    <a style={{"color":"orange"}}  onClick={()=>{ manageuserstatus(row._id,"block") }} >Block User</a>
                  }    
                </td>
                <td ><a style={{"color":"red"}} onClick={()=>{ manageuserstatus(row._id,"delete") }} >Delete</a></td>
              </tr>
            ))}    
          </table>
        </div>
      </center>        
    </>
  );
}

export default Manageusers;
