import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AddExpense.module.css';

const AddExpense = () => {
  const id = localStorage.getItem("userId");
  const [data, setData] = useState({
    userId: id,
    expenseName: "",
    expense: "",
    expenseType: "",
    location: "",
    transactionType: "",
    date: "",
    time: ""
  });

  const { userId, expenseName, expense, expenseType, location, transactionType, date, time } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.post("http://localhost:8080/expense/saveExpense", data, {
      headers: {
        Authorization: `Bearer ${token}`
        // "Content-Type": "application/json"
      }
    }).then(response => {
      alert("Expense Added Successfully");
      setData({
        userId: id,expenseName: "",expense: "", expenseType: "",location: "",transactionType: "",date: "", time: ""
      });
    })
    .catch(error => {
      console.error("Error submitting data", error);
    });
  };

  return (
    <div className={styles.addexpense22}>
    <div className={styles.expensehtmlForm}>
      <h2>New Expense</h2>
      <hr />
      <form onSubmit={submitHandler}>
        {/* <div className={styles.htmlFormGroup}>
          <label htmlFor="userId">UserId</label>
          <input type="text" id="userId" name='userId' value={id} onChange={changeHandler} required />
        </div> */}
        <div className={styles.htmlFormGroup}>
          <label htmlFor="expenseName">Expense Name</label>
          <input type="text" id="expenseName" name='expenseName' value={expenseName} onChange={changeHandler} required />
        </div>
        <div className={styles.htmlFormGroup}>
          <label htmlFor="expense">Expense Amount</label>
          <input type="number" id="expense" name='expense' value={expense} onChange={changeHandler} required />
        </div>
        <div className={styles.htmlFormGroup}>
          <label htmlFor="expenseType">Expense Type</label>
          <select id="expenseType" name='expenseType' value={expenseType} onChange={changeHandler}>
            <option value="" disabled>Select Type</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="FOOD">Food</option>
            <option value="HOME">Home</option>
            <option value="LIFE">Life</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="UTILITIES">Utilities</option>
            <option value="UNCATEGORIZED">UNCATEGORIZED</option>
            {/* <option value="TRAVEL">Travel</option>UNCATEGORIZED */}
          </select>
        </div>
        <div className={styles.htmlFormGroup}>
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name='location' value={location} onChange={changeHandler} required />
        </div>
        <div className={styles.htmlFormGroup}>
          <label htmlFor="transactionType">Transaction Type</label>
          <select id="transactionType" name='transactionType' value={transactionType} onChange={changeHandler}>
            <option value="" disabled>Select Payment Type</option>
            <option value="DEBIT">Cash</option>
            <option value="CREDIT">Card</option>
          </select>
        </div>
        <div className={styles.htmlFormGroup}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name='date' value={date} onChange={changeHandler} />
        </div>
        <div className={styles.htmlFormGroup}>
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name='time' value={time} onChange={changeHandler} />
        </div>
        <div className={styles.buttonGroup}>
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
      
    </div>

    
  );
};

export default AddExpense;
