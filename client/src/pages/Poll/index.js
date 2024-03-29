import Axios from "axios"
import React, { useState } from "react"
import { useHistory, Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import Error from '../../components/Error'
import Success from '../../components/Success'

export default function Poll() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [start_date, setStart_date] = useState("")
    const [termination_date, setTermination_date] = useState("")
    const [countClick, setCountClick] = useState(1)
    const [optionsList, setOptionsList] = useState([])
    const [currentOption, setCurrentOption] = useState("")
    const ReactDOM = require('react-dom')

    const history = useHistory()

    const error = <Error />
    const success = <Success />

    const handleChangeOption = () => {
        if (currentOption.length < 2) {
            alert("the option must be at least 2 characters long")
        } else {
            setOptionsList([
                ...optionsList,
                currentOption
            ])
        }
        setCurrentOption("")
    }

    async function submitPoll(){
        var id_poll;
        //setCountClick(countClick + 1)
        //console.log(countClick)

        if(start_date > termination_date){
            alert("Start Date cannot be less the end date!")
        }else if(optionsList.length < 3){
            alert("Add at least 3 options!")
        }else{
            await Axios.post(`http://localhost:3001/api/poll/create`, {
                title: title,
                description: description,
                start_date: start_date,
                termination_date: termination_date
            })

            Axios.get("http://localhost:3001/api/poll/readLast").then((response) => {
                id_poll = (response.data[0]).id
                console.log(id_poll)
                optionsList.map((op) => {
                    console.log(id_poll)
                    Axios.post(`http://localhost:3001/api/options/create`, {
                        name: op,
                        id_poll: id_poll
                    })
                })
            })
            history.push("/")
        }
        
    }

    return (
        <Modal isOpen="true" id="modalCreatePoll">
            <form class="form">
                <ModalHeader>
                    <h5 class="modal-title">Create Poll</h5>
                </ModalHeader>
                <ModalBody>
                    <fieldset>
                        <legend class="fs-6 fw-bold">About the Poll</legend>
                        <div class="m-2">
                            <label for="name" class="form-label">Title:</label>
                            <input  type="text" class="form-control" name="title" onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                        <div class="m-2">
                            <label for="name" class="form-label">Description:</label>
                            <input  type="text" class="form-control" name="description" onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <div class="date-group row">
                            <div class="m-2 col">
                                <label for="startDate" class="form-label">Start Date:</label>
                                <input  type="date" class="form-control" name="startDate" onChange={(e) => { setStart_date(e.target.value) }} />
                            </div>
                            <div class="m-2 col">
                                <label for="terminationDate" class="form-label">Termination Date:</label>
                                <input  type="date" class="form-control" name="terminationDate" onChange={(e) => { setTermination_date(e.target.value) }} />
                            </div>
                        </div>
                    </fieldset>
                    <hr />
                    <fieldset>
                        <legend class="fs-6 fw-bold">About the Options</legend>
                        <div class="options">
                            <h6 class="text-muted">Write at least 3 answer options</h6>
                            <div class="row">
                                <div class="col">
                                    <label class="form-label" for="option">Name Option</label>
                                    <input  type="text" class="form-control" name="option" minLength="2" value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}></input>
                                    <button type="button" onClick={handleChangeOption} className="rounded-pill bg-warning border border-warning text-white mt-2">Send Option</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </ModalBody>
                <ModalFooter>
                    <Link class="btn btn-secondary" to="/">Cancel</Link>
                    <Link type="submit" class="btn btn-primary" onClick={submitPoll}>Create</Link>
                </ModalFooter>
            </form>
        </Modal>
    )
}