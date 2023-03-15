import { Link } from "react-router-dom";
import {useState, useEffect } from "react";
import * as commitmentsAPI from '../../utilities/commitments-api';
import NewCommitmentForm from "../../components/NewCommitmentForm/NewCommitmentForm"

export default function CommitmentsList({ user }) {
    const [commitments, setCommitments ] = useState([])
    const [ people, setPeople ] = useState([])

    useEffect(function() {
        
        async function getMyData() {
            const profile = await commitmentsAPI.getAll();
            setCommitments(profile.commitments);
            setPeople(profile.people);
        };
        getMyData();
    }, []);

    function getPerson(personId) {
        const person = people.find(person => person._id == personId)
        return person.name
    }

    return (
        <div className="pageContainer">
            <div className="listComponentsContainer">
                <NewCommitmentForm commitments={commitments} setCommitments={setCommitments} user={user} people={people}/>
                {
                    commitments ? 
                    commitments.map((commitment, idx) =>
                        <div className="listComponentWrapper" key={idx}>
                            
                                <div className="cardTitle">{ commitment.name }</div>
                                <div className="listComponentDetails">
                                    <div className="labelDivContainer">
                                        <label>location:</label>
                                        <div>{ commitment.location } </div>
                                    </div>
                                    <div className="labelDivContainer">
                                        <label>date/time:</label>
                                        <div> { commitment.start }</div>
                                    </div>
                                    <div className="labelDivContainer">
                                        <label>with:</label>
                                        <div>
                                            {
                                            commitment.people ? commitment.people.map(
                                                (personId, idx) => <li key={idx}>{getPerson(personId)}</li>)
                                            : <></>
                                            }
                                        </div>
                                    </div>
                                    <div className="labelDivContainer">
                                        <label>status:</label>
                                        <div>{ commitment.flexible }</div>
                                    </div>
                                </div>
                                <Link className="commitmentDetailsLink" to={`/commitments/${commitment._id}`}> Go To Details </Link>
                        </div>
                    ) 
                    : <></>
                }
            </div>
        </div>
    )
}



