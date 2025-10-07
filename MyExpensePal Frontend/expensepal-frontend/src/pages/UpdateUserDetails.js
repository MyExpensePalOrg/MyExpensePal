import React, { useState } from 'react'
import '../styles/GetUserDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateUserDetails = ({onLogout}) => {
    const navigate = useNavigate();
    const location=useLocation();
    const userData = location.state?.user || {};
    const[userDetails, setUserDetails]=useState({
        email:userData.email || "",
        firstName: userData.firstName  || "",
        lastName: userData.lastName  || "",
        gender: userData.gender  || "",
        dateOfBirth:userData.dateOfBirth  || "",
        phone:userData.phone || "",
        oldPassword:"",
        newPassword:"",
        bio:userData.bio || "",
        userId:userData.userId || ""
    });
    const handleLogout=()=>{
        onLogout();
        navigate("/login");
    }
    const [changePassword, setChangePassword] = useState(false);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");

          const updatedDetails = { ...userDetails };
          if (!changePassword) {
              delete updatedDetails.oldPassword;
              delete updatedDetails.newPassword;
          }
          console.log("updated details: ",userDetails)          
          const response = await axios.put(`http://localhost:8080/auth/updateUser` ,updatedDetails,{
            headers: {Authorization: `Bearer ${token}`},
            'userId': userId
          });
          console.log(response);
          if(changePassword){
            //handleLogout();
            toast.success("Password changed successfully. Logging out...");
            setTimeout(() => {
                handleLogout();
            }, 2000);
          }else{
            toast.success("User details updated successfully!");
            navigate("/getuserdetails");
          }
          console.log("Updated:", response.data);
          console.log("Updated:", response.status);
         
        
        }catch(error){
            console.log(error);
          //console.error("Error updating User:", error.response.data);
          alert(error.response.data);
        }
      }
      
  return (
    <div className='udcontainer'>
        <form onSubmit={handleSubmit}>
            <div className='usergroup'>
                <div className='usergroup-section'>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' id='firstName' name='firstName' value={userDetails.firstName} onChange={(e)=>setUserDetails({...userDetails, firstName:e.target.value})} required/>
                </div>
                <div className='usergroup-section'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' id='lastName' name='lastName' value={userDetails.lastName} onChange={(e)=>setUserDetails({...userDetails, lastName:e.target.value})} required/>
                </div>
            </div>
            <div className='usergroup'>
                    <div className='usergroup-section'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})} required/>
                    </div>
                    <div className='usergroup-section'>
                        <label htmlFor='gender'>Gender</label>
                        <input type='text' id='gender' name='gender' value={userDetails.gender} onChange={(e)=>setUserDetails({...userDetails, gender:e.target.value})}/>
                    </div>
            </div>
            <div className='usergroup'>
                    <div className='usergroup-section'>
                        <label htmlFor='phone'>Phone</label>
                        <input type='tel' id='phone' name='phone' value={userDetails.phone} onChange={(e)=>setUserDetails({...userDetails, phone:e.target.value})}/>
                    </div>
                    <div className='usergroup-section'>
                        <label htmlFor='userId'>UserId</label>
                        <input type='UUID' id='userId' name='userId' value={userData.userId} readOnly/>
                    </div>
            </div>
            <div className='usergroup' style={{gap:"400px", overflow:"hidden"}}>
                                
                    <div className='usergroup-section' >
                        <label>Bio</label>
                        {/* <input className='bio-input'/> */}
                        <textarea className="bio-input" value={userDetails.bio} onChange={(e)=>setUserDetails({...userDetails, bio:e.target.value})}></textarea>
                    </div>
                    <div className='usergroup-section' >
                        <label htmlFor='dateOfBirth'>Date of Birth</label>
                        <input type='date' id='dateOfBirth' name='dateOfBirth' value={userDetails.dateOfBirth} onChange={(e)=>setUserDetails({...userDetails, dateOfBirth:e.target.value})}/>
                    </div>
            </div>
                
            
            <div className='userpassword'>
                <div className='usercheck'>
                    <input type='checkbox' id='changePassword' checked={changePassword} onChange={() => setChangePassword(!changePassword)} />
                    <label htmlFor='changePassword'>Change Password</label>    
                </div>
                {changePassword && (
                    <div className='usergr'>
                        <div className='usergroup-section'>
                            <label htmlFor='oldPassword'>Old Password</label>
                            <input type='password' id='oldPassword' name='oldPassword' value={userDetails.oldPassword} onChange={(e) => setUserDetails({...userDetails, oldPassword: e.target.value})} required />
                        </div>

                        <div className='usergroup-section'>
                            <label htmlFor='newPassword'>New Password</label>
                            <input type='password' id='newPassword' name='newPassword' value={userDetails.newPassword} onChange={(e) => setUserDetails({...userDetails, newPassword: e.target.value})} required />
                        </div>
                    </div>
                    )}
            </div>
            <div style={{padding:"12px"}}>
                <button type="submit" className="save-changes-btn">Save Changes</button>
            </div>
        </form>      
    </div>
  )
}

export default UpdateUserDetails
