import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/UpdateExpense.css';

const UpdateExpense = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const expenseData = location.state?.expense || {};
  //console.log(expenseData.userId);
  const [expense, setExpense]= useState({
    //userId: expenseData.userId,
    expenseId: expenseData.expenseId,
    expenseName: expenseData.expenseName || "",
    expense: expenseData.expense || "",
    expenseType: expenseData.expenseType || "",
    location: expenseData.location || "",
    transactionType: expenseData.transactionType || "",
    date: expenseData.date || "",
    time: expenseData.time || ""
  })
  // console.log(expense);
  // console.log(expense.expense);
  const handleEdit=(e)=>{
    setExpense({...expense, expenseName:e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!expense.expenseName || !expense.expense || !expense.expenseType ||!expense.location || !expense.transactionType ||!expense.date ||!expense.time){
      alert("Please fill All fields");
      return;
    }
    try{
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8080/expense/updateExpense/${expense.expenseId}`,expense,{
        headers: {Authorization: `Bearer ${token}`}
      });
      console.log("Updated:", response.data);
      navigate("/getExpense");
    }catch(error){
      console.error("Error updationg expense:", error);
      alert("Failed to updae expense");
    }
  }

  return (
    <section id='sec222'>
      <div className='updateExpenseContainer'>
      <h2>Update Expense</h2>
      <form className='updateExpenseForm' onSubmit={handleSubmit}>
      <div className="formRow">
        <label>Expense Name</label>
        <input type='text' value={expense.expenseName} onChange={handleEdit} />
      </div>
      <div className="formRow">
        <label>Expense Amount</label>
        <input type='number' value={expense.expense} onChange={(e)=>setExpense({...expense, expense:e.target.value})} />
      </div>
      <div className="formRow">
        <label>Expense Type</label>
        <select id="expenseType" value={expense.expenseType} onChange={(e)=>setExpense({...expense, expenseType:e.target.value})} >
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="FOOD">Food</option>
            <option value="HOME">Home</option>
            <option value="LIFE">Life</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="UTILITIES">Utilities</option>
        </select>
        {/* <input type='text' value={editExpense.expenseType} /> */}
      </div>
      <div className="formRow">
        <label>Location</label>
        <input type='text' value={expense.location} onChange={(e)=>setExpense({...expense, location:e.target.value})} />
      </div>
      <div className="formRow">
        <label>Transaction Type</label>
        <select id='transactionType' value={expense.transactionType} onChange={(e)=>setExpense({...expense, transactionType:e.target.value})}>
          <option value="DEBIT">Cash</option>
          <option value="CREDIT">Card</option>
        </select>
        {/* <input type='text' value={editExpense.transactionType} /> */}
      </div>
      <div className="formRow">
        <label>Date</label>
        <input type='date' value={expense.date} onChange={(e)=>setExpense({...expense, date:e.target.value})} />
      </div>
      <div className="formRow">
        <label>Time</label>
        <input type='time' value={expense.time} onChange={(e)=>setExpense({...expense, time:e.target.value})} />
      </div>
        <button type='submit'>Save Changes</button>
      </form>
      
    </div>
    </section>
  )
}

export default UpdateExpense
