import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const HomePage = lazy(() => import("./Pages/HomePage"));
  const URLRedirect = lazy(() => import("./Pages/urlRedirect"));

  return (
    <>
      <Router>
        <Suspense Suspence={<h1>Loading..</h1>}>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/:shortURLlink" element={<URLRedirect />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
