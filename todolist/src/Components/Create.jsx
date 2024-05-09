import React, { useState } from 'react'
import axios from 'axios'
const Create = ({fetchData}) => {
    const [task,setTask] = useState([])
    
    const handleAdd = () => {
        axios.post("http://localhost:3001/add",{task : task})
        .then(result => {
          // location.reload()
          fetchData();
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <input className="input" type="text" placeholder="Enter Todo" name="inputtask" id="tasks" onChange={(e)=> setTask(e.target.value)} />
        <button onClick={handleAdd} className="button" style={{ fontFamily: 'Lato, sans-serif' }}> ADD </button>
    </div>
  )
}

export default Create