import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function InputSection() {
  const [toDoValue, setToDoValue] = useState('');
  const [toDoArray, setToDoArray] = useState(localStorage.getItem('toDoArray') ? JSON.parse(localStorage.getItem('toDoArray')) : []);
  const [datePickerValue, setDatePickerValue] = useState('')
  const [toDoState, setToDoState] = useState('')

  const handleDatePicker = (e) => {
    setDatePickerValue(e.target.value)
  }

  const handleOnChange = (e) => {
    setToDoValue(e.target.value);
  };

  const handleStatusChange = (e, itemId) => {
    const updatedToDoArray = toDoArray.map((item) => {
      if (item.id === itemId) {
        return { ...item, status: e.target.value };
      }
      return item;
    });
    setToDoArray(updatedToDoArray);
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
    calculateDaysRemaining();
    setToDoValue('');
    setDatePickerValue('');
    }else{
      alert('A to do name must be added');
    }
  };

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const currentDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const dueDateTime = new Date(dueDate).getTime();

    if (dueDateTime < currentDateTime) {
      const timeDifference = Math.abs(currentDateTime - dueDateTime);
      const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return `${daysPassed} day(s) ago`;
    }//else if(){
      
    //}

    const timeDifference = Math.abs(dueDateTime - currentDateTime);
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return `${daysRemaining} day(s) remaining`;
  };

  useEffect(() => {
    localStorage.setItem('toDoArray', JSON.stringify(toDoArray))
  }, [toDoArray])
  

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
    <section>
        <ul>
          <li id='menu-toDoList' key='menu-toDoList'><h3>Name</h3><h3>Due Date:</h3><h3>Days Remaining</h3><h3>Status:</h3></li>
          {toDoArray.map((item) => (
            <li key={item.id}>
              <h3>Name: {item.name}</h3>
              <p>Due Date: {item.dueDate}</p>
              <p>Days Remaining: {calculateDaysRemaining(item.dueDate)}</p>
              <select name="status" id="status" value={item.status} onChange={(e) => handleStatusChange(e, item.id)}>
                <option value="none">-</option>
                <option value="working-on-that">Working on that</option>
                <option value="waiting-on-feedback">Waiting on Feedback</option>
                <option value="stuck">Stuck</option>
                <option value="done">Done</option>
              </select>

              {/* <button onClick={() => handleRemove(item.id)}>Done</button> */}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
