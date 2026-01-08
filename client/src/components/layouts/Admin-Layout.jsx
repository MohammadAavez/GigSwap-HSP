import { NavLink,Outlet } from "react-router-dom";
import { FaUser,FaHome,FaRegListAlt } from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { Navigate } from "react-router-dom";



export const AdminLayout=()=>{
 const { user,isLoading } = useAuth();
 console.log("admin layout",user);

 if(isLoading){
    
    return <h1>Loading ...</h1>
 }

 if(!user.isAdmin){
    return <Navigate to="/"/>;
 }
  return (<>
     <header>
      <div className="container">
        <nav>
          <ul>
            <li><NavLink to="/admin/contacts" >
             <FaMessage/> Bookings
            </NavLink> </li>
            <li><NavLink to="/admin/users" ><FaHome/>Users Details</NavLink> </li>
          </ul>
        </nav>
      </div>
     </header>
     <Outlet/>
  </>)
};