import React from 'react';

import { colors } from './styles';

const Budget = ({budget,setBudget , setBalance}) => {
    


    const handlesubmit =(e)=>{
        e.preventDefault()
    
        const budgetValue = e.target.budget.value
        if(budgetValue <= 0  ){
            return e.target.budget.placeholder = `budget can not be less than zero or empty value`
        }else{
            setBudget(budgetValue)
            setBalance(budgetValue)
            e.target.budget.value = "" 
            e.target.budget.placeholder=''
        }
        
    }
    const border1 = 'border-green-800 rounded'

    return (
    <div className={`bg-gray-50 w-full border-2 ${border1} my-3 mt-1  p-4 `}>
        <form className='flex flex-col items-start justify-center'
         action="" method="post" onSubmit={handlesubmit}>
            <h3 className={`text-xl text-center ${border1} mb-2  text-gray-700 `}>Please Enter Your Budget</h3>
            <input className={`bg-white p-2 text-gray-700 mb-2 w-full outline-1 rounded outline-green-700 
             h-10  focus:shadow-md/30 focus:shadow-gray-700 focus:inset-shadow-sm focus:outline-1`} 
            type="number" placeholder="" name='budget' />
            <button className={`border-1 ${border1} w-25
             text-green-700 p-2 m-2 hover:bg-green-700 hover:text-gray-800`}
             type="submit">Calculate</button>
        </form>
        
            
    </div>
  )
}

export default Budget
