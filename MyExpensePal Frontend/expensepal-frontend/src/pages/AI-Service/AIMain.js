import React, { useState } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import UpdateExpenseTable from "./UpdateExpenseTable";
import DeleteExpenseTable from "./deleteExpense"; 

import "./AiService.css"; 

const AIMain = () => {
  const [command, setCommand] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCommand(e.target.value);
  };

  const handleView = (e) =>{}
  const handleEdit = async (e) =>{
    const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8080/expense/updateExpense/${expense.expenseId}`,expense,{
        headers: {Authorization: `Bearer ${token}`}
      });
      console.log("Updated:", response.data);
  }
  const handleDelete = (e) =>{}


  const handleFetchData = async () => {
    if (!command) return;
    setLoading(true);
    const userId= localStorage.getItem("userId")
    try {
      const response = await axios.post(`http://localhost:8087/input_query`, { "query": command, "timestamp": "" }, {
        headers: {
          "userId": userId
        }
      });
      console.log("Response: ",response)
      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (status) => {
    console.log("Affer sending Data:", status);
    const newDetails = {...status};
    if(!status.expenseType)
    {
      delete newDetails.expenseType;
    }
    if(!status.transactionType)
      {
        delete newDetails.transactionType;
      }
    const token = localStorage.getItem("token")
    if (!modalData) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/expense/saveExpense", 
          newDetails,{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }

          }
      );
      console.log("Form submitted:", response);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsModalOpen(false);
      setLoading(false);
    }
  };
  console.log("shgad: ",modalData);

  return (
    <div className="app-container">
      <h2>Enter Command</h2>
      <input
        type="text"
        placeholder="Enter Command"
        value={command}
        onChange={handleInputChange}
        className="input-field"
      />
      <button className="buttonStyles" onClick={handleFetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {isModalOpen && (
        <div className="modalBackdropStyles" style={{color:"black"}}>
          <div className="modalStyles">
            <h3>Form for Command: {modalData?.title}</h3>
            <div className="form-group">
                  <label htmlFor="intentDisplay">Intent:</label>
                  <p id="intentDisplay" className="formDisplayText">
                    {modalData?.intent}
                  </p>
                </div>

            {modalData?.intent === "OutOfContext" || modalData?.intent === "generalQuery" ? (
              <>
                <div className="form-group">
                  <label htmlFor="bodyDisplay">Body:</label>
                  <p id="bodyDisplay" className="formDisplayText">
                    {modalData?.data}
                  </p>
                </div>
              </>
            ) : modalData?.intent === "addExpense" ? (
              <>
                <h1>Add Expense Form</h1>
                <ExpenseForm modalData={modalData} handleApprove={handleFormSubmit} />
              </>
            ) : modalData?.intent === "updateExpense" ? (
              <>
              <UpdateExpenseTable
                existingData={modalData.existing_data}
                handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
              </>
            ) : modalData?.intent === "deleteExpense" ?(
              <>
              <DeleteExpenseTable
              existingData={modalData.existing_data}
              handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
              </>
            ):null}
            

            <div className="form-button-group">
              <button
                className="form-button approve-btn"
                onClick={() => handleFormSubmit("approve")}
              >
                ApproveMain
              </button>
              <button
                className="form-button reject-btn"
                onClick={() => handleFormSubmit("reject")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMain;
