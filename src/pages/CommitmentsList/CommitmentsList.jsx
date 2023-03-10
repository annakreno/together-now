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

    return (
        <div className="pageContainer">
            <div className="pageTitle">My Commitments:</div>
            <div className="listComponentsContainer">
                <NewCommitmentForm commitments={commitments} setCommitments={setCommitments} user={user} people={people}/>
                {
                    commitments ? 
                    commitments.map((commitment, idx) =>
                        <Link to={`/commitments/${commitment._id}`} key={idx}>
                            <div className="listComponent" commitment={commitment} key={commitment._id}>
                                <div className="listCompDetailsWrapper">
                                    <div>{ commitment.name }</div>
                                    <div>with: { commitment.people }</div>
                                    <div>starts: { commitment.start }</div>
                                    <div>ends: { commitment.end }</div>
                                    <div>location: { commitment.location }</div>
                                    <div>notes: { commitment.notes } </div>
                                    <div>status: { commitment.flexible }</div>
                                </div>
                            </div>
                        </Link>
                    ) 
                    : <></>
                }
            </div>
        </div>
    )
}



