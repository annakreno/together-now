import {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import * as commitmentsAPI from "../../utilities/commitments-api";
import * as peopleAPI from "../../utilities/people-api";
import EditPersonForm from "../../components/EditPersonForm/EditPersonForm";

export default function PersonDetails() {
    const [ person, setPerson ] = useState([])
    const [commitments, setCommitments ] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const [ upcomingCommitmentsArray, setUpcomingCommitmentsArray] = useState([]);

    useEffect(function() {
        async function getMyData() {
            const profile = await commitmentsAPI.getAll();
            const myPerson = profile.people.find(person => person._id == id);
            setPerson(myPerson);
            setCommitments(profile.commitments);
        };
        getMyData();

        
    }, []);

    useEffect(function() {
        function getUpcomingCommitments() {
            if (person.commitments) {
                person.commitments.forEach(commitmentId => {
                    const eachCommitment = commitments.find(commitment => commitment._id == commitmentId)
                    setUpcomingCommitmentsArray([...upcomingCommitmentsArray, eachCommitment])
                })
            } 
        };
        getUpcomingCommitments();
    }, []);

    async function handleDelete () {
        if (window.confirm('Are you sure you wish to delete this person?')) try {
            const deletedConfirm = await peopleAPI.deletePerson(id);
            console.log(deletedConfirm)
            navigate("/people")
        } catch {
            person.error = "Failed to Delete - Try Again"
        }
    }

    function getCommitment(commitmentId) {
        const commitment = commitments.find(commitment => commitment._id == commitmentId)
        return commitment.name
    }

    return (
        <div className="detailsPageWrapper">

            <div className="detailsContainer">

                <div className="pageTitle">{ person.name }:</div>
                <div className="details">

                    <div>
                        <div className="labelContentDivs">
                            <label>Birthday:</label>
                            <div>{ person.birthday }</div>
                        </div>
                        <div className="labelContentDivs">
                            <label>Anniversary:</label>
                            <div>{ person.anniversary }</div>
                        </div>
                        <div className="labelContentDivs">
                            <label>Address:</label>
                            <div>{ person.address }</div>
                        </div>
                        <div className="labelContentDivs">
                            <label>Gift Ideas:</label>
                            <div>{ person.giftIdeas }</div>
                        </div>
                        <div className="labelContentDivs">
                            <label>Category:</label>
                            <div>{ person.category }</div>
                        </div>
                    </div>

                    <div>
                        <div className="labelContentDivs">
                            <label>Commitments:</label>
                            <div>
                                {
                                person.commitments ? person.commitments.map(
                                    (commitmentId, idx) => <Link key={idx} to={`/commitments/${commitmentId}`}><li>{getCommitment(commitmentId)}</li></Link>)
                                : <></>
                                }
                            </div>
                        </div>
                        <div className="labelContentDivs">
                            <label>Notes:</label>
                            <div>{ person.notes }</div>
                        </div>
                    </div>

                    <div className="deleteButton"><button onClick={ handleDelete }>Delete</button></div>

                </div>
            </div>

            <div className="btnsWrapper">
                <EditPersonForm id={id} person={person} setPerson={setPerson} commitments={commitments} />
                { person.error ? <p>{person.error}</p> : <></> }
            </div>
            
        </div>
    )
}


    
    

    
