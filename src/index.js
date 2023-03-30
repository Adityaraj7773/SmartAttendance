import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import StateProvider from "./store/context";
import { IKContext } from "imagekitio-react";
import Footer from "./Components/Footer";
import AlertContextProvider from "./store/AlertContext";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <IKContext
      publicKey="public_rGiteXoLDgCkdlpfzFc3gLwI2RI="
      urlEndpoint="https://ik.imagekit.io/zgwytnovq"
      authenticationEndpoint={`${process.env.REACT_APP_SERVER_URL}api/auth/imagekit`}
    >
      <StateProvider>
        <React.StrictMode>
          <AlertContextProvider>
            <App />
          </AlertContextProvider>
          <Footer />
        </React.StrictMode>
      </StateProvider>
    </IKContext>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// ServiceWorkerRegistration.unregister();
// ServiceWorker.register();
// register();
serviceWorkerRegistration.register();
