import {useState} from "react";
import * as commitmentsAPI from '../../utilities/commitments-api';

export default function EditCommitmentForm({commitment, people, user}) {
    const [formDetails, setFormDetails] = useState({
        name: commitment.name,
        start: commitment.start,
        end: commitment.end,
        people: commitment.people,
        location: commitment.location,
        notes: commitment.notes,
        flexible: commitment.flexible,
        error: "",
    })
    function handleChange() {
        alert('changed')
    }

    function handleSelect() {
        alert('selected')
    }

    function handleSubmit() {
        alert('submitted')
    }

    return(
        <div className="editComponent"> Edit
                <div className='commitmentFormContainer'>
                    <h2>New Commitment:</h2>
                    <form className="editCommitmentForm" onSubmit={handleSubmit}>
                        <div className="formInputDiv">
                            <label>Name: </label>
                            <input name="name" value={formDetails.name} onChange={handleChange}></input>
                        </div>
                    
                        <div className="formInputDiv">
                            <label>Starts: </label>
                            <input name="start" value={formDetails.start} onChange={handleChange}></input>
                        </div>
                        
                        <div className="formInputDiv">
                            <label>Ends: </label>
                            <input name="end" value={formDetails.end} onChange={handleChange}></input>
                        </div>
                    
                        <div className="formInputDiv">
                            <label>People: </label>
                            <select name="people" value={formDetails.people} onChange={handleSelect} multiple={true} >
                                {
                                    people ? 
                                    people.map((person, idx) => <option value={person._id} key={idx}>{person.name}</option>)
                                    : <option>None Added</option>
                                }
                            </select>
                        </div>

                        <div className="formInputDiv">
                            <label>Location: </label>
                            <input name="location" value={formDetails.location} onChange={handleChange}></input>
                        </div>
                    
                        <div className="formInputDiv">
                            <label>Notes: </label>
                            <textarea name="notes" value={formDetails.notes} onChange={handleChange}></textarea>
                        </div>

                        <div className="formInputDiv">
                            <label>Status: </label>
                            <select name="flexible" value={formDetails.flexible} onChange={handleChange}>
                                <option value="none selected"> </option>
                                <option value="suggested">Suggested</option>
                                <option value="loosely committed">Loosely Committed</option>
                                <option value="committed">Committed</option>
                                <option value="booked">Booked</option>
                            </select>
                        </div>
                    
                        <div className="buttonDiv">
                            <button type="submit">Add</button>
                        </div>
                    </form>
                    <p>{formDetails.error}</p>
                </div>
            + -
        </div>
    )
}