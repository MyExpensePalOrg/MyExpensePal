import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GetExpense.css';
import { useNavigate } from 'react-router-dom';

const GetExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [sortConfig, setSortConfig]=useState({key:'expenseName',direction:'ascending'});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [selectedExpense, setSelectedExpense]=useState(null);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            // const userId = "41ca3afa-a016-46b2-b1fd-4b1d8ac1dc96";
            const userId=localStorage.getItem("userId");
            //console.log("dscsd:",userId);
            const token = localStorage.getItem("token"); 

            try {
                const response = await axios.get(`http://localhost:8080/expense/userId`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'UserId': userId
                    }
                });
                setExpenses(response.data);
               
                setFilteredExpenses(response.data);
                //console.log(response.data)
            } catch (error) {
                console.error("Error fetching expenses:", error);
                setError("Failed to fetch expenses.");
            }
        };

        fetchExpenses();
    }, []);
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(event.target.classList.contains("modal")){
                setIsModalOpen(false);
            }
        };
        if(isModalOpen){
            window.addEventListener("click",handleClickOutside);
        }else{
            window.removeEventListener("click",handleClickOutside);

        }

        return ()=>{
            window.removeEventListener("click",handleClickOutside);
        };
    },[isModalOpen]);
    const handleDelete = async  (expenseId) => {
        console.log("Deleting expense:", expenseId);
        const token = localStorage.getItem("token");
        try{
           await axios.delete(`http://localhost:8080/expense/deleteExpense/${expenseId}`,{
                headers: {Authorization: `Bearer ${token}`}
            });
            const updatedExpenses = expenses.filter(expense => expense.expenseId !== expenseId);
            setExpenses(updatedExpenses)
            // setExpenses(expenses.filter(expense => expense.expenseId !== expenseId));
            // setFilteredExpenses(expenses.filter(expense => expense.expenseId !== expenseId));
            if (selectedType) {
                const filtered = updatedExpenses.filter((expense) => expense.expenseType === selectedType);
                setFilteredExpenses(filtered);
            } else {
                setFilteredExpenses(updatedExpenses); // Show all if no filter is selected
            }
            setIsModalOpen(false);
        }catch(error){
            console.error("Error deleting expense:", error);            
            setError("Failed")
        }
        
    };
    const handleEdit = (expense) => {
        // setSelectedExpense(expense); 
        navigate('/updateexpense',{state:{expense}});
    };
    const handleView =(expense)=>{
        setSelectedExpense(expense);
        setIsModalOpen(true);
        //navigate('/viewexpense',{state:{expense}});
    };
    const closeModal=()=>{
        setIsModalOpen(false);
    }
    const handleEmail = () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
    
        axios.get("http://localhost:8080/mail/sendAllExpensesReport", {
            headers: {
                Authorization: `Bearer ${token}`,
                'UserId': userId
            }
        })
        .then(response => {
            console.log("Email sent successfully:", response);
            alert("Expenses report sent successfully.");
        })
        .catch(error => {
            console.error("Error sending email:", error);
            alert("Failed to send expenses report.");
        });
    };
    
    const handleDownload= async ()=>{
        setLoading(true);
        const token= localStorage.getItem("token");
        const userId=localStorage.getItem("userId");
        try{
             const response = await axios.get("http://localhost:8080/report/generateReport",{
                headers:{
                    Authorization: `Bearer ${token}`,
                    'UserId': userId
                },
                responseType: 'blob' //to download file it is required
    
            })
            const file = new Blob([response.data], {type: 'application/pdf'});//giving file type based on response
            const link = document.createElement('a');
            link.href=URL.createObjectURL(file);
            link.download="report.pdf";//setting default name for pdf
            document.body.append(link);
            link.click();
            document.body.removeChild(link);

        }       
        catch(error){
            console.error("Error downloading expenses:", error);
            setError("Failed to Download expenses.");
        }
        finally{
            setLoading(false);
        }
    }
    const sortExpenses = (columnName)=>{
        let direction = 'ascending';
        if (sortConfig.key === columnName && sortConfig.direction === 'ascending'){
            direction='descending';
        }
        const sortedExpenses = [...filteredExpenses].sort((a,b)=>{
            // if(a[columnName]<b[columnName]){
            //     return direction === 'ascending' ? -1 :1;
            // }
            // if(a[columnName]>b[columnName]){
            //     return direction ==='ascending' ? 1 : -1;
            // }
            // return 0;
            if (a[columnName] < b[columnName]) return direction === 'ascending' ? -1 : 1;
            if (a[columnName] > b[columnName]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setFilteredExpenses(sortedExpenses);
        setSortConfig({key: columnName, direction});
    };
    const handleFilterChange = (e) => {
        const type = e.target.value;
        setSelectedType(type);
    
        if (type === '') {
          setFilteredExpenses(expenses); // this for shows expenses if no filter is selected
        } else {
          const filtered = expenses.filter((expense) => expense.expenseType === type);
          setFilteredExpenses(filtered); // Show on selected optoon filtered expenses based on selected type
        }
    };
    

    return (
        <section id="sec22">
            
            <div className="action-container">
            <h2>Your Expenses</h2>
            <button className="dwld-btn" onClick={handleDownload} disabled={loading}>
            {loading ? (
                <>
                    Downloading... <span className="spinner"></span>
                </>
            ) : (
                "Download"
            )}
             </button>
                <button className='email-btn' onClick={() => handleEmail()}>Send Email</button>
                <select className="filter-container" onChange={handleFilterChange} value={selectedType}>
                    <option value="">All</option>
                    <option value="ENTERTAINMENT">Entertainment</option>
                    <option value="FOOD">Food</option>
                    <option value="HOME">Home</option>
                    <option value="LIFE">Life</option>
                    <option value="TRANSPORTATION">Transportation</option>
                    <option value="UTILITIES">Utilities</option>
                </select>
            </div>
            {error && <p className="error">{error}</p>}

            <table className="expense-table">
                <thead>
                    <tr>
                        <th onClick={() => sortExpenses('expenseName')} className="sortable">
                            Expense Name
                            {sortConfig.key==='expenseName' ? (sortConfig.direction==='ascending' ? '🔼':'🔽'):'🔼'}
                        </th>
                        <th onClick={()=>sortExpenses('expense')} className="sortable">Amount
                            {sortConfig.key==='expense' ? (sortConfig.direction==='ascending' ? '🔼':'🔽'): '🔼'}
                        </th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Transaction Type</th>
                        <th onClick={()=>sortExpenses('date')} className="sortable">Date
                            {sortConfig.key==='date' ? (sortConfig.direction==='ascending'? '🔼':'🔽'):'🔼'}
                        </th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense) => (
                        <tr key={expense.expenseId}>
                        {/* <tr key={index}> */}
                            <td>{expense.expenseName}</td>
                            <td>${expense.expense}</td>
                            <td>{expense.expenseType}</td>
                            <td>{expense.location}</td>
                            <td>{expense.transactionType}</td>
                            <td>{expense.date}</td>
                            <td>{expense.time}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleView(expense)}>View</button>
                                <button className="edit-btn" onClick={() => handleEdit(expense)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(expense.expenseId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/*displaying single expense */}
            {isModalOpen && selectedExpense &&(
                <div className='modal'>
                    <div className='modal-content' style={{fontSize:"19px",color:"white"}}>
                        <span className='close-btn' onClick={closeModal}>&times;</span>
                        <h2>Expense Details</h2>
                        <p><strong>Expense Name:</strong> {selectedExpense.expenseName}</p>
                        <p><strong>Amount:</strong> ${selectedExpense.expense}</p>
                        <p><strong>Expense Type:</strong> {selectedExpense.expenseType}</p>
                        <p><strong>Transaction Type:</strong> {selectedExpense.transactionType}</p>
                        <p><strong>Location:</strong> {selectedExpense.location}</p>
                        <p><strong>Created On:</strong> {selectedExpense.createdOn}</p>
                        {/*<p><strong>Time:</strong> {selectedExpense.time}</p>*/}
                        <p><strong>Last Modified:</strong> {selectedExpense.lastModified}</p>
                        <div>
                            <button className='edit-btn' onClick={() => handleEdit(selectedExpense)}>Edit</button>
                            <button className='delete-btn' onClick={() => handleDelete(selectedExpense.expenseId)}>Delete</button>
                            <button className='dwld-btn' onClick={()=>handleDownload()}>Download</button>
                            <button className='email-btn' onClick={()=>handleEmail()}>Send Email</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GetExpense;
