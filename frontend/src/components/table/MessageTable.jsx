import React, { useEffect, useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { GetMessageAction } from "../../redux/actions/MessageActions";
// MUI Styled
import { styled } from "@mui/material/styles";
//Material Ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

//MUI TAG STYLING
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.action.hover,
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//MAIN FORM ARROW FUNCTION OF LIST-TABLE
export default function MessageTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //REDUX
  const dispatch = useDispatch();
  const getMessage = useSelector((state) => state.getMessage);
  const { getmessage } = getMessage;

  useEffect(() => {
    dispatch(GetMessageAction());
  }, [dispatch]);
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #F0F0F0",
        }}
      >
        <Table aria-label="customized table">
          <TableBody>
            <TableRow>
              <StyledTableCell sx={{ fontWeight: "600" }}>
                Community
              </StyledTableCell>

              <StyledTableCell sx={{ fontWeight: "600" }}>
                Message
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "600" }}>
                Sender
              </StyledTableCell>
            </TableRow>
          </TableBody>

          <TableBody>
            {getmessage ? (
              getmessage
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.community}>
                    <StyledTableCell component="th" scope="row">
                      {row.community}
                    </StyledTableCell>
                    <StyledTableCell>{row.message}</StyledTableCell>
                    <StyledTableCell>{row.sender}</StyledTableCell>
                  </StyledTableRow>
                ))
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={getmessage ? getmessage.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>{" "}
    </Box>
  );
}
