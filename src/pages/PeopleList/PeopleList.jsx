import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import NewPersonForm from "../../components/NewPersonForm/NewPersonForm";
import * as commitmentsAPI from "../../utilities/commitments-api"

export default function PeopleList({user}) {
    const [people, setPeople ] = useState([])
    const [commitments, setCommitments] = useState([])

    useEffect(function() {
        async function getMyData() {
            const profile = await commitmentsAPI.getAll();
            setPeople(profile.people);
            setCommitments(profile.commitments);
        };
        getMyData();
    }, []);

    function getCommitment(commitmentId) {
        const commitment = commitments.find(commitment => commitment._id == commitmentId)
        return commitment.name
    }
    
    

    return (
        <div className="pageContainer">
            <div className="pageTitle">My People:</div>

            <div className="listComponentsContainer">
    
                <NewPersonForm user={user} commitments={commitments} people={people} setPeople={setPeople} setCommitments={setCommitments}/>
                
                {
                    people ?
                        people.map((person) =>
                            <Link to={`/people/${person._id}`} key={person._id}>
                                <div className="listComponent">
                                    <div>{person.name}</div>
                                    <div className="listCompDetailsWrapper">
                                        <div>Commitments: 
                                        {
                                            person.commitments ? person.commitments.map(
                                                (commitmentId, idx) => <li key={commitmentId}>{getCommitment(commitmentId)}</li>)
                                            : <></>
                                        }
                                        </div>
                                        <div>Birthday: { person.birthday }</div>
                                        <div>Anniversary: { person.anniversary }</div>
                                        <div>Address: { person.address }</div>
                                        <div>Gift Ideas: { person.giftIdeas } </div>
                                        <div>Notes: { person.notes }</div>
                                        <div>Category: { person.category }</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    : <p>no people added</p>
                }

            </div>
        
        </div>
    )
}


