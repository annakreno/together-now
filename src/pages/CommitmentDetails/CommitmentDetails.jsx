import {useParams, useNavigate, Link } from "react-router-dom"
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
            const myCommitment = profile.commitments.find(commitment => commitment._id === id);
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

    function getPerson(personId) {
        const person = people.find(person => person._id == personId)
        return person.name
    }
    
    return (
        <div className="detailsPageWrapper">
            
                <div className="detailsContainer">

                    <div className="pageTitle"> { commitment.name }:</div>
                    <div className="details">

                        <div>
                            <div className="labelContentDivs" id="location">
                                <label >location:</label>
                                <div>{ commitment.location }</div>
                            </div>

                            <div className="labelContentDivs" id="starts">
                                <label>starts: </label>
                                <div>{ commitment.start }</div>
                            </div>

                            <div className="labelContentDivs" id="ends">
                                <label>ends:</label>
                                <div>{ commitment.end }</div>
                            </div>
                            
                            <div className="labelContentDivs" id="status">
                                <label>status:</label>
                                <div>{ commitment.flexible }</div>
                            </div>
                        </div>

                        <div>
                            <div className="labelContentDivs" id="with">
                                <label>with:</label>
                                <div>
                                {
                                commitment.people ? commitment.people.map(
                                    (personId, idx) => <Link key={idx} to={`/people/${personId}`}><li>{getPerson(personId)}</li></Link>)
                                : <></>
                                }   
                                </div>
                            </div>
                            
                            <div className="labelContentDivs" id="notes">
                                <label>notes:</label>
                                <div>{ commitment.notes }</div>
                            </div>
                        </div> 

                    </div>
                    <div class="deleteButton" id="commitmentDeleteBtn"><button onClick={handleDelete}>Delete</button></div>
                </div>

                <div className="btnsWrapper">
                    <EditCommitmentForm id={id} commitment={commitment} setCommitment={setCommitment} people={people} user={user}/>
                    { commitment.error ? <p>{commitment.error}</p> : <></> }
                </div>
                    
                
                
        </div>
    )
}

 