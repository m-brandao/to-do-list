import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function InputSection() {
  const [toDoValue, setToDoValue] = useState('');
  const [toDoArray, setToDoArray] = useState(localStorage.getItem('toDoArray') ? JSON.parse(localStorage.getItem('toDoArray')) : []);
  const [datePickerValue, setDatePickerValue] = useState('')
  const [daysRemaining, setDaysRemaining] = useState()

  const handleDatePicker = (e) => {
    setDatePickerValue(e.target.value)
  }

  const handleOnChange = (e) => {
    setToDoValue(e.target.value);
  };

  const handleOnClick = () => {
    if(toDoValue !== '' && datePickerValue !== ''){
    const newEntry = { id: uuidv4(), name: toDoValue, dueDate: datePickerValue };
    setToDoArray([...toDoArray, newEntry]);
    // calculateDaysRemaining();
    setToDoValue('');
    setDatePickerValue('');
    // setDaysRemaining('');
    }else{
      alert('A to do name must be added');
    }
  };

  const handleRemove = (id) => {
    const updatedArray = toDoArray.filter((item) => item.id !== id);
    setToDoArray(updatedArray);
  };

  // const calculateDaysRemaining = () => {
  //   let today = new Date();
  //   let day = today.getDate();
  //   let month = today.getMonth() + 1;
  //   if(month < 10){
  //     month= '0'+ month;
  //   }
  //   const year = today.getFullYear();
  //   const currentDate = year + '-' + month + '-' + day;
  //   today = new Date(currentDate);
  //   console.log(today)
  //   const dueDate = datePickerValue;
  //   const timeDifference = Math.abs(dueDate - today);
  //   console.log(timeDifference)
  //   const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  //   console.log(daysRemaining)
  //   setDaysRemaining(daysRemaining);
  // };


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
          {toDoArray.map((item) => (
            <>
            <li key={item.id}>
              <h3>Name: {item.name}</h3>
              <span>Due Date: {item.dueDate}</span>
              <span>Days Remaining: {daysRemaining}</span>
              <button onClick={() => handleRemove(item.id)}>Done</button>
            </li>
            </>
          ))}
        </ul>
      </section>
    </>
  );
}
