import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../store/context";
import { AlertContext } from "./../store/AlertContext";
const SelectPassoutYear = [{ value: "2024", label: "2024" }];
const SelectSemester = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
];

const SelectBranch = [
  { value: "CE", label: "CIVIL ENGINEERING" },
  { value: "CS", label: "CS" },
  { value: "EI", label: "EI" },
  { value: "ETC", label: "ETC" },
  { value: "IT", label: "IT" },
  { value: "ME", label: "MECHANICAL ENGINEERING" },
];
let SelectSection = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
];

const SelectClass = () => {
  const {
    passoutYear,
    semester,
    branch,
    section,
    setPassoutYear,
    setSemester,
    setBranch,
    setSection,
  } = useContext(StateContext);
  const router = useNavigate();
  const handleYearChange = (selectedOption1) => {
    setPassoutYear(selectedOption1);
  };
  const handleSemesterChange = (selectedOption1) => {
    setSemester(selectedOption1);
  };
  const handleBranchChange = (selectedOption1) => {
    setBranch(selectedOption1);
  };
  const handleSectionChange = (selectedOption1) => {
    setSection(selectedOption1);
  };
  console.log(branch);
  const { Message } = useContext(AlertContext);
  if (
    branch?.value === "CE" ||
    branch?.value === "ME" ||
    branch?.value === "EI"
  ) {
    SelectSection = [];
  } else {
    SelectSection = [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
    ];
  }
  const submitHandler = () => {
    console.log(branch, semester, passoutYear, section);
    if (!branch || !semester || !passoutYear) {
      Message().warning("Please select all the fields", false);
      // alert("Please select all the fields");
      return;
    }
    if (
      branch?.value.trim().length !== 0 &&
      semester?.value.trim().length !== 0 &&
      passoutYear?.value.trim().length !== 0
    ) {
      if (
        branch?.value === "CE" ||
        branch?.value === "ME" ||
        branch?.value === "EI"
      ) {
        setSection({ value: "A", label: "A" });
      }
      router(
        `/${passoutYear?.value}/${semester?.value}/${branch?.value}/${section?.value}/option`
      );
    } else {
      Message().warning("Please select all the fields", false);
      // alert("Please select all the fields");
    }
  };
  return (
    <div className="container">
      <div className="subContainer">
        <p>Select Passout Year</p>
        <div className="row">
          <Select
            className="select"
            value={passoutYear}
            onChange={handleYearChange}
            options={SelectPassoutYear}
          />
        </div>

        <p>Select Semester</p>
        <div className="row">
          <Select
            className="select"
            value={semester}
            onChange={handleSemesterChange}
            options={SelectSemester}
          />
        </div>

        <p>Select Branch</p>
        <div className="row">
          <Select
            className="select"
            value={branch}
            onChange={handleBranchChange}
            options={SelectBranch}
          />
        </div>
        {SelectSection.length > 0 && (
          <>
            {" "}
            <p>Select Section</p>
            <div className="row">
              <Select
                className="select"
                value={section}
                onChange={handleSectionChange}
                options={SelectSection}
              />
            </div>
          </>
        )}
      </div>
      <button className="buttonss" onClick={submitHandler}>
        <p className="text">Continue</p>
        <SendIcon className="arrow" />
      </button>
    </div>
  );
};

export default SelectClass;
