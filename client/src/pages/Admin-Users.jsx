import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Styles/Admin.css";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("https://gig-swap-hsp-backend.vercel.app/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Users Details</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => {
              return (
                <tr key={index}>
                  <td data-label="Name">{curUser.username}</td>
                  <td data-label="Email">{curUser.email}</td>
                  <td data-label="Phone">{curUser.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};