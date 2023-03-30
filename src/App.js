import React, { useContext } from "react";
// import UploadButton from "./UploadButton";
// import Button from '@mui/material/Button';
import "./Components/SimpleContainer";
import Header from "./Components/Header";
// import SimpleContainer from "./SimpleContainer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import { Navigate, Route, Routes } from "react-router-dom";
import UploadAttendance from "./pages/UploadAttendance";
import SelectClass from "./pages/SelectClass";
import SelectOption from "./pages/SelectOption";
import StudentData from "./pages/StudentData";
import StudentDetail from "./pages/StudentDetail";
import { StateContext } from "./store/context";
import Loading from "./Components/Loading";
import DeveloperPage from "./pages/DeveloperPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { loading, loadingText, token } = useContext(StateContext);
  if (!token) {
    return (
      <div className="app">
        {loading && <Loading text={loadingText}></Loading>}
        <Header />
        <Routes>
          <Route path="/login" exact element={<SignIn />} />
          <Route path="/register" exact element={<SignUp />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/developerPage" exact element={<DeveloperPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }
  return (
    <div className="app">
      {loading && <Loading text={loadingText}></Loading>}
      <Header />
      <Routes>
        <Route path="/contact" exact element={<Contact />} />
        <Route
          path="/:year/:sem/:branch/:section/upload"
          exact
          element={<UploadAttendance />}
        />
        <Route
          path="/:year/:sem/:branch/:section/option"
          exact
          element={<SelectOption />}
        />
        <Route path="/developerPage" exact element={<DeveloperPage />} />
        <Route
          path="/:year/:sem/:branch/:section/studentDetail"
          exact
          element={<StudentDetail />}
        />
        <Route
          path="/:year/:sem/:branch/:section/studentData"
          exact
          element={<StudentData />}
        />
        <Route path="/" element={<SelectClass />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
