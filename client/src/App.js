import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toast CSS

import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/home/home";
import Footer from "./components/Footer/Footer";
import SiteDetails from "./pages/siteDetails/SiteDetails";
import Features from "./pages/features/Features";
import Contact from "./pages/contact/Contact";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppWrapper = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return null; // Optional: show a spinner/loader

  const hideNavbar = ["/login", "/register"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <ScrollToTop />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<Home />} />
        <Route
          path="/features"
          element={user ? <Features /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/contact"
          element={user ? <Contact /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/sites/:siteId"
          element={user ? <SiteDetails /> : <Navigate to="/login" replace />}
          
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWrapper />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
