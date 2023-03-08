import { Link } from "react-router-dom";

export default function CommitmentsList({commitments, setCommitments}) {
    return (
        <div className="pageContainer">
            <div className="pageTitle">My Commitments:</div>
            <div id="addComponent" className="listComponent"> + </div>
            {
                commitments.map((commitment, id) =>
                <Link to={`/commitments/${id}`}>
                    <div className="listComponent" commitment={commitment} key={commitment}> {commitment} </div>
                </Link>
                )
            }
        </div>
    )
}



