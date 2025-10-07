import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistics = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyCredit, setMonthlyCredit] = useState({});
  const [monthlyDebit, setMonthlyDebit] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/expense/userId`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'UserId': userId
          }
        });

        const data = response.data;
        setExpenses(data);

        let creditMap = {};
        let debitMap = {};

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const categoryTotals = {};

        data.forEach(expense => {
          const [yearStr, monthStr] = expense.date.split("-");
          const year = parseInt(yearStr);
          const month = parseInt(monthStr) - 1;

          // Credit/Debit data for chart
          if (expense.transactionType === 'CREDIT') {
            if (!creditMap[year]) creditMap[year] = Array(12).fill(0);
            creditMap[year][month] += expense.expense;
          } else if (expense.transactionType === 'DEBIT') {
            if (!debitMap[year]) debitMap[year] = Array(12).fill(0);
            debitMap[year][month] += expense.expense;
          }

          // Pie Chart Category Data for present month
          if (year === currentYear && month === currentMonth) {
            const category = expense.expenseType || "UNCATEGORIZED";
            if (!categoryTotals[category]) categoryTotals[category] = 0;
            categoryTotals[category] += expense.expense;
          }
        });

        setMonthlyCredit(creditMap);
        setMonthlyDebit(debitMap);
        setCategoryData(categoryTotals); // for Setting Pie Chart Data

        const latestYear = Math.max(
          ...Object.keys({ ...creditMap, ...debitMap }).map(Number)
        );
        setSelectedYear(latestYear.toString());

      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const generateChartData = (year) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datasets = [];

    if (monthlyCredit[year]) {
      datasets.push({
        label: 'Credit',
        data: monthlyCredit[year],
        backgroundColor: 'green',
        borderRadius: 8
      });
    }

    if (monthlyDebit[year]) {
      datasets.push({
        label: 'Debit',
        data: monthlyDebit[year],
        backgroundColor: 'red',
        borderRadius: 8
      });
    }

    return { labels, datasets };
  };

  const generateCategoryPieData = () => {
    return {
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#C9CBCF'
          ],
        },
      ],
    };
  };

  const allYears = [
    ...new Set([
      ...Object.keys(monthlyCredit),
      ...Object.keys(monthlyDebit)
    ])
  ].sort((a, b) => a - b);

  return (
    <div style={{display: "flex",justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", width: "100%", padding: "2rem"}}>
      
      <div style={{width: "50%",padding: "1rem",borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h2>Monthly Credit vs Debit</h2>
        <select onChange={handleYearChange} value={selectedYear} style={{ marginBottom: "1rem" }}>
          <option value="">Select Year</option>
          {allYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        {selectedYear ? (
          <Bar data={generateChartData(selectedYear)} />
        ) : (
          <p>Please select a year to view statistics.</p>
        )}
      </div>
    
      
      <div style={{ width: "50%",padding: "1rem",borderRadius: "10px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h3>Spending Breakdown - This Month</h3>
        {Object.keys(categoryData).length > 0 ? (
          <Pie data={generateCategoryPieData()} />
        ) : (
          <p>No expense data for this month.</p>
        )}
      </div>
    </div>
    
  );
};

export default Statistics;
