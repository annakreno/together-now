import "./NewCommitmentForm.css";
import {useState} from "react";

const people = [{name: "Mom"}, {name: "Dad"}]

export default function NewCommitmentForm({setCommitments}) {
    const [formDetails, setFormDetails] = useState({
        name: "",
        start: "",
        end: "",
        people: [],
        location: "",
        notes: "",
        flexible: "",
    })

    function handleChange(evt){
        setFormDetails(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log("evt", evt.target.body)
    }

    return (
        <div id="addComponent" className="listComponent">+
            <div className='commitmentFormContainer'>
                <form onSubmit={handleSubmit}>
                    <h2>New Commitment:</h2>
                
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
                        <select name="people" value={formDetails.people} onChange={handleChange} multiple>
                            {
                                people ? 
                                people.map((person, idx) => <option value={person.name} key={idx}>{person.name}</option>)
                                : <option value="none">none added</option> 
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
                            <option value="suggested">Suggested</option>
                            <option value="loosely committed">Loosely Committed</option>
                            <option value="committed">Committed</option>
                            <option value="booked">Booked</option>
                        </select>
                    </div>
                  
                    <button type="submit">Add</button>

                </form>
                
                
            </div>
        Add
        </div>
      );
}