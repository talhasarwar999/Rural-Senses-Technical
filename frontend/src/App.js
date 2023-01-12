import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/headers/Navbar";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import UploadData from "./pages/UploadData";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        {localStorage.getItem("userInfo") ? <Header /> : null}
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/upload" element={<UploadData />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/create_user" element={<CreateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
