const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
//middleware
app.use(express.json()) //req.body
app.use(cors())

// ROUTES //

//create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body

    const newTodo = await pool.query(
      'INSERT INTO todo (description) values($1) RETURNING *',
      [description]
    )
    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// get all todos

app.get('/todos', async (req, res) => {
  try {
    const allTodo = await pool.query('select * from todo ')
    res.json(allTodo.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// get a todos

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const Todo = await pool.query('select * from todo where todo_id =$1 ', [id])
    res.json(Todo.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// update a todos

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { description } = req.body
  try {
    const updateTodo = await pool.query(
      'update todo set description =$1 where todo_id =$2 RETURNING *',
      [description, id]
    )
    res.json(updateTodo.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// delete a todos

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const Todo = await pool.query('delete from todo where todo_id =$1 ', [id])
    res.json('todo deleted')
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000, () => {
  console.log('server has started on port 5000')
})
