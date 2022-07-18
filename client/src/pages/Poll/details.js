import Axios from "axios"
import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom';
import { useHistory, useParams } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

export default function Details() {
    const [optionsList, setOptionsList] = useState([])
    const [poll, setPoll] = useState({})
    const [totalVotes] = useState(null)

    const { pollId } = useParams()

    const history = useHistory()

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/options/read/${pollId}`).then((response) => {
            setOptionsList(response.data)
        }, pollId)
        loadPoll(pollId)
    }, [])

    const loadPoll = (pollId) => {
        Axios.get(`http://localhost:3001/api/poll/read/${pollId}`).then((response) => {
            setPoll(response.data[0])
        })
    }

    const progress = (start_date, termination_date) => {
        var datestart = new Date(start_date)
        var datetermination = new Date(termination_date)
        var timeElapsed = Date.now();
        var today = new Date(timeElapsed);

        console.log(datestart)
        console.log(datetermination)
        console.log(today)

        const progressnow = <p class="text-success">In progress, vote now!</p>
        const finished = <p class="text-danger">Already Finished!</p>
        const pendent = <p class="text-warning">Not Started!</p>

        if (datestart > new Date()) {
            ReactDOM.render(
                pendent,
                document.getElementById("progressPoll")
            )
        } else if (datetermination >  new Date()) {
            ReactDOM.render(
                progressnow,
                document.getElementById("progressPoll")
            )
        } else if (datetermination <  new Date()) {
            ReactDOM.render(
                finished,
                document.getElementById("progressPoll")
            )
        }
    }
    
    const dateFormat = (date) => {
        return (new Date(date)).toLocaleDateString()
    }

    const calculateVotes = (vote) => {
        var total = 0;
        var calculate = 0;
        optionsList.map((op) => {
            total += op.votes
        })

        calculate = (vote * 100) / total
        if(isNaN(calculate) || calculate == undefined){
            return 0
        }
        return (vote * 100) / total
    }

    const widthProgress = (vote) => {
        return calculateVotes(vote) + "%"
    }

    const redirectPage = () => {
        history.push('/')
    }

    return (
        <Modal isOpen="true">
            <ModalHeader>
                <h5 class="modal-title">Updated Result of <span>{poll.title}</span></h5>
            </ModalHeader>
            <ModalBody>
                <h4 class="text-center">{poll.description}</h4>
                <div>
                    <small className="text-muted">{totalVotes}</small>
                    {optionsList.map((op) => {
                            return (
                                <div class="vote-group mb-2">
                                    <small class="text-dark">{op.name}</small>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                            aria-valuemax="100" style={{width: widthProgress(op.votes)}}>{calculateVotes(op.votes)}%</div>
                                    </div>
                                    <small class="text-muted"><span>{op.votes}</span> votes</small>
                                </div>
                            )                        
                    })}
                </div>
                <div id="progressPoll">{progress(poll.start_date, poll.termination_date)}</div>
                <small>From {dateFormat(poll.start_date)} to {dateFormat(poll.termination_date)}</small>
            </ModalBody>
            <ModalHeader>
                <button className="btn btn-secondary" onClick={() => redirectPage()}>Come Back</button>
            </ModalHeader>
        </Modal>
    )
}