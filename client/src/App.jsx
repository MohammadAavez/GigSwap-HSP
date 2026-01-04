import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { WokerDashboard } from "./pages/WorkerDashboard";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import { WorkerLayout } from "./components/layouts/Worker-Layout";
import { WorkerContacts } from "./pages/Worker-Contacts";
import Cleaner from "./pages/Details/Cleaner";
import Electrician from "./pages/Details/Electrician";
import Plumbing from "./pages/Details/Plumbing";
import Carpentry from "./pages/Details/Carpentry";
import Acrepair from "./pages/Details/Acrepair";
import PestControl from "./pages/Details/PestControl";
import { GoogleTranslate } from "./components/GoogleTranslate";


const App = () => {
  return (
    <>
     
      <div className="app-container">
        
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/worker" element={<WokerDashboard/>}/>
          <Route path="*" element={<Error />} />
          <Route path="/cleaner" element={<Cleaner />} />
          <Route path="/electrician" element={<Electrician />} />
          <Route path="/plumbing" element={<Plumbing />} />
          <Route path="/carpentry" element={<Carpentry />} />
          <Route path="/acrepair" element={<Acrepair />} />
          <Route path="/pestcontrol" element={<PestControl />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>

          <Route path="/worker" element={<WorkerLayout />}>
            <Route path="contacts" element={<WorkerContacts />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      </div>
    </>
  );
};

export default App;