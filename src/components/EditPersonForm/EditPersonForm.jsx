import {useState} from "react";
import { useNavigate } from "react-router-dom";
import * as commitmentsAPI from '../../utilities/commitments-api';
import * as peopleAPI from '../../utilities/people-api'

export default function EditPersonForm({id, person, setPerson, commitments}) {
    // const navigate = useNavigate();
    const [formDetails, setFormDetails] = useState({
        name: "",
        commitments: [],
        birthday: "",
        anniversary: "",
        address: "",
        giftIdeas: "",
        notes: "",
        category: "",
    })

    function handleChange(evt) {
        setFormDetails({...formDetails,
            [evt.target.name]: evt.target.value,
        });
    };

    function handleSelect(evt) {
        const newFormDetails = {...formDetails}
        newFormDetails.commitments.push(evt.target.value)
        setFormDetails(newFormDetails);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formData = {
                _id: id,
                name: formDetails.name,
                commitments: formDetails.commitments,
                birthday: formDetails.birthday,
                anniversary: formDetails.anniversary,
                address: formDetails.address,
                giftIdeas: formDetails.giftIdeas,
                notes: formDetails.notes,
                category: formDetails.category,
            }
            const updatedPerson = await peopleAPI.updatePerson(formData);
            setPerson(updatedPerson)
            setFormDetails({
                name: "",
                commitments: [],
                birthday: "",
                anniversary: "",
                address: "",
                giftIdeas: "",
                notes: "",
                category: "",
            })
            
        } catch {
            setFormDetails({ ...formDetails, error: 'Failed To Update - Try Again' });
        }
    }

    return(
        <div className="editComponentWrapper">
             <div className="pageTitle">Edit: {person.name} </div>
                <form className="editItemForm" onSubmit={handleSubmit}>
                    <div className="formInputDiv">
                        <label>Name: </label>
                        <input name="name" value={formDetails.name} onChange={handleChange}></input>
                    </div>
                   
                    <div className="formInputDiv">
                        <label>Birthday: </label>
                        <input name="birthday" value={formDetails.birthday} onChange={handleChange}></input>
                    </div>
                    
                    <div className="formInputDiv">
                        <label>Anniversary: </label>
                        <input name="anniversary" value={formDetails.anniversary} onChange={handleChange}></input>
                    </div>
                   
                    <div className="formInputDiv">
                        <label>Commitments: </label>
                        <select name="commitments" value={formDetails.commitments} onChange={handleSelect} multiple={true} >
                            {
                                commitments.length ? 
                                commitments.map((commitment, idx) => <option value={commitment._id} key={idx}>{commitment.name}</option>)
                                : <option>None Added</option>
                            }
                        </select>
                    </div>

                    <div className="formInputDiv">
                        <label>Address: </label>
                        <input name="address" value={formDetails.address} onChange={handleChange}></input>
                    </div>

                    <div className="formInputDiv">
                        <label>Gift Ideas: </label>
                        <textarea name="giftIdeas" value={formDetails.giftIdeas} onChange={handleChange}></textarea>
                    </div>
                   
                    <div className="formInputDiv">
                        <label>Notes: </label>
                        <textarea name="notes" value={formDetails.notes} onChange={handleChange}></textarea>
                    </div>

                    <div className="formInputDiv">
                        <label>Category: </label>
                        <select name="category" value={formDetails.category} onChange={handleChange}>
                            <option value="none selected"> </option>
                            <option value="friend">Friend</option>
                            <option value="family">Family</option>
                            <option value="professional">Professional</option>
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