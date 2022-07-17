const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const PORT = process.env.PORT || 3001
const app = express()

const db = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root123",
  database: "systempolldb"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/api/poll/create', (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const start_date = req.body.start_date
  const termination_date = req.body.termination_date

  const sqlInsert = "INSERT INTO polls(title, description, start_date, termination_date) VALUES (?,?,?,?)"
  db.query(sqlInsert, [title, description, start_date, termination_date], (err, result) => {
    res.send(result)
    console.log(result)
    if (err) console.log(err)
  })
})

app.get('/api/poll/read', (req, res) => {
  const sqlSelect = "SELECT * FROM systempolldb.polls"
  db.query(sqlSelect, (err, result) => {
    res.send(result)
    if (err) console.log(err)
  })
})

app.get('/api/poll/read/:id', (req, res) => {
  const id = req.params.id
  const sqlSelectPoll = "SELECT * FROM systempolldb.polls WHERE id=?"
  db.query(sqlSelectPoll, id, (err, result) => {
    res.send(result)
    console.log(result)
    if (err) console.log(err)
  })
})

app.get('/api/poll/readLast', (req, res) => {
  const sqlSelect = "SELECT id FROM systempolldb.polls ORDER BY id DESC LIMIT 1"
  db.query(sqlSelect, (err, result) => {
    res.send(result)
    console.log(result)
  })
})

app.post('/api/options/create', (req, res) => {
  const name = req.body.name
  const id_poll = req.body.id_poll
  const votes = 0

  const sqlInsert = "INSERT INTO options(name, id_poll, votes) VALUES (?,?,?)"
  db.query(sqlInsert, [name, id_poll, votes], (err, result) => {
    res.send(result)
    console.log(result)
    if (err) console.log(err)
  })
})

app.get('/api/options/read/:id/:pollId', (req, res) => {
  const id = req.params.id
  const pollId = req.params.pollId
  const sqlSelectOption = "SELECT * FROM systempolldb.options WHERE (id = ? AND id_poll = ?)"
  db.query(sqlSelectOption, [id, pollId], (err, result) => {
    res.send(result)
    console.log(result)
    if (err) console.log(err)
  })
})

app.get('/api/options/read/:pollId', (req, res) => {
  const pollId = req.params.pollId
  const sqlSelect = "SELECT * FROM systempolldb.options WHERE id_poll = ?"
  db.query(sqlSelect, pollId, (err, result) => {
    console.log(result)
    res.send(result)
    if (err) console.log(err)
  })
})

app.put('/api/vote/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const id_poll = req.body.id_poll
  const votes = req.body.votes
  const sqlUpdate = "UPDATE options SET name=?, id_poll=?, votes=? WHERE id=?"
  db.query(sqlUpdate, [name, id_poll, votes, id], (err, result) => {
    res.send(result)
    console.log(result)
  } )
})

app.put('/api/poll/update/', (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const start_date = req.body.start_date
  const termination_date = req.body.termination_date
  const sqlUpdate = "UPDATE polls SET title=?, description=?, start_date=?, termination_date=? WHERE id=?"
  db.query(sqlUpdate, [title, description, start_date, termination_date], (err, result) => {
    res.send(result)
    if (err) console.log(err)
  })
})

app.delete('/api/poll/delete/:title', (req, res) => {
  const title = req.params.title
  const sqlDelete = "DELETE FROM polls WHERE title = ?"
  db.query(sqlDelete, title, (err, result) => {
    res.send(result)
    if (err) console.log(err)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})