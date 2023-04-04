import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import Redirect from "./shared/components/Navigation/Redirect";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} exact="true" />
        <Route path="/:userId/places" element={<UserPlaces />} exact="true" />
        <Route path="/places/new" element={<NewPlace />} exact="true" />
        <Route path="/places/:placeId" element={<UpdatePlace />} exact="true" />
        <Route path="*" element={<Auth />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} exact="true" />
        <Route path="/:userId/places" element={<UserPlaces />} exact="true" />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
           {routes}
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
