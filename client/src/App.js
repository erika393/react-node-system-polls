import React, { useEffect, useState } from "react"
import "./App.css";
import Routes from './routes.js'

function App() {
  return (
    <section>
      <Routes/>
    </section>
  )
  /*
  const [title, setTitle] = useState("")
  const [start_date, setStart_date] = useState("")
  const [termination_date, setTermination_date] = useState("")

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data)
    })
  }, [])

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      title: title,
      start_date: start_date,
      termination_date: termination_date
    }).then(() => {
      alert('successful')
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input type="text" name="title" onChange={(e) => { setTitle(e.target.value) }} />
          <input type="text" name="start_date" onChange={(e) => { setStart_date(e.target.value) }} />
          <input type="text" name="termination_date" onChange={(e) => { setTermination_date(e.target.value) }} />
          <button type="submit" onClick={submitReview}>Submit</button>
        </form>


      </header>
    </div>
  )
  */
}
export default App;