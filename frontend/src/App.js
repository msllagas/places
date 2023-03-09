import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} exact/>
        <Route path="/users" element={<Users />} exact/>
        <Route path="/places/new" element={<NewPlace />} exact/>
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
