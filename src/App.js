import React from "react";
import AppRoute from "./AppRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer autoClose={5000} />
      <AppRoute />
    </>
  );
}

export default App;
