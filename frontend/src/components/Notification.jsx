// import React from "react";
import { /*ToastContainer,*/ toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyError = (errorText) => {
  toast.error(errorText, {
    position: "top-right",
    autoClose: 5000,
  });
};

const notifySuccess = (successText) => {
  toast.success(successText, {
    position: "top-right",
    autoClose: 1000,
  });
};



export { notifyError, notifySuccess };