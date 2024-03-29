import {useState} from "react";
import { useNavigate } from "react-router-dom";
import * as commitmentsAPI from '../../utilities/commitments-api';

export default function EditCommitmentForm({id, commitment, setCommitment, people}) {
    // const navigate = useNavigate();
    const [formDetails, setFormDetails] = useState({
        name: commitment.name,
        start: commitment.start,
        end: commitment.end,
        people: [],
        location: commitment.location,
        notes: commitment.notes,
        flexible: commitment.flexible,
    })

    function handleChange(evt) {
        setFormDetails({...formDetails,
            [evt.target.name]: evt.target.value,
    });
    };

    function handleSelect(evt) {
        const newFormDetails = {...formDetails}
        newFormDetails.people.push(evt.target.value)
        setFormDetails(newFormDetails);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formData = {
                _id: id,
                name: formDetails.name, 
                start: formDetails.start,
                end: formDetails.end,
                people: formDetails.people, 
                location: formDetails.location, 
                notes: formDetails.notes, 
                flexible: formDetails.flexible,
            }
            const updatedCommitment = await commitmentsAPI.updateCommitment(formData);
            setCommitment(updatedCommitment)
            setFormDetails({
                name: "",
                start: "",
                end: "",
                people: [],
                location: "",
                notes: "",
                flexible: "",
            })
            
        } catch {
            setFormDetails({ ...formDetails, error: 'Failed To Update - Try Again' });
        }
    }

    return(
        <div className="editComponentWrapper">
                    <div className="pageTitle">Edit: {commitment.name}</div>
                    <form className="editItemForm" onSubmit={handleSubmit}>
                        <div className="formInputDiv">
                            <label>Name: </label>
                            <input name="name" value={formDetails.name} onChange={handleChange} default={formDetails.name}></input>
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
                            <select name="people" value={formDetails.people} onChange={handleSelect} multiple={true}>
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
                            <textarea name="notes" value={formDetails.notes} onChange={handleChange}>{formDetails.notes}</textarea>
                        </div>

                        <div className="formInputDiv">
                            <label>Status: </label>
                            <select name="flexible" value={formDetails.flexible} onChange={handleChange} default={formDetails.flexible}>
                                <option value="none selected"> </option>
                                <option value="suggested">Suggested</option>
                                <option value="loosely committed">Loosely Committed</option>
                                <option value="committed">Committed</option>
                                <option value="booked">Booked</option>
                            </select>
                        </div>
                    
                        <div className="buttonDiv">
                            <button type="submit">Update</button>
                        </div>
                    </form>
                    {formDetails.error ? <p>{formDetails.error}</p> : <></>}
        </div>
    )
}