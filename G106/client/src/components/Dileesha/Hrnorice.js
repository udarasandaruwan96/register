import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./hrnotice.css"


const useStyles = makeStyles({
    table: {
      maxWidth: 1000,
      minWidth: 600,
      minHeight: 200,    
    },
  });


  function createData( Description ) {
    return {  Description };
  }
  
  const rows = [
    createData(<h2><b>'We Need Several Employees '</b></h2>),
  ];
  
  
  const HrNotice = (props) => {
      const classes = useStyles();
      return (
          <>
          <div className="hr1notice">
           <center> <div className="hrtoman">MANAGER ORDERS</div></center>
              <div className="hrnotice">
  
                <TableContainer component={Paper} style={{backgroundColor:'black',borderRadius:"15px"}}>
                    <Table className={classes.table} aria-label="caption table" >
                      <TableHead >
                        <TableRow>
                          <TableCell align="center" className="hrcellColor1"><div className="nheadcolor1">Description</div></TableCell>
                          <TableCell align="center" className="hrcellColor1"><div className="nheadcolor1">Action</div></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody >
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell align="center" className="ndcellColor2">{row.Description}</TableCell>
                            <TableCell onClick={() => (0)} align="center" className="ndcellColor2" >
                              <select className="hrnoticeselect">
                                  <option className="acc1">ACCEPT</option>
                                  <option className="rej1">REJECT</option>
                              </select></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                       
                        </div>
                        <div  onClick={() =>props.onClick("hr")} className="hrnoticebackbtn1">PREVIOUS</div>
                        </div>
                </>
      )
  }
  
  export default HrNotice
