import React from 'react'

export default function DisplayItems({toDoArray,setToDoArray}) {
  
    const handleStatusChange = (e, itemId) => {
        const updatedToDoArray = toDoArray.map((item) => {
            if (item.id === itemId) {
            return { ...item, status: e.target.value };
            }
            return item;
        });
        setToDoArray(updatedToDoArray);
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

  

  return (
          toDoArray.map((item) => (
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
          ))
  )
}
