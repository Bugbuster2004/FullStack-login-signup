// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Signup from "./Signup";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import "./App.css";
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/register" element={<Signup />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/dashboard" element={<Dashboard />}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import "./App.css";
import { AuthProvider, useAuth } from "./AuthComp"; // Adjust the path accordingly

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const ProtectedRoute = () => {
  console.log("inside protected route");
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  console.log("after use auth");

  if (!isAuthenticated) {
    console.log("user not authenticated");
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  } else {
    console.log("authetication success return to dashboard");
    return <Dashboard />;
  }
};

export default App;
