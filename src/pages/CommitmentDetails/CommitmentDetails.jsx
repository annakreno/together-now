import {useParams, useNavigate} from "react-router-dom"
import {useState, useEffect } from "react";
import EditCommitmentForm from "../../components/EditCommitmentForm/EditCommitmentForm";
import * as commitmentsAPI from '../../utilities/commitments-api';

export default function CommitmentDetails({user}) {
    const [commitment, setCommitment ] = useState({})
    const [ people, setPeople ] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(function() {
        async function getMyData() {
            const profile = await commitmentsAPI.getAll();
            const myCommitment = profile.commitments.find(commitment => commitment._id == id);
            setCommitment(myCommitment);
            setPeople(profile.people);
        };
        getMyData();
    }, []);

    async function handleDelete() {
        if (window.confirm('Are you sure you wish to delete this commitment?')) try {
            const deletedConfirm = await commitmentsAPI.deleteCommitment(id);
            console.log(deletedConfirm)
            navigate("/commitments")
        } catch {
            commitment.error = "Failed to Delete - Try Again"
        }
    }

    return (
        <div className="detailsPageContainer">
            <div className="pageTitle"> About { commitment.name }:</div>
            <EditCommitmentForm id={id} commitment={commitment} setCommitment={setCommitment} people={people} user={user}/>
            <div className="detailsContainer">
                <div>with: { people } </div>
                <div>starts: { commitment.start }</div>
                <div>ends: { commitment.end }</div>
                <div>location: { commitment.location }</div>
                <div>notes: { commitment.notes }</div>
                <div>status: { commitment.flexible }</div>
            </div>
            <button onClick={handleDelete}>Delete</button>
            { commitment.error ? <p>{commitment.error}</p> : <></> }
        </div>
    )
}