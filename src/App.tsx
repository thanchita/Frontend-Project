import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ContentDetail from "./pages/ContentDetail";
import Login from "./pages/Login";
import { useAuth } from "./providers/AuthProvider";
import GuardedRoute from "./guard/GuardedRoute";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<ContentDetail />} />

        <Route
          element={
            <GuardedRoute
              isRouteAccessible={isLoggedIn}
              redirectRoute="/login"
            />
          }
        ></Route>

        <Route
          element={
            <GuardedRoute isRouteAccessible={!isLoggedIn} redirectRoute="/" />
          }
        >
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
