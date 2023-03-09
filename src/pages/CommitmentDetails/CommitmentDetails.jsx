import {useParams} from "react-router-dom"

export default function CommitmentDetails() {
    const { id } = useParams();
    const commitment = JSON.parse(id)
    const people = commitment.people
    function formatDate(date) {
        console.log(date)
    }
    const startDateTime = "5pm"
    const endDateTime = "7pm"
    return (
        <div className="pageContainer">
            <div className="detailsContainer">
                <div>{ commitment.name }</div>
                <div>with: { people }</div>
                <div>starts: { startDateTime }</div>
                <div>ends: { endDateTime }</div>
                <div>location: { commitment.location }</div>
                <div>notes: { commitment.notes }</div>
                <div>status: { commitment.flexible }</div>
            </div>
            
        </div>)
}




