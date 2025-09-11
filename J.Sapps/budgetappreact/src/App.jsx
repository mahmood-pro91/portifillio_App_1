import React, { useState } from 'react'
import './App.css'
import {Title,Budget,Expense,Calculation} from './components/component';



const App = () => {
  const [budget,setBudget] = useState(0)
  const [expenses, setExpenses] = useState(0);
  const [balance,setBalance] = useState(0)
  const [expensesList,setExpensesList] = useState([])

  return (
    <div className='m-4 p-2 '>
      <Title />
      <Budget budget={budget} setBudget={setBudget} setBalance={setBalance} />
      
      <Calculation budget={budget}  expenses={expenses} balance={balance} setExpenses={setExpenses}/>  
      
      <Expense budget={budget} setBudget={setBudget} balance={balance} setBalance={setBalance} expenses={expenses} setExpenses={setExpenses} expensesList={expensesList} setExpensesList={setExpensesList} />    
    </div>
  )
}
import './App.css'
export default App
