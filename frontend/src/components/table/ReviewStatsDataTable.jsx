import React, { useEffect, useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { ReviewStatsDataAction } from "../../redux/actions/ReviewStatsDataAction";
import {MessageAction} from "../../redux/actions/MessageActions"
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
  Button,
  TablePagination,
} from "@mui/material";
import { useSnackbar } from "notistack";

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
export default function ReviewStatsDataTable() {
   const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { enqueueSnackbar } = useSnackbar();


  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnSubmit = (community) => {
    dispatch(MessageAction(community));
    enqueueSnackbar("Review Sent Successfully");

  };

  //REDUX
  const dispatch = useDispatch();
  const reviewStatsData = useSelector((state) => state.reviewStatsData);
  const { statsdata } = reviewStatsData;

  useEffect(() => {
    dispatch(ReviewStatsDataAction());
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
                What bother's
              </StyledTableCell>

              <StyledTableCell sx={{ fontWeight: "600" }}>Age</StyledTableCell>

              <StyledTableCell sx={{ fontWeight: "600" }}>
                Classification
              </StyledTableCell>

              <StyledTableCell sx={{ fontWeight: "bolder" }}>
                Message
              </StyledTableCell>
            </TableRow>
          </TableBody>

          <TableBody>
            {statsdata ? (
              statsdata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.community}
                    </StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell>{row.age}</StyledTableCell>

                    <StyledTableCell>{row.classification}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={handleOnSubmit.bind(this, row.community)}
                        variant="outlined"
                      >
                        Message
                      </Button>
                    </StyledTableCell>
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
          count={statsdata ? statsdata.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>{" "}
    </Box>
  );
}
