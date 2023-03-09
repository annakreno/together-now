import { Link } from "react-router-dom";
import {useState, useEffect } from "react";
import * as commitmentsAPI from '../../utilities/commitments-api';
import NewCommitmentForm from "../../components/NewCommitmentForm/NewCommitmentForm"

export default function CommitmentsList() {
    const [commitments, setCommitments] = useState([]);

    useEffect(function() {
        async function getMyCommitments() {
            const myCommitments = await commitmentsAPI.getAll();
            setCommitments(myCommitments);
        };
        getMyCommitments();
    }, [commitments]);

    return (
        <div className="pageContainer">
            <div className="pageTitle">My Commitments:</div>
            <div className="listComponentsContainer">
                <NewCommitmentForm setCommitments={setCommitments}/>
                {
                    commitments.map((commitment, idx) =>
                        <Link to={`/commitments/${JSON.stringify(commitment)}`} key={idx}>
                            <div className="listComponent" commitment={commitment} key={commitment._id}>
                                <div className="listCompDetailsWrapper">
                                    <div>{ commitment.name }</div>
                                    <div>with: { commitment.people }</div>
                                    <div>starts: { commitment.startDateTime }</div>
                                    <div>ends: { commitment.endDateTime }</div>
                                    <div>location: { commitment.location }</div>
                                    {/* <div>notes: { commitment.notes }</div> */}
                                    <div>status: { commitment.flexible }</div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}



