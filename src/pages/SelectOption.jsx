import React from "react";
// import FeedIcon from '@mui/icons-material/Feed';
import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../store/context";
import { useContext } from "react";
function SelectOption() {
  // const { passoutYear, semester, branch, section } = useContext(StateContext);
  const router = useNavigate();
  const { year, sem, branch, section } = useParams();
  // if (
  //   !passoutYear?.value ||
  //   !semester?.value ||
  //   !branch?.value ||
  //   !section?.value
  // ) {
  //   router("/select");
  // }
  return (
    <div className="optionSelect">
      <button
        className="style1"
        onClick={() => {
          router(-1);
        }}
      >
        <i class="fa fa-arrow-circle-left"></i>
      </button>
      <Link
        className="buttonss2"
        to={`/${year}/${sem}/${branch}/${section}/upload`}
      >
        <Button variant="success">
          <p className="texts"> Upload Attendance </p>
        </Button>
      </Link>

      <Link
        className="buttonss2"
        to={`/${year}/${sem}/${branch}/${section}/studentDetail`}
      >
        <Button variant="success">
          <p className="texts"> Upload Student Detail</p>
        </Button>
      </Link>

      <Link
        className="buttonss2"
        to={`/${year}/${sem}/${branch}/${section}/studentData`}
      >
        <Button variant="success">
          <p className="texts">Student Data</p>
        </Button>
      </Link>
    </div>
  );
}

export default SelectOption;
