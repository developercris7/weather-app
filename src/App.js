import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const Home = React.lazy(() => import("./pages/Home"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="suspense">
                  <ClipLoader
                    color={"white"}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              }
            >
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense
              fallback={
                <div className="suspense">
                  <ClipLoader
                    color={"white"}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              }
            >
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <div className="suspense">
                  <ClipLoader
                    color={"white"}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
