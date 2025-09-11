import React, { useState } from 'react'
import budgeticon from '../assets/budget-svgrepo-com.svg';
import expenseicon from '../assets/credit-card-svgrepo-com (1).svg';
import balanceicon from '../assets/finance-currency-dollar-svgrepo-com.svg';

const Calculation = ({budget ,expenses,balance}) => {
  const h6style = 'text-3xl text-gray-800' ;
  const h4style = "text-3xl  " ;
  const imgstyle = "w-14 h-14 m-2 p-1 " ;

  
  


  return (
    <div className='my-8 flex gap-3 justify-around'>

          <div className='flex flex-col gap-3 justify-center items-center fo '>

              <h6 className={`${h6style}`}>BUDGET</h6>
              <img className={`${imgstyle}`} src={budgeticon} alt=""  />
              <h4 className={`${h4style} text-green-700`}>$ {budget}</h4>

          </div>
          <div className='flex flex-col gap-3 justify-center items-center '>

              <h6 className={`${h6style}`}>EXPENSES</h6>
              <img src={expenseicon} alt="" className={`${imgstyle}`} />
              <h4 className={`${h4style} text-red-700`}>$ {expenses}</h4>

          </div>
          <div className='flex flex-col gap-3 justify-center items-center '>

              <h6 className={`${h6style}`}>BALANCE</h6>
              <img src={balanceicon} alt="" className={`${imgstyle}`} />
              <h4 className={`${h4style} text-gray-700`}>$ {balance}</h4>

          </div>

    </div>
  )
}

export default Calculation
