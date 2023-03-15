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
            <div className="listComponentsContainer">
                <NewPersonForm user={user} commitments={commitments} people={people} setPeople={setPeople} setCommitments={setCommitments}/>
                {
                    people ?
                    people.map((person, idx) =>
                        <div className="listComponentWrapper" key={idx}>

                            <div className="cardTitle">{person.name}</div>
                            <div className="listComponentDetails">

                                <div className="labelDivContainer">
                                    <label>Birthday:</label>
                                    <div>{ person.birthday }</div>
                                </div>
                                <div className="labelDivContainer">
                                    <label>Anniversary:</label>
                                    <div>{ person.anniversary }</div>
                                </div>
                                <div className="labelDivContainer">
                                    <label>Address:</label>
                                    <div>{ person.address }</div>
                                </div>
                                {/* <div className="labelDivContainer">
                                    <label>Gift Ideas:</label>
                                    <div>{ person.giftIdeas }</div>
                                </div> */}
                                {/* <div className="labelDivContainer">
                                    <label>Notes:</label>
                                    <div>{ person.notes }</div>
                                </div> */}
                                <div className="labelDivContainer">
                                    <label>Category:</label>
                                    <div>{ person.category }</div>
                                </div>
                                <div className="labelDivContainer">
                                    <label>Commitments:</label>
                                    <div>
                                    {
                                        person.commitments ? person.commitments.map(
                                            (commitmentId, idx) => <li key={commitmentId}>{getCommitment(commitmentId)}</li>)
                                        : <li>none</li>
                                    }
                                    </div>
                                </div>
                                
                            </div>
                            <Link className="commitmentDetailsLink" to={`/people/${person._id}`}> Go To Details </Link>
                            
                        </div>
                    )
                    : <p>no people added</p>
                    }
            </div>
        </div>
    )
}


