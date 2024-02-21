import React, { useState} from "react";
import '../App';
import { AiFillCloseCircle } from "react-icons/ai"

const Modal = ({ setIsModalOpen,modalRequestType,onAddExpenseHandler,onAddIncomeHandler }) => {
  
    const[description,setDescription] = useState("");
    const[amount, setAmount] = useState("");

    const onButtonClick = () => {
      if(!description || !amount) { return; }
      
      if(modalRequestType ==='expense')
      { onAddExpenseHandler(description,amount);}
     
      if(modalRequestType ==='income')
      { onAddIncomeHandler(description,amount);}
      
      setIsModalOpen(false);
    }

    return (
     <div className='modal-overlay'>
       <div className='modal'>
         <AiFillCloseCircle size={40} color="black" className='modal-close-icon' onClick={() => setIsModalOpen(false)}/>
          <h2>{modalRequestType === 'expense' ? 'Add Expense' : 'Add Income' }</h2>
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
          <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
          <button onClick={onButtonClick}>{modalRequestType === 'expense' ? 'Add Expense' : 'Add Income' }</button>
       </div>
     </div>
    );   
}
export default Modal