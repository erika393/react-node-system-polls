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

app.get('/api/get', (req, res) => {
  const sqlSelect = "SELECT * FROM systempolldb.polls"
  db.query(sqlSelect, (err, result) => {
    console.log(result)
  })
})

app.post('/api/insert', (req, res) => {
  const title = req.body.title
  const start_date = req.body.start_date
  const termination_date = req.body.termination_date

  const sqlInsert = "INSERT INTO polls(title, start_date, termination_date) VALUES (?,?,?)"
  db.query(sqlInsert, [title, start_date, termination_date], (err, result) => {
    console.log(result)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})