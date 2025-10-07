import React, { useEffect, useState } from 'react'
import '../styles/Dashboard.css';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import{Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement} from 'chart.js';

// Register Chart.js components
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // console.log(expenses);
  const [topCategories, setTopCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [tenLatestTransactions, setTenLatestExpense]= useState([]);
  
  
  useEffect(() => {
    const userId = localStorage.getItem("userId"); 
    const token = localStorage.getItem("token");
    const fetchTenLatestExpenses = async () =>{
      try{
        const response = await axios.get('http://localhost:8080/expense/tenLatestTransactions',{
          headers: {
            Authorization: `Bearer ${token}`,
            'userId':userId
          }

        });
        setTenLatestExpense(response.data);
        
      }catch(error){
        console.error("Error Fetching Expenses: ", error);
      }
    };
    fetchTenLatestExpenses();

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/expense/userId`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'UserId': userId
          }
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
    const fetchTopThreeCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/expense/getTopThreeCategoriesOfMonth`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'userId': userId
          }
        });
        setTopCategories(response.data); 
        console.log(response)
      } catch (error) {
        console.error("Error fetching top categories:", error);
      }
    };
    
    fetchTopThreeCategories();
  }, []);
  useEffect(() => {
    // console.log(expenses.date);
    if (expenses && expenses.length > 0) {
      let expenseMap = {};
      expenses.forEach(expense => {
        const [yearStr, monthStr] = expense.date.split("-"); 
        const year = parseInt(yearStr);
        const month = parseInt(monthStr) - 1; // Jan = 0
      
        if (!expenseMap[year]) {
          expenseMap[year] = Array(12).fill(0);
        }
        expenseMap[year][month] += expense.expense;
      });
      

      setMonthlyData(expenseMap);
      const latestYear = Math.max(...Object.keys(expenseMap).map(Number)); 
      setSelectedYear(latestYear.toString());// with this will set the latest year as the default
    }
  }, [expenses]);
  const generateChartData = (year) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datasets = [];

    if (year && monthlyData[year]) {
      datasets.push({
        label: `Expenses for ${year}`,
        data: monthlyData[year],
        backgroundColor: '#4caf50',
        borderRadius: 10,
        borderWidth: 1,
      });
    }
  
    return { labels, datasets };
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const years = Object.keys(monthlyData);

  return (
    <div className='d-main'>
      
      <div className='d-main1'>
        <div className='d-one'>
          {topCategories.map((item, index) => (
            <div key={index} className='food'>
              <h4>{item.expense_type}</h4>
              <p>Total: ₹{item.total}</p>
        </div>
        ))}
      </div>

      
        <div className='d-two'>
          {/* <Bar data={generateChartData()} /> */}
          <select onChange={handleYearChange} value={selectedYear}>
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          {selectedYear ? (
            <Bar data={generateChartData(selectedYear)} />
          ) : (
             <div>Select a year to view the expenses breakdown.</div>
          )}
          
          
        </div>
      </div>
      <div className='d-three' style={{fontSize:"12px"}}>
        <h3>Latest 10 Expenses</h3>
        <ul style={{listStyle:"none", padding:"0px"}}>
          {tenLatestTransactions.map((item)=>(
            <li key={item.expenseId} style={{listStyle:"none"}}>
              <div style={{display:"flex", justifyContent:"space-between", border:"1px solid white", borderLeft:"none", paddingTop:"10px",  borderRight:"none"}}>
                <div>
                  <strong>{item.expenseName}</strong>  
                  <p>{item.date}</p>
                </div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center", color:"red"}}>{item.expense}</div>
              </div>
              {/* <p>{item.expenseName} {item.date} {item.expenseName} {item.expense}</p> */}
            </li>
          ))}
        </ul>
        
      </div>
      
      
    </div>
  )
}

export default Dashboard
