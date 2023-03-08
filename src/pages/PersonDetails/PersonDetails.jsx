import {useParams} from "react-router-dom";

export default function PersonDetails({people}) {
    const { id } = useParams();
    return (
        <div className="pageContainer">
            { people[id] }
        </div>)
}

