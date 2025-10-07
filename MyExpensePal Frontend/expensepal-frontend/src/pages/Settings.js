import React, { useEffect, useState } from 'react';
import '../styles/Settings.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [income, setIncome] = useState('');
  const [emailNotif, setEmailNotif] = useState(false);
  const [password, setPassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate=useNavigate();
  const userId=localStorage.getItem("userId");
  const token = localStorage.getItem("token"); 
  

  useEffect(()=>{
    const handleGetIncome =  async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/getSettings`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'UserId': userId
        }
        });
        setIncome(response.data.income);
        setEmailNotif(response.data.receiveMonthlyExpenseReport);
        console.log(response.data.income);
        
      } catch (error) {
        console.error("Error fetching settings:", error);
        console.error("Data:", error.response?.data);      
      }
    };
    handleGetIncome();
  },[])

  const handleUpdateIncome = async (updatedEmailNotif = emailNotif) =>{
    try {
      const response = await axios.put(`http://localhost:8080/auth/updateSettings`,{
        income: income,
        receiveMonthlyExpenseReport: updatedEmailNotif
      },{
        headers: {
          Authorization: `Bearer ${token}`,
          'UserId': userId
      }
      });
      setIncome(response.data.income.toString());
      console.log(response.data.income);
      setEmailNotif(response.data.receiveMonthlyExpenseReport);
      toast.success('Settings updated successfully!');
      
    } catch (error) {
      console.error("Error fetching settings:", error);
      console.error("Data:", error.response?.data);      
    }

  };

  const handleDeleteAccount = async () => {
    const response = await axios.delete(`http://localhost:8080/auth/deleteAccount`,{
      headers:{
        Authorization: `Bearer ${token}`,
        password:password
      }
    });
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userId")
    console.log('Deleting account with password:', password);
    setShowDeleteModal(false);
  };

  const handleResetAccount = async () => {
    const response = await axios.delete(`http://localhost:8080/auth/resetAccount`,{
      headers:{
        Authorization: `Bearer ${token}`,
        password:password
      }
    });
    
    console.log('Resetting account with password:', response);
    setShowResetModal(false);
  };

  return (
    <div className="settings-container">
      <div className="setting-section">
        <label>Set Monthly Income:</label>
        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
        <button style={{cursor:"pointer"}} onClick={()=>handleUpdateIncome()}>Update Income</button>
      </div>

      <div className="setting-section">
        <label>
          <input type="checkbox" checked={emailNotif} onChange={(e) =>{const newValue=e.target.checked; setEmailNotif(newValue);
            handleUpdateIncome(newValue);
          }} />
          Receive monthly email reports
        </label>
      </div>

      <hr />

      <div className="danger-zone">
        <h3>Danger Zone</h3>

        <button className="danger-button" onClick={() => setShowResetModal(true)}>
          Reset My Account
        </button>

        <button className="danger-button" onClick={() => setShowDeleteModal(true)}>
          Delete My Account
        </button>
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Confirm Reset</h4>
            <p>This will delete all your expenses.</p>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleResetAccount}>Confirm Reset</button>
            <button onClick={() => setShowResetModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="user-modal-content">
            <h4>Confirm Delete</h4>
            <p>This will permanently delete your account.</p>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleDeleteAccount}>Confirm Delete</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
