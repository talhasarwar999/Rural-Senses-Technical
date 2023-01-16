import { useState } from "react";
//React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Header from "./components/headers/Navbar";
import GetCookie from "./hooks/getCookie";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import PublicStatics from "./pages/PublicStatics";
import ReviewStatics from "./pages/ReviewStatics";
import UploadData from "./pages/UploadData";
//Protected Routes
import {
  ProtectedOfficialRoute,
  ProtectedRoute,
  ProtectedSocialRoute,
} from "./ProtectedRoutes";

function App() {
  //State
  const [admin] = useState(GetCookie("user") === '"Admin"' ? true : null);
  const [social] = useState(
    GetCookie("user") === '"CommunitySocialWorker"' ? true : null
  );
  const [official] = useState(
    GetCookie("user") === '"PublicOfficial"' ? true : null
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
          <Route exact path="/statistics" element={<ReviewStatics />} />
          <Route exact path="/message" element={<Messages />} />
        </Route>

        {/* Public Official Protected Routes */}

        <Route exact path="/" element={<ProtectedOfficialRoute />}>
          <Route exact path="/p-statistics" element={<PublicStatics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
