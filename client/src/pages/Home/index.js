import React, { useEffect, useState } from "react"
import { useHistory, Link } from 'react-router-dom'
import "../../App.css";
import Axios from "axios"

//add component do fontawesome

export default function Home() {
    const [pollList, setPollList] = useState([])
    const [filter, setFilter] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const history = useHistory()

    useEffect(() => {
        Axios.get("http://localhost:3001/api/poll/read").then((response) => {
            setPollList(response.data)
        })
    }, [])

    const vote = (pollId) => {
        history.push(`vote/${pollId}`)
    }

    const see = (pollId) => {
        history.push(`details/${pollId}`)
    }

    const dateFormat = (date) => {
        return (new Date(date)).toLocaleDateString()
    }

    const progress = (start_date, termination_date) => {
        var datestart = new Date(start_date)
        var datetermination = new Date(termination_date)

        if (datestart > new Date()) {
            return "Pendent"
        } else if (datetermination > new Date()) {
            return "Open"
        } else if (datetermination < new Date()) {
            return "Finished"
        }
    }

    const voteController = (progressReturn) => {
        if (progressReturn == "Pendent" || progressReturn == "Finished") {
            return true
        }
        return false
    }

    const searchPoll = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const dataReturn = pollList.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            })
            setFilter(dataReturn)
        } else {
            setFilter(pollList)
        }
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Poll System</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link">Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/poll/new" className="nav-link">Create Poll</Link>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input id="searchInput" className="form-control me-2" type="search" placeholder="Search a Poll..." aria-label="Search" onChange={(e) => searchPoll(e.target.value)} />
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
            <br /><br />
            {(searchInput.length > 0) ? (
                <table className="table table-striped w-75 text-center border border-1 m-auto">
                    <caption>Registered Polls</caption>
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Termination Date</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.title}</td>
                                    <td>{dateFormat(val.start_date)}</td>
                                    <td>{dateFormat(val.termination_date)}</td>
                                    <td><div id="progressPoll">{progress(val.start_date, val.termination_date)}</div></td>
                                    <td><button id="voteBtn" type="button" className="vote-btn btn btn-warning rounded-pill me-3" disabled={voteController(progress(val.start_date, val.termination_date))} onClick={() => vote(val.id)}><i className="fa-solid fa-hand-point-up me-1"></i>
                                        Vote</button>
                                        <button id="seeBtn" type="button" className="see-btn btn btn-primary rounded-pill" onClick={() => see(val.id)}><i className="fa-solid fa-eye me-1"></i>
                                            See</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <table className="table table-striped w-75 text-center border border-1 m-auto">
                    <caption>Registered Polls</caption>
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Termination Date</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.title}</td>
                                    <td>{dateFormat(val.start_date)}</td>
                                    <td>{dateFormat(val.termination_date)}</td>
                                    <td><div id="progressPoll">{progress(val.start_date, val.termination_date)}</div></td>
                                    <td><button id="voteBtn" type="button" className="vote-btn btn btn-warning rounded-pill me-3" disabled={voteController(progress(val.start_date, val.termination_date))} onClick={() => vote(val.id)}><i className="fa-solid fa-hand-point-up me-1"></i>
                                        Vote</button>
                                        <button id="seeBtn" type="button" className="see-btn btn btn-primary rounded-pill" onClick={() => see(val.id)}><i className="fa-solid fa-eye me-1"></i>
                                            See</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}

        </div>
    )
} 