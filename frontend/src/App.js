//React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import PublicStatics from "./pages/PublicStats";
import ReviewStatics from "./pages/ReviewStats";
import UploadData from "./pages/UploadData";
//Protected Routes
import {
  ProtectedOfficialRoute,
  ProtectedRoute,
  ProtectedSocialRoute,
} from "./ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
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
