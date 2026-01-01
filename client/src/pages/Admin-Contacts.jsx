import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Styles/Admin.css";
import { toast } from "react-toastify";

export const AdminContacts = () => {

  const [contactData,setContactData]=useState([]);
  const { authorizationToken } = useAuth();
  const getContactsData = async () => {
    try {
      const response = await fetch("https://gig-swap-hsp-backend.vercel.app/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("contact data:", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //defining the function deleteContactById

  const deleteContactById=async(id)=>{
   
     try {
      
       const response =await fetch(`https://gig-swap-hsp-backend.vercel.app/api/admin/contacts/delete/${id}`,{
         method:"DELETE",
         headers:{
          Authorization:authorizationToken,
         }
       });
       if(response.ok){
           getContactsData();
           toast.success("deleted successfully");
       }else{
           toast.error("Not Deleted");
       }
     } catch (error) {
        console.log(error);
     }

  }

  useEffect(() => {
    getContactsData();
  }, []);

  return (<>
    <section className="admin-contacts-section">
      <h1>Booked Services</h1>

    <div className="container admin-users">
    {contactData.map((curContactData ,index)=>{
      const {username,email,message,address,time,date,_id,} =curContactData;
       return (
        <div key={index}>
         <p>{username}</p>
         <p>{email}</p>
         <p>{message}</p>
         <p>{date}</p>
         <p>{time}</p>
         <p>{address}</p>
      
        
         {/* <button className="btn" onClick={()=>deleteContactById(_id)}>delete</button> */}
        </div>
       )

    })}
    </div>
  </section>
  </>
  );
};
