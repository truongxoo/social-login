import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/Home";
import LoginPage from "./components/LoginPage";
import "./config/i18n";
import Authenticate from "./components/LoginPage/components/Authenticate";
import ProtectedRoute from "./features/Home/component/ProtectedRoute";
import UnProtectedRoute from "./features/Home/component/UnProtectedRoute";

function App() {

  return (
    <Fragment>
      <Routes>
        <Route element={<UnProtectedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
