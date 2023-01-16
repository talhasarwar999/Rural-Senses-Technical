import React, { useEffect } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { ReviewStaticsAction } from "../../redux/actions/ReviewStaticsActions";
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
  TableHead,
  TableRow,
  Paper,
  Typography,
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
export default function ReviewStaticsTable() {
  //REDUX
  const dispatch = useDispatch();
  const reviewStatics = useSelector((state) => state.reviewStatics);
  const { statics } = reviewStatics;

  useEffect(() => {
    dispatch(ReviewStaticsAction());
  }, [dispatch]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontSize: 20,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "Bold",
          }}
        >
          Family:
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "Bold",
              color: "white",
              mx: 2,
            }}
          >
            {statics ? statics[1]?.family_percentage : "0"}%
          </Typography>
        </Typography>
        <Typography
          gutterBottom
          sx={{
            fontSize: 20,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: 4,
            fontWeight: "Bold",
          }}
        >
          health:
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "Bold",
              color: "white",
              mx: 2,
            }}
          >
            {statics ? statics[1]?.health_percentage : "0"}%
          </Typography>
        </Typography>
        <Typography
          gutterBottom
          sx={{
            fontSize: 20,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: 4,
            fontWeight: "Bold",
          }}
        >
          Unknown:
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "Bold",
              color: "white",
              mx: 2,
            }}
          >
            {statics ? statics[1]?.unknown_percentage : "0"}%
          </Typography>
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #F0F0F0",
          borderRadius: "0px",
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>what bothers you?</StyledTableCell>
              <StyledTableCell>community_name</StyledTableCell>
              <StyledTableCell>community_size</StyledTableCell>
              <StyledTableCell>classification</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statics
              ? statics[0]?.map((data) => (
                  <StyledTableRow key={data.username}>
                    <StyledTableCell component="th" scope="row">
                      {data.username ? (
                        data.username
                      ) : (
                        <span style={{ color: "red" }}>No Data</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {data.csv_file ? (
                        data.csv_file.age
                      ) : (
                        <span style={{ color: "red" }}>No Data</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {data.classification ? (
                        data.classification
                      ) : (
                        <span style={{ color: "red" }}>No Data</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {data.community_name ? (
                        data.community_name
                      ) : (
                        <span style={{ color: "red" }}>No Data</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {data.community_size ? (
                        data.community_size
                      ) : (
                        <span style={{ color: "red" }}>No Data</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {data.classification ? (
                        data.classification
                      ) : (
                        <span style={{ color: "red" }}>No Data</span>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : "no data"}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
