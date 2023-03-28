import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Redirect from "./shared/components/Navigation/Redirect";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} exact="true" />
          <Route path="/:userId/places" element={<UserPlaces />} exact="true"  />
          <Route path="/users" element={<Users />} exact="true"  />
          <Route path="/places/new" element={<NewPlace />} exact="true" />
          <Route path="/places/:placeId" element={<UpdatePlace />} exact="true" />dddddd
          {/* <Route path="*" element={<Navigate to="/" />} replace/> */}
          <Route path="*" element={<Redirect />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
