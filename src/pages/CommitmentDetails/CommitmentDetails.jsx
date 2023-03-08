import {useParams} from "react-router-dom"

export default function CommitmentDetails({commitments}) {
    const {id} = useParams();
    return (
        <div className="pageContainer">
            { commitments[id] }
        </div>)
}