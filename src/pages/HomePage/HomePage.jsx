import "./HomePage.css"
import {Link} from "react-router-dom";

export default function HomePage({user}) {
    return (
        <>
        <div id="homePageContainer">
            { !user ? <Link to="/login">Log In</Link> : ""}
            <div id="title">TOGETHER NOW</div>
            <div id="tagline">
                <div id="carouselContainer">be a better
                    <div id="carousel">
                        <span>relative</span>
                        <span>friend</span>
                        <span>partner</span>
                        <span>sibling</span>
                        <span>relative</span>
                    </div>
                </div>
            </div>

            <div id="subtitle"> a tool to help manage social relationships & keep track of commitments</div>

        </div>
      </>
    )
}