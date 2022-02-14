import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./ViewDetails.css";

const useStyles = makeStyles({
  table: {
    maxWidth: 1000,
    minWidth: 600,
    minHeight: 200,
  },
});

function createData(Description) {
  return { Description };
}

const rows = [createData("ADD A NEW BUS ROUTE ")];

const ViewDetails = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className="viewdetails1">
        <div className="viewdetailstitle">MANAGER ORDERS</div>
        <div className="viewdetails2">
          <TableContainer
            component={Paper}
            style={{ backgroundColor: "#1B1B1B", borderRadius: "15px" }}
          >
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="viewdetailscellColor1">
                    <div className="viewdetailsheadcolor1">Description</div>
                  </TableCell>
                  <TableCell align="center" className="viewdetailscellColor1">
                    <div className="viewdetailsheadcolor1">Action</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center" className="viewdetailscellColor2">
                      {row.Description}
                    </TableCell>
                    <TableCell
                      onClick={() => 0}
                      align="center"
                      className="viewdetailscellColor2"
                    >
                      <select className="viewnoticeselect">
                        <option className="accept">ACCEPT</option>
                        <option className="reject">REJECT</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          onClick={() => props.onClick("facility")}
          className="viewdetailsbackbtn1"
        >
          PREVIOUS
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
