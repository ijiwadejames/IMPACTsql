/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Missing from "./pages/Missing";
import Profile from "./pages/Profile";
import Message from "./pages/Message";
import Connection from "./pages/Connection";
import PersonalProfile from "./pages/PersonalProfile";
import DMBox from "./pages/DMBox";
import Read from "./pages/Read";
import About from "./pages/About";
import ChatBox from "./pages/ChatBox";
import VerifyUser from "./pages/VerifyUser";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import AboutMe from "./pages/AboutMe";
import Suggestions from "./pages/Suggestions";
import Conversation from "./pages/Conversation";
import FrontPage from "./pages/FrontPage";

const App = () => {
  return (
    <>
      <Router>
        <div className="container-fluid p-0 m-0">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<FrontPage />} />
            <Route path="/read/:mid" element={<Read />} />
            <Route path="/inbox" element={<Message />} />
            <Route path="/reg-success" element={<RegistrationSuccess />} />
            <Route path="/my-profile/:pid" element={<AboutMe />} />
            <Route path="/verify-user/:key" element={<VerifyUser />} />
            <Route path="/chatBox/:pid" element={<ChatBox />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<Connection />} />
            <Route path="/private/:pid" element={<PersonalProfile />} />
            <Route path="/dmbox" element={<DMBox />} />
            <Route path="*" element={<Missing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/suggestions/:role" element={<Suggestions />} />
            <Route path="/discussion/:pstId" element={<Conversation />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </>
  );
};

export default App;
