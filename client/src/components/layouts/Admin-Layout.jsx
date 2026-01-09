import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import "./Admin-Layout.css"; // 👈 Ye line add karein

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header className="admin-header">
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/users">
                  <FaHome /> Users Details
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};