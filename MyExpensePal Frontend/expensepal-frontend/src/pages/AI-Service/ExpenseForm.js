// src/ExpenseForm.js
import React, { useState } from "react";
import "./AiService.css"

const ExpenseForm = ({ modalData, handleApprove }) => {
  // Initialize the form values from modalData
  const [formValues, setFormValues] = useState({
    expenseId: modalData?.data?.expenseId || "",
    expenseName: modalData?.data?.expenseName || "",
    expense: modalData?.data?.expense || "",
    expenseType: modalData?.data?.expenseType || "",
    location: modalData?.data?.location || "",
    date: modalData?.data?.date || "",
    time: modalData?.data?.time || "",
    transactionType: modalData?.data?.transactionType || "",
  });
  console.log("Add Expense");
  console.log(formValues.expenseName);

  // Handle input field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle approval (save the changes)
  const handleApproveClick = () => {
    // Send the updated form values to the parent
    console.log(formValues)
    handleApprove(formValues);
  };

  return (
    <div>
      <div>
        <label>Expense ID (Optional):</label>
        <input
          type="text"
          name="expenseId"
          value={formValues.expenseId}
          onChange={handleFormChange}
          className="formInputStyles" // Apply styles here
        />
      </div>

      <div>
        <label>Expense Name:</label>
        <input
          type="text"
          name="expenseName"
          value={formValues.expenseName}
          onChange={handleFormChange}
          className="formInputStyles" // Apply styles here
        />
      </div>

      <div>
        <label>Expense Amount:</label>
        <input
          type="number"
          name="expense"
          value={formValues.expense}
          onChange={handleFormChange}
          className="formInputStyles" 
        />
      </div>

      <div>
        <label>Expense Type:</label>
        <input
          type="text"
          name="expenseType"
          value={formValues.expenseType}
          onChange={handleFormChange}
          className="formInputStyles"
        />
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formValues.location}
          onChange={handleFormChange}
          className="formInputStyles" 
        />
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleFormChange}
          className="formInputStyles"
        />
      </div>

      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formValues.time}
          onChange={handleFormChange}
          className="formInputStyles"
        />
      </div>

      <div>
        <label>Transaction Type:</label>
        <input
          type="text"
          name="transactionType"
          value={formValues.transactionType}
          onChange={handleFormChange}
          className="formInputStyles"
        />
      </div>

      <div>
        <button onClick={handleApproveClick}>Approve</button>
      </div>
    </div>
  );
};

export default ExpenseForm;
