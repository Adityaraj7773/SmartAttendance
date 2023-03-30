import React from "react";
import { useParams } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirm";
import { AddCircleOutline } from "@mui/icons-material";
// import Draggable from "react-draggable";
// import DeleteConfirmation from "./DeleteConfirm";
// import "bootstrap/dist/css/bootstrap.min.css";

var monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const removeDuplicates = (arr) => {
  return Array.from(new Set(arr.map((e) => e?.trim()))).filter(
    (el) => !el.startsWith("unknown")
  );
};
export default function ViewAttendance({
  attendanceList,
  setToggleViewAttendance,
  studentsList,
}) {
  const uniqueStudents = removeDuplicates(attendanceList);
  const [list, setList] = useState(uniqueStudents);
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState("");
  const [addStudent, setAddStudent] = useState("");
  const handleRemove = () => {
    setList(list.filter((el) => el !== target));
  };

  const { branch, section, semester, year } = useParams();
  const downloadFile = () => {
    if (list.length > 0) {
      let string2 = prompt("Enter SUBJECT : ", "subject");
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let currentDate = `${day}-${monthName[month]}-${year}`;
      let string;
      if (string2) {
        string =
          string2 + "_" + branch + "(" + section + ")" + "_" + currentDate;
      } else {
        string = currentDate;
      }
      const link = document.createElement("a");
      const content = list.join("\n");
      const file = new Blob([content], { type: "text/plain" });
      link.href = URL.createObjectURL(file);
      link.download = string + " ";
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };
  const datalistforStudents = studentsList.map((item) => {
    return item.roll + "_" + item.name;
  });
  console.log(list);

  return (
    <div>
      <DeleteConfirmation
        message={"Are you sure?"}
        showModal={showModal}
        hideModal={() => {
          setShowModal(false);
        }}
        confirmModal={handleRemove}
      />
      <div>
        <button
          className="style1"
          onClick={() => {
            setToggleViewAttendance(false);
          }}
        >
          <i class="fa fa-arrow-circle-left"></i>
        </button>

        <p className="AttendanceList">Attendance List</p>
      </div>
      <div className="styleview">
        <p>Total Detected: {attendanceList.length}</p>
        <p>Total Recognised: {list.length || 0}</p>
      </div>
      <div className="studentName1">
        <ol className="studentName2" type="1">
          {list.length > 0 &&
            list.map((item) => {
              return (
                <li key={item}>
                  {item}
                  <HighlightOffIcon
                    className="deleteButton"
                    type="button"
                    onClick={() => {
                      setTarget(item);
                      setShowModal(true);
                    }}
                  >
                    Remove
                  </HighlightOffIcon>

                  {/* <></> */}
                </li>
              );
            })}
          <div className="addStudent">
            <input
              list="students"
              type="text"
              id="student"
              placeholder="Add student"
              value={addStudent}
              onChange={(e) => {
                setAddStudent(e.target.value);
              }}
            ></input>
            <datalist id="students">
              {datalistforStudents.map((item) => {
                return <option value={item} />;
              })}
            </datalist>
            <button
              onClick={() => {
                if (addStudent.length === 0) return;
                setAddStudent("");
                setList([...list, addStudent]);
              }}
            >
              <AddCircleOutline />
            </button>
          </div>
        </ol>
      </div>

      <button className="style2" onClick={downloadFile}>
        <i class="fa fa-download"></i>
      </button>
    </div>
  );
}
