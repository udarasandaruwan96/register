import React,{useState} from "react"; 
import './Edit.css'
import axios from 'axios'
import swal from "sweetalert";
import View from "./View";



const EditEmp =  ({ onClick, id, formData }) => {
          const[Name,setName]=useState(formData.Name);
          const[Email,setEmail]=useState(formData.Email);
          const[Address,setAddress]=useState(formData.Address);
          const[ContactInfo,setContactInfo]=useState(formData.ContactInfo);

            const EditData= () => {
              const post = {
                  "Name": Name,
                  "Email": Email,
                  "Address": Address,
                  "ContactInfo": ContactInfo
              }

              axios.post(`http://localhost:5000/hr/${id}`, post).then(res=>{
                if (res.data.message === "success") {
                    setName("");
                    setEmail("");
                    setAddress("");
                    setContactInfo("");
                   
          
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
                <label><b>Email :</b></label><br/>
                <input type="text" className="name" placeholder=''
                  value={Email} onChange={(e)=>{setEmail(e.target.value)}} 
                  />
                <label><b>Address :</b></label><br/>
                <input type="text" className="name" placeholder=''
                  value={Address} onChange={(e)=>{setAddress(e.target.value)}} 
                  />
                <label><b>Contact Info :</b></label><br/>
                 <input type="text" className="name" placeholder=''
                   value={ContactInfo} onChange={(e)=>{setContactInfo(e.target.value)}} 
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
  
export default EditEmp