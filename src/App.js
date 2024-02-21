import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { useState } from 'react';
import uniqid from 'uniqid';

import { GiPayMoney, GiReceiveMoney} from "react-icons/gi";
import {GrNotes} from 'react-icons/gr'

function App() {

  const[isModalOpen,setIsModalOpen] = useState(false);
  const[modalRequestType,setModalRequestType] = useState("")
  const[expenses,setExpenses] = useState([]);
  const[incomes,setIncomes] = useState([]);


  const onExpenseBoxClick =() => {
    setIsModalOpen(true);
    setModalRequestType("expense");
   }

  const onIncomeBoxClick =() => { 
    setIsModalOpen(true);
    setModalRequestType("income");
  }
  
 
  const onAddExpenseHandler = (description,amount) => {
    const oldExpenses = [...expenses];
    
    const newExpense = {
      id:uniqid(),
      type: "expense",
      amount: amount,
      description: description,
    };
    const newExpenses = oldExpenses.concat(newExpense);
    setExpenses(newExpenses);
  };

  const onAddIncomeHandler = (description,amount) => {
    const oldIncomes = [...incomes];
    
    const newIncome = {
      id:uniqid(),
      type: "income",
      amount: amount,
      description: description,
    };
    const newIncomes = oldIncomes.concat(newIncome);
    setIncomes(newIncomes);
  };

  const onRemoveTransactionHandler = (type,id) => {
   if(type ==='expense'){
     const oldExpenses = [...expenses];
     const newExpenses = oldExpenses.filter((expense) => expense.id !== id);
     setExpenses(newExpenses);
   }
   else if(type === 'income'){
    const oldIncomes = [...incomes];
    const newIncomes = oldIncomes.filter((income) => income.id !== id);
    setIncomes(newIncomes);
   }
  }

  const transactions = [...expenses, ...incomes];
  console.log("transactions",transactions);
  

  return (
    <div className="App">
     <Header/>
     {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} 
                            modalRequestType={modalRequestType}
                            onAddExpenseHandler = {onAddExpenseHandler}
                            onAddIncomeHandler = {onAddIncomeHandler}
                            />}
      
      <div className='content'>      
       <div className='boxes-wrapper'>
         <div className='box-expense' onClick={onExpenseBoxClick}>
           <GiPayMoney size={100} color="red"/>
            Add Expense
         </div>
         <div className='box-income' onClick={onIncomeBoxClick}>
          <GiReceiveMoney size={100} color="green"/>
           Add Income
          </div>
       </div>

       <div className='transactions-wrapper'>
         
        {transactions.length > 0 ?<h2>All transactions</h2> : <div className='box-no-transactions'>
          <GrNotes size={100} color="yellow"/>
           No Transactions
          </div> } 
         { transactions.map((transaction) => (
            <div key={transaction.id} 
            style={{
              width:"50%",
              height:"35px",
              padding:"7px",margin:"7px",borderRadius:"10px",
              fontWeight:"bold",fontSize:"18px",
              background: transaction.type === "expense" ? "#f37b7b" : "#63e263",
              display:"flex",
              alignItems: "center",
              justifyContent:"space-between"
            }
             }
             
             onClick={()=>onRemoveTransactionHandler(transaction.type,transaction.id)}
             
             >
            
            <div>{transaction.description}</div>
            <div>{transaction.amount}</div>
            </div>
         ))}

       </div>

     </div>
     <Footer/>
    </div>
  );
}

export default App;
