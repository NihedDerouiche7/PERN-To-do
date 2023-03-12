import React, { useEffect, useState } from "react";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (todo_id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id != todo_id));
      console.log(deleteTodo);
    } catch (err) {
      console.error(err.message);
    }
  };

  const gettodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    gettodos();
  }, []);
  console.log(todos);
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
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
