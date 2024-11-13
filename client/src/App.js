import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Register from "./pages/register/Register";
import Summary from "./pages/randomizer/Summary"
import Login from "./pages/login/Login"
import Logout from "./pages/login/Logout"
import NavBar from "./components/NavBar"
import WorldSelect from "./pages/worlds/WorldSelect"
import WorldView from "./pages/worlds/WorldView"
import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/error/404"
import Test from "./pages/Test"
import { isUserLoggedIn } from "./service/index.service";
import { useUser } from './lib/customHooks';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const backendRoot = "http://localhost:3000"

function App() {
  const [data, setData] = React.useState(null);
  const { user, authenticated } = useUser();
  const isLoggedIn = user !== null;

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authorized" element={isLoggedIn && <Test />} />
          <Route path="/worlds" element={isLoggedIn && <WorldSelect />} />
          <Route path="/worlds/:worldId" element={isLoggedIn && <WorldView />} />
          <Route path="/logout" element={isLoggedIn && <Logout />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
