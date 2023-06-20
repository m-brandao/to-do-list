import React, { useEffect, useState } from 'react'
import DisplayItems from '../DisplayItems/DisplayItems'
import InputSection from '../InputSection/InputSection'

export default function Dashboard() {
    const [toDoArray, setToDoArray] = useState(localStorage.getItem('toDoArray') ? JSON.parse(localStorage.getItem('toDoArray')) : []);

    useEffect(() => {
        localStorage.setItem('toDoArray', JSON.stringify(toDoArray))
    }, [toDoArray])

  return (
    <>
          <InputSection toDoArray={toDoArray} setToDoArray={setToDoArray}/>

        <section>
            <ul>
                <li id='menu-toDoList' key='menu-toDoList'><h3>Name</h3><h3>Due Date:</h3><h3>Days Remaining</h3><h3>Status:</h3></li>
                <DisplayItems toDoArray={toDoArray} setToDoArray={setToDoArray} />
            </ul>
        </section>
    </>
  )
}
