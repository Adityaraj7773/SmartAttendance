import React, { useState } from "react";
let defaultValue = {
  passoutYear: "",
  semester: "",
  branch: "",
  section: "",
  loading: false,
  loadingText: "",
  setPassoutYear: () => {},
  setSemester: () => {},
  setBranch: () => {},
  setSection: () => {},
  setLoading: () => {},
  setLoadingText: () => {},
};
const StateContext = React.createContext(defaultValue);

let StateProvider = (props) => {
  const [passoutYear, setPassoutYear] = useState();
  const [semester, setSemester] = useState();
  const [branch, setBranch] = useState();
  const [section, setSection] = useState();
  const [loading, setLoading] = useState();
  const [loadingText, setLoadingText] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <StateContext.Provider
      value={{
        token,
        setToken,
        loadingText,
        setLoadingText,
        loading,
        setLoading,
        passoutYear,
        semester,
        branch,
        section,
        setPassoutYear,
        setSemester,
        setBranch,
        setSection,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
export default StateProvider;

export { StateContext };
