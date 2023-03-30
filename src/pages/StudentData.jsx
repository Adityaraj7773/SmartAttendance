import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { green } from '@mui/material/colors';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../store/context";

function StudentData() {
  const [data, setData] = React.useState([]);
  const router = useNavigate();
  const { setLoading, setLoadingText } = React.useContext(StateContext);
  const { year, sem, branch, section } = useParams();
  if (!year || !sem || !branch || !section) {
    router("/select");
  }
  // if (
  //   !passoutYear?.value ||
  //   !semester?.value ||
  //   !branch?.value ||
  //   !section?.value
  // ) {
  //   router("/select");
  // }
  useEffect(() => {
    setLoading(true);
    setLoadingText("Fetching data");
    fetch(`${process.env.REACT_APP_SERVER_URL}api/student/getStudentsDecoded`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passoutYear: year,
        branch: branch,
        section: section,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(
          result.students
            .map((student) => ({
              name: student.name,
              roll: student.roll,
              branch: student.branch,
              section: student.section,
              passoutYear: student.passoutYear,
              image: student.image,
            }))
            .sort((a, b) => a.roll.slice(4) - b.roll.slice(4))
        );
        setData(
          result.students
            .map((student) => ({
              name: student.name,
              roll: student.roll,
              branch: student.branch,
              section: student.section,
              passoutYear: student.passoutYear,
              image: student.image,
            }))
            .sort((a, b) => a.roll.slice(4) - b.roll.slice(4))
        );
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(data);
  return (
    <TableContainer component={Paper}>
      <button
        className="style1"
        onClick={() => {
          router(-1);
        }}
      >
        <i class="fa fa-arrow-circle-left"></i>
      </button>
      <h3 style={{ textAlign: "center", marginTop: "1.5rem" }}>
        Students`s Data
      </h3>
      <Table
        className="tablemargin"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead className="tableheadgreen">
          <TableRow>
            <TableCell align="left">
              <h5 className="whitetext">Branch&nbsp;</h5>
            </TableCell>
            <TableCell align="left">
              <h5 className="whitetext">Section&nbsp;</h5>
            </TableCell>
            <TableCell align="left">
              <h5 className="whitetext">Passout Year&nbsp;</h5>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "&:last-child td, &:last-child th": {
              border: 1.5,
              borderColor: "green",
            },
          }}
        >
          <TableRow>
            <TableCell align="left">{branch}</TableCell>
            <TableCell align="left">{section}</TableCell>
            <TableCell align="left">{year}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table
        className="tablemargin"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead className="tableheadgreen">
          <TableRow>
            <TableCell>
              <h5 className="whitetext">Sr.</h5>
            </TableCell>
            <TableCell>
              <h5 className="whitetext">Name</h5>
            </TableCell>

            <TableCell align="left">
              <h5 className="whitetext">Roll No.&nbsp;</h5>
            </TableCell>
            <TableCell align="left">
              <h5 className="whitetext">Branch&nbsp;</h5>
            </TableCell>
            <TableCell align="left">
              <h5 className="whitetext">Section&nbsp;</h5>
            </TableCell>
            <TableCell align="left">
              <h5 className="whitetext">Passout Year&nbsp;</h5>
            </TableCell>
            <TableCell align="left">
              <h5 className="whitetext">Image&nbsp;</h5>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "&:last-child td, &:last-child th": {
              border: 1.5,
              borderColor: "green",
            },
          }}
        >
          {data.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 1.5,
                  borderColor: "green",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.roll}</TableCell>
              <TableCell align="left">{row.branch}</TableCell>
              <TableCell align="left">{row.section}</TableCell>
              <TableCell align="left">{row.passoutYear}</TableCell>
              <TableCell align="left">
                <img src={row.image} height={100} width={100} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default StudentData;
