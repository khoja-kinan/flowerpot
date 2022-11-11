// scroll bar
import "simplebar/src/simplebar.css";

import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//
import App from "./App";

// ----------------------------------------------------------------------

const IndexDashboard = () => {
  return (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

export default IndexDashboard;
