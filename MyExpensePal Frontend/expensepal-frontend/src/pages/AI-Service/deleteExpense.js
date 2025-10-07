import React from "react";
import "./AiService.css";

const DeleteExpenseTable = ({ existingData, handleView, handleEdit, handleDelete }) => {
    if (existingData === "Failed to get matching data" || existingData === null) {
        return (
        <div className="form-group">
        <label htmlFor="bodyDisplay">Body:</label>
        <p id="bodyDisplay" className="formDisplayText">
          No matching data found.
        </p>
        </div>
      )}

  return (
    <table>
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Location</th>
          <th>Transaction Type</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {existingData?.map((expense) => (
          <tr key={expense.expenseId}>
            <td>{expense.expenseName}</td>
            <td>${expense.expense}</td>
            <td>{expense.expenseType}</td>
            <td>{expense.location}</td>
            <td>{expense.transactionType}</td>
            <td>{expense.date}</td>
            <td>{expense.time}</td>
            <td>
              <button
                className="delete-btn"
                onClick={() => handleDelete(expense.expenseId)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeleteExpenseTable;
