import { Link } from "react-router-dom";

export default function PeopleList({people, setPeople}) {
    return (
        <div className="pageContainer">
        <div className="pageTitle">My People:</div>
        <div id="addComponent" className="listComponent"> + </div>
        {
            people.map((person, id) =>
                <Link to={`/people/${id}`} key={id}>
                    <div className="listComponent" person={person}> {person} </div>
                </Link>
            )
        }
        </div>
    )
}


