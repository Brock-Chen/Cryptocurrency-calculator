import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import DataComponent from "./components/data-component";
import PricesComponent from "./components/prices-component";
import AuthService from "./services/auth.service";

function App() {
  // 設置當前使用者
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  // 設置導覽列當前頁面顏色
  let [colorHome, setColorHome] = useState("white");
  let [colorPrice, setColorPrice] = useState("white");
  let [colorProfile, setColorProfile] = useState("white");
  let [colorData, setColorData] = useState("white");
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                colorHome={colorHome}
                colorPrice={colorPrice}
                colorProfile={colorProfile}
                colorData={colorData}
              />
            }
          >
            <Route
              index
              element={
                <HomeComponent
                  setColorHome={setColorHome}
                  setColorPrice={setColorPrice}
                  setColorProfile={setColorProfile}
                  setColorData={setColorData}
                />
              }
            ></Route>
            <Route path="register" element={<RegisterComponent />}></Route>
            <Route
              path="login"
              element={
                <LoginComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="prices"
              element={
                <PricesComponent
                  setColorHome={setColorHome}
                  setColorPrice={setColorPrice}
                  setColorProfile={setColorProfile}
                  setColorData={setColorData}
                />
              }
            ></Route>
            <Route
              path="profile"
              element={
                <ProfileComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setColorHome={setColorHome}
                  setColorPrice={setColorPrice}
                  setColorProfile={setColorProfile}
                  setColorData={setColorData}
                />
              }
            ></Route>
            <Route
              path="data"
              element={
                <DataComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setColorHome={setColorHome}
                  setColorPrice={setColorPrice}
                  setColorProfile={setColorProfile}
                  setColorData={setColorData}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
