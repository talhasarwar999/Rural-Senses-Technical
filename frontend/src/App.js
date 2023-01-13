import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/headers/Navbar";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import ReviewStatics from "./pages/ReviewStatics";
import UploadData from "./pages/UploadData";
import {
  ProtectedOfficialRoute,
  ProtectedRoute,
  ProtectedSocialRoute,
} from "./ProtectedRoutes";

function App() {
  const [admin] = useState(
    localStorage.getItem("user") === '"Admin"' ? true : null
  );
  const [social] = useState(
    localStorage.getItem("user") === '"CommunitySocialWorker"' ? true : null
  );
  const [official] = useState(
    localStorage.getItem("user") === '"PublicOfficial"' ? true : null
  );

  return (
    <BrowserRouter>
      {admin || social || official ? <Header /> : null}

      <Routes>
        <Route exact path="/" element={<Login />} />

        {/* Admin Protected Routes */}

        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/create_user" element={<CreateUser />} />
        </Route>

        {/* Community Social Worker Protected Routes */}

        <Route exact path="/" element={<ProtectedSocialRoute />}>
          <Route exact path="/upload" element={<UploadData />} />
          <Route exact path="/statics" element={<ReviewStatics />} />
          <Route exact path="/message" element={<Messages />} />
        </Route>

        {/* Public Official Protected Routes */}

        <Route exact path="/" element={<ProtectedOfficialRoute />}>
          <Route exact path="/statics" element={<ReviewStatics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
