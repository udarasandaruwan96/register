import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./ManageNotice.css"


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
  createData('We needed 200 red Machine '),
  createData('we needed 100000m white cloths')
];


const ManageNotice = (props) => {
    const classes = useStyles();
    return (
        <>
        <div className="udManageNotice_Form1 ">
          <div className="udManageNotice_title">MANAGER ORDERS</div>
            
            <div className="udManageNotice_Form2">

              <TableContainer component={Paper} style={{backgroundColor:'#1B1B1B',borderRadius:"15px"}}>
                  <Table className={classes.table} aria-label="caption table" >
                    <TableHead >
                      <TableRow>
                        <TableCell align="center" className="udNotice_cellColor1"><div className="udNotice_headcolor1">Description</div></TableCell>
                        <TableCell align="center" className="udNotice_cellColor1"><div className="udNotice_headcolor1">Action</div></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell align="center" className="udNotice_cellColor2">{row.Description}</TableCell>
                          <TableCell onClick={() => (0)} align="center" className="udNotice_cellColor2" >
                            <select className="udNotice_select">
                                <option className="acc">ACCEPT</option>
                                <option className="rej">REJECT</option>
                            </select></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer>
                     
                      </div>
                      <div  onClick={() =>props.onClick("supplier")} className="udNotice_backbtn1 ">PREVIOUS</div>
                      </div>
              </>
    )
}

export default ManageNotice