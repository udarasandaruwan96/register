import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./Notice.css"


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
  createData('NECK MAXI, DRESS ,LKR 3,100.00'),
  createData('REMI SLEEVELESS RED, DRESS, LKR 2,100.00')
];


const ManageNotice = (props) => {
    const classes = useStyles();
    return (
        <>
        <div className="manage1notice">
          <div className="mannoticetitle">MANAGER ORDERS</div>
            <div className="manage2notice">

              <TableContainer component={Paper} style={{backgroundColor:'#1B1B1B',borderRadius:"15px"}}>
                  <Table className={classes.table} aria-label="caption table" >
                    <TableHead >
                      <TableRow>
                        <TableCell align="center" className="ncellColor1"><div className="nheadcolor1">Description</div></TableCell>
                        <TableCell align="center" className="ncellColor1"><div className="nheadcolor1">Action</div></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell align="center" className="ncellColor2">{row.Description}</TableCell>
                          <TableCell onClick={() => (0)} align="center" className="ncellColor2" >
                            <select className="noticeselect">
                                <option className="acc">ACCEPT</option>
                                <option className="rej">REJECT</option>
                            </select></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer>
                     
                      </div>
                      <div  onClick={() =>props.onClick("shopping")} className="noticebackbtn1">PREVIOUS</div>
                      </div>
              </>
    )
}

export default ManageNotice
