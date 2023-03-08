import "./HomePage.css"
import {Link} from "react-router-dom";


export default function HomePage({user, setUser}) {
    return (
        <>
        <div id="homePageContainer">
            <div id="title">TOGETHER NOW</div>
            <div id="tagline">
                <p>be a better </p>
                <div id="carousel">
                    <span>friend</span>
                    <span>sibling</span>
                    <span>partner</span>
                    <span>child</span>
                    <span>parent</span>
                </div>
            </div>

            <div id="subtitle"> a tool to help manage social relationships & keep track of commitments</div>

        </div>
      </>
    )
}