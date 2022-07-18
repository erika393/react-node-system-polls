import React, { useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import "../../App.css";
import Axios from "axios"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

//add component do fontawesome

export default function Vote() {
    const [optionId, setOptionId] = useState(null)
    const [descriptionPoll, setDescriptionPoll] = useState("")
    const [optionsList, setOptionsList] = useState([])
    const [option, setOption] = useState({})
    const [poll, setPoll] = useState({})

    const { pollId } = useParams()

    const history = useHistory()

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/options/read/${pollId}`).then((response) => {
            setOptionsList(response.data)
        }, pollId)
        loadTitlePoll(pollId)
    }, [])

    const loadTitlePoll = (pollId) => {
        Axios.get(`http://localhost:3001/api/poll/read/${pollId}`).then((response) => {
            setPoll(response.data[0])
        })
    }

    const redirectPage = () => {
        history.push(`/`)
    }

    const vote = (pollId, optionId) => {
        Axios.get(`http://localhost:3001/api/options/read/${optionId}/${pollId}`).then((response => {
            setOption(response.data[0])
        }))

        Axios.put(`http://localhost:3001/api/vote/${optionId}`, {
            name: option.name,
            id_poll: pollId,
            votes: (option.votes) + 1,
        })
        //history.push("/")
    }

    return (
        <section>
            <Modal isOpen="true">
                <ModalHeader>
                    <h5 className="modal-title">{poll.title}</h5>
                </ModalHeader>
                <ModalBody>
                    <h4>{descriptionPoll}</h4>
                    <select class="form-select select-vote form-select-lg" aria-label=".form-select-lg select-vote" value={optionId} onChange={e => setOptionId(e.target.value)}>
                        <option value="" disabled selected>Select a Option</option>
                        {optionsList.map((op) => {
                            return (
                                <option value={op.id}>{op.name} (<span>{op.votes}</span> votes)</option>
                            )
                        })}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-secondary" onClick={() => redirectPage()}>Cancel</button>
                    <button type="button" class="btn btn-primary" onClick={() => vote(pollId, optionId)}>Vote</button>
                </ModalFooter>
            </Modal>
        </section>

    )
} 