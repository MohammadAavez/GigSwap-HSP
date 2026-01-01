import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const WorkerLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("worker layout", user);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // ❌ Agar worker nahi hai
  if (!user?.isWorker) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/worker/contacts">
                  <FaMessage /> Bookings
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
