import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import NotificationSettings from "./pages/Notification";
import CustomerVoices from "./pages/Contact";
import Review from "./pages/Review";
import "react-toastify/dist/ReactToastify.css";
import PForm from "./components/PForm";
import AddProductForm from "./pages/AddProductForm.js";
import QRCodeVerification from "./pages/QR";
import PrivateRoute from "./components/PrivateRoute.js";
import UserD from "./Dashboards/UserD";
import AuthRoute from "./components/AuthRoute";
import AdminD from "./Dashboards/AdminD";
import Settings from "./pages/Settings";
import AccountSettings from "./settings/AccountSettings";
import NotFoundPage from "./pages/PNF";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/add-products" element={<PForm />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/scanqr" element={<QRCodeVerification />} />
          <Route path="/user/add-products" element={<PForm />} />
          <Route path="/user/settings" element={<Settings></Settings>} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route
            path="/user/notifications"
            element={<NotificationSettings />}
          />
        </Route>
        <Route path="/user/dashboard" element={<UserD></UserD>} />
        <Route element={<AuthRoute />}>
          <Route path="/admin/dashboard" element={<AdminD></AdminD>} />
        </Route>
        <Route path="/contact" element={<CustomerVoices />} />
        <Route path="/user/review" element={<Review />} />
        <Route path="*" element={<NotFoundPage></NotFoundPage>} />
      </Routes>
    </>
  );
};

export default App;
