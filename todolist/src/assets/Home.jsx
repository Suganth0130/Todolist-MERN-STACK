import React, { useEffect } from 'react'
import Create from './Create'
import { useState } from 'react'
import './style.css'
import axios from 'axios' 
import { MdDelete } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
const Home = () => {
    const [todos,setTodos] = useState([])
    
    function fetchData(){
        axios.get("http://localhost:3001/get")
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }
    
    useEffect(()=> {
        fetchData();
    },[])



    const handleEdit = (id)=>{
        console.log("Edit");
        axios.put(`http://localhost:3001/update/${id}`)
        .then(result => {
            fetchData();
        })
        .catch(err => console.log(err))

    }

    const handleDelete = (id) => {
        console.log("Delete");
        axios.delete(`http://localhost:3001/delete/${id}`)
        .then(result => {
            fetchData();
        })
        .catch(err => console.log(err))

    }


  return (
    <div className="homediv">
        <div className = "homeConatainer">
        <div className = "tododiv"> 
        <h1 className="h1" style={{ fontFamily: 'Lato, sans-serif' }} > ToDo list </h1>
        <Create fetchData = {fetchData}/> 
        {
            todos.length ===0
            ?
            <div>
                <h1 style={{ fontFamily: 'Lato, sans-serif' }} className="text-[2rem]"> No record</h1>
            </div>
            :
            todos.map((todo, index) => (
            //   <div className=''>  
                <div className="task" key={index}>
                    <div className="circle w-12 h-12 flex justify-center items-center" onClick={() => handleEdit(todo._id)}>
                    {todo.done ?
                       <BsFillCheckCircleFill  className="circle" />
                       :
                       <BsCircleFill className="circle "/>
                    }
                    </div>
                    
                    {/* <p className={todo.done ? "line w-16 bg-cyan-300": "w-16s bg-cyan-300"}> {todo.task} </p>  */}
                    <p className={todo.done ? "line w-36 " : "w-36"} style={{ wordWrap: 'break-word' }}> {todo.task} </p>
                    <div className='w-12 h-12 flex justify-center items-center'>
                    <div className="deleteicon">
                    <MdDelete onClick={() => handleDelete(todo._id)} / >
                    </div>
                    </div>
                </div>
                
            ))    
        }
        </div> 
    </div>
    </div>
  )
}

export default Home