import React, {useState} from 'react'
import "./HumanResource.css"
import swal from "sweetalert";
import EditData from './EditData';
import View from './View';
import Attend from './Attend';
import Hrnorice from './Hrnorice';
import Atendtable from './Atendtable';

const HumanResource = () => {
    const [component,setComponent] = useState("hr");

    return (   
        <div>
            { component === "hr" && <HumanResourceMain onClick={setComponent}/>}
            { component === "editdata" && <EditData onClick={setComponent}/>}
            { component === "view" && < View onClick={setComponent}/>} 
            { component === "attend" && < Attend onClick={setComponent}/>} 
            { component === "hrnotice" && < Hrnorice onClick={setComponent}/>} 
            { component === "atendtable" && < Atendtable onClick={setComponent}/>} 
        </div>   
    )    
}

const HumanResourceMain = (props) => {
    const generateReport = () => {
        swal("Sorry", "Function is under construction", "error");
      }
    return <div className="ro">
    <div className="HumanResourceMain">
            <div className="hbuttongroup1" >
            <div className="editx" onClick={() =>props.onClick("editdata")}></div>
                <h3>ADD EMPLOYEE</h3>
            </div>
            <div className="hbuttongroup2" >
            <div className="feedx" onClick={() =>props.onClick("view")}></div>
                <h3>VIEW DETAILS</h3>
            </div>
            {/* <div className="hbuttongroup3" onClick={() => generateReport()}>
                <div className="fadex"></div>
                <h3>GENARATE REPORT</h3>
            </div> */}
            <div className="hbuttongroup4" >
            <div className="simplex" onClick={() =>props.onClick("attend")}></div>
                <h3>ATTENDANCE REPORT</h3>
            </div>
            <div className="hbuttongroup5" >
            <div className="simplex1" onClick={() =>props.onClick("hrnotice")}></div>
                <h3>VIEW NOTICE</h3>
            </div>
    </div>
  </div>    
}



export default HumanResource
