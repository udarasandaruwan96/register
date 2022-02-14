import React,{useState} from "react"; 
import './Edit.css'
import axios from 'axios'
import swal from "sweetalert";

const Editattendence =  ({ onClick, id, formData }) => {
          const[Name,setName]=useState(formData.Name);
          const[Date,setDate]=useState(formData.Date);
          const[InTime,setInTime]=useState(formData.InTime);
          const[OutTime,setOutTime]=useState(formData.OutTime);
          const[OTHours,setOTHours]=useState(formData.OTHours);

            const EditData= () => {
              const post = {
                  "Name": Name,
                  "Date": Date,
                  "InTime": InTime,
                  "OutTime": OutTime,
                  "OTHours": OTHours
                  
              }

              axios.post(`http://localhost:5000/HrAttendence/${id}`, post).then(res=>{
                if (res.data.message === "success") {
                    setName("");
                    setDate("");
                    setInTime("");
                    setOutTime("");
                    setOTHours("");
                   
          
                    swal("Success", "Employee Details Edit Success", "success");
          
                    return onClick();
                  } else {
                    swal("Sorry", " edit failed", "error");
                  }
                })
                .catch((error) => {
                  swal("Sorry", "edit failed", "error");
                });
            };
          
         
       
    return (
        <div className ="main1">
            <div className="register">
                <center><br/><h2><b><i>EDIT EMPLOYEE DETAILS</i></b></h2></center>
                
                <div className="register1">
                <div type="text" value={formData.Id} disabled="true" />
        <br></br>
                <label><b>First Name :</b></label><br/>
                <input type="text"  className="name" placeholder='' 
                value={Name} onChange={(e)=>{setName(e.target.value)}} 
               />
                <label><b>Date :</b></label><br/>
                <input type="text" className="name" placeholder=''
                  value={Date} onChange={(e)=>{setDate(e.target.value)}} 
                  />
                <label><b>InTime :</b></label><br/>
                <input type="text" className="name" placeholder=''
                  value={InTime} onChange={(e)=>{setInTime(e.target.value)}} 
                  />
                <label><b>Out Time :</b></label><br/>
                 <input type="text" className="name" placeholder=''
                   value={OutTime} onChange={(e)=>{setOutTime(e.target.value)}} 
                   />
                    <label><b>OT Hours :</b></label><br/>
                 <input type="text" className="name" placeholder=''
                   value={OTHours} onChange={(e)=>{setOTHours(e.target.value)}} 
                   />
                   <button
              className="Backbtn13"
            
              onClick={ EditData}
            >
              Save
            </button>

                
            <button className="Backbtn12" onClick={onClick}>
              Cancel
            </button>
   
               </div>
       

    
    </div>
      
      </div>
      
      
   
   
    );
  };
  
export default Editattendence