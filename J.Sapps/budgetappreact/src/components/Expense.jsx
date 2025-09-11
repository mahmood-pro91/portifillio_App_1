import React from 'react'

const Expense = ({budget,balance,setBalance,expenses,setExpenses,setExpensesList,expensesList}) => {
  
  const handlesubmit =(e)=>{
        e.preventDefault()
        
        const expenseList = e.target.expenseList.value ;
        const expenseValue =parseInt( e.target.expenseValue.value) ;
        setExpenses(expenses+expenseValue)
        console.log (`${expenseList} : ${expenseValue}`)
        const balance = budget-expenses
        console.log(balance)
        setBalance(balance)
        
        

        

    }
    const border1 = 'border-red-800 rounded'

    return (
    <div className={`bg-gray-50 w-full border-2 ${border1} my-3 my-8  p-4 `}>
        <form className='flex flex-col items-start justify-center'
         action="" method="post" onSubmit={handlesubmit}>
            
            <h3 className={`text-xl text-center ${border1} mb-2  text-gray-700 `}>Please Enter Your Expense</h3>
           <div className={`bg-white p-2 text-gray-700 mb-2 w-full outline-1 rounded outline-red-700 
             h-10  focus:shadow-md/30 focus:shadow-gray-700 focus:inset-shadow-sm focus:outline-1`}> 
            <input className='border-none outline-0 w-full' 
            type="text" name='expenseList' placeholder=""  />
            </div>
            <h3 className={`text-xl text-center ${border1} mb-2  text-gray-700 `}>Please Enter Your Expense</h3>
            
            <input className={`bg-white p-2 text-gray-700 mb-2 w-full outline-1 rounded outline-red-700 
             h-10  focus:shadow-md/30 focus:shadow-gray-700 focus:inset-shadow-sm focus:outline-1`} 
            type="number" name='expenseValue' placeholder=""  />
            
            <button className={`border-1 ${border1} 
             text-red-700 p-2 my-2 hover:bg-red-700 hover:text-gray-100
             `}
             
             type="submit">Add Expense</button>
        </form>
        
            
    </div>
    )
}

export default Expense
