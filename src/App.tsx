import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ContentDetail from "./pages/ContentDetail";
import Login from "./pages/Login";
import { useAuth } from "./providers/AuthProvider";
import GuardedRoute from "./guard/GuardedRoute";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />

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
