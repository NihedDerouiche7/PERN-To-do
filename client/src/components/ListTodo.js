 import React, { useEffect ,useState} from "react"

 
 const ListTodo = () => {

    const [todos,setTodos]= useState([])

const gettodos =async ()=>{
try {
    const response = await fetch("http://localhost:5000/todos");
       const jsonData = await response.json()
      setTodos(jsonData)
    
} catch (err) {
    console.error(err.message);
}
}

    useEffect (()=>{
        gettodos();
    },[])
    console.log(todos)
   return (
     <>
      <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo=>(
        <tr>
            <td>{todo.description}</td>
            <td>Edit</td>
            <td>Delete</td>
        </tr>
      ))}
      
     
    </tbody>
  </table>
     </>
   )
 }
 
 export default ListTodo
 