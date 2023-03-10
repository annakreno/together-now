import {useParams} from "react-router-dom"
import {useState, useEffect } from "react";
import EditCommitmentForm from "../../components/EditCommitmentForm/EditCommitmentForm";
import * as commitmentsAPI from '../../utilities/commitments-api';

export default function CommitmentDetails({user}) {
    const [commitment, setCommitment ] = useState({})
    const [ people, setPeople ] = useState([])
    const { id } = useParams();

    useEffect(function() {
        async function getMyData() {
            const profile = await commitmentsAPI.getAll();
            const myCommitment = profile.commitments.filter(commitment => commitment._id == id )[0];
            setCommitment((myCommitment));
            setPeople(profile.people);
        };
        getMyData();
    }, [commitment]);

    return (
        <div className="detailsPageContainer">
            <div className="pageTitle"> About { commitment.name }:</div>
            <EditCommitmentForm commitment={commitment} people={people} user={user}/>
            <div className="detailsContainer">
                    <div>with: { people } </div>
                    <div>starts: { commitment.start }</div>
                    <div>ends: { commitment.end }</div>
                    <div>location: { commitment.location }</div>
                    <div>notes: { commitment.notes }</div>
                    <div>status: { commitment.flexible }</div>
                </div>
        </div>
    )
}