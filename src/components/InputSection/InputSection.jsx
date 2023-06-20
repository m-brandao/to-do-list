import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DisplayItems from '../DisplayItems/DisplayItems';

export default function InputSection({toDoArray, setToDoArray}) {
  const [toDoValue, setToDoValue] = useState('');
  const [datePickerValue, setDatePickerValue] = useState('')
  const [toDoState, setToDoState] = useState('')


  const handleDatePicker = (e) => {
    setDatePickerValue(e.target.value)
  }

  const handleOnChange = (e) => {
    setToDoValue(e.target.value);
  };

  const handleOnClick = () => {
    if(toDoValue !== '' && datePickerValue !== ''){
    const newEntry = { 
      id: uuidv4(),
      name: toDoValue,
      dueDate: datePickerValue,
      status: 'none',
    };
    setToDoArray([...toDoArray, newEntry]);
    setToDoValue('');
    setDatePickerValue('');
    }else{
      alert('A to do name must be added');
    }
  };

  return (
    <>
    <section id='inputSection'>
      <h1>To Do List:</h1>
      <label htmlFor="toDoName">Título:</label>
      <input
        id='toDoName' 
        type="text" 
        name='toDoName' 
        onChange={handleOnChange} 
        value={toDoValue} 
        placeholder="Enter your text here..." 
        required />

      <label htmlFor="dueDate">Due Date:</label>  
      <input 
        id='dueDate'
        type="date"
        name="dueDate"
        onChange={handleDatePicker}
        value={datePickerValue}
        required/>
      
      <button id='add_btn' onClick={handleOnClick}>ADD</button>
    </section>
    </>
  );
}
