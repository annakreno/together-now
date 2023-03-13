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
        <div className="detailsPageContainer">
            <div className="pageTitle"> About { person.name }:</div>

            <EditPersonForm id={id} person={person} setPerson={setPerson} commitments={commitments} />
            
            <div className="detailsContainer">
                <div>Birthday: { person.birthday }</div>
                <div>Anniversary: { person.anniversary }</div>
                <div>Address: { person.address }</div>
                <div>Gift Ideas: { person.giftIdeas } </div>
                <div>Notes: { person.notes }</div>
                <div>Category: { person.category }</div>
                <div> Commitments for {person.name}:
                    {
                        person.commitments ? person.commitments.map(
                            (commitmentId, idx) => <Link key={idx} to={`/commitments/${commitmentId}`}><li>{getCommitment(commitmentId)}</li></Link>)
                        : <></>
                    }
                </div>
            </div>

            <button onClick={ handleDelete }>Delete</button>
                { person.error ? <p>{person.error}</p> : <></> }
        </div>
    )
}


    
    

    
