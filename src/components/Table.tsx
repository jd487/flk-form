import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox } from "@mui/material";
import { User } from "../types/user.types";

type FollowCompanyTableProps = {
  data: Array<User>;
  deleteRow: (email: string) => void;
  updateRow: (e: React.ChangeEvent<any>) => void;
  primary?: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UserTable = (props: FollowCompanyTableProps) => {
  const { data, deleteRow, updateRow, primary } = props;

  const sortedData = data.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Make Primary</StyledTableCell>
            <StyledTableCell align="left">Delete User</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row: User) => (
            <TableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell align="left">{row.lastName}</StyledTableCell>
              <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">
                <Checkbox
                  checked={row.email === primary}
                  name={row.email}
                  onClick={updateRow}
                />
              </StyledTableCell>
              <StyledTableCell align="left">
                <Button
                  variant="contained"
                  onClick={() => deleteRow(row.email)}
                >
                  Delete User
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
