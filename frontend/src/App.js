import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Redirect from "./shared/components/Navigation/Redirect";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} exact />
          <Route path="/:userId/places" element={<UserPlaces />} exact />
          <Route path="/users" element={<Users />} exact />
          <Route path="/places/new" element={<NewPlace />} exact />
          {/* <Route path="*" element={<Navigate to="/" />} replace/> */}
          <Route path="*" element={<Redirect />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
