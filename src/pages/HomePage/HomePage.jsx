import {Link} from "react-router-dom";

export default function HomePage({user}) {
    return (
        <>
        <div id="homePageContainer">
            { !user ? <div id="loginLinkWrapper"><Link to="/login" id="loginLink">log  in</Link></div> : <></>}
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

            {/* <div id="subtitle"> a tool to help manage social relationships & keep track of commitments</div> */}

            <div className="outer" id="dotsAnimationWrapper">
                <div id="heart"></div>
                <div className="dot" id="dot1"> </div>
                <div className="dot" id="dot2"> </div>
                <div className="dot" id="dot3"> </div>
                <div className="dot" id="dot4"> </div>
                <div className="dot" id="dot5"> </div>
                <div className="dot" id="dot6"> </div>
                <div className="dot" id="dot7"> </div>
                <div className="dot" id="dot8"> </div>
                <div className="dot" id="dot9"> </div>
                <div className="dot" id="dot10"> </div>
                <div className="dot" id="dot11"> </div>
                <div className="dot" id="dot12"> </div>
                <div className="dot" id="dot13"> </div>
                <div className="dot" id="dot14"> </div>
                <div className="dot" id="dot15"> </div>
            </div>

        </div>
      </>
    )
}