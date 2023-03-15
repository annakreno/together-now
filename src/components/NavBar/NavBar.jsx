import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 
import {useLocation} from "react-router-dom";

export default function NavBar({ user, setUser }) {
    const location = useLocation();

    const activeLinkClass = function(path) {
            if (location.pathname === path) { 
                return 'active'
            } 
            else if (location.pathname.slice(0,12) === path ) {
                return 'active'
            } 
            else if (location.pathname.slice(0,7) === path) {
                return 'active'
            } 
            else {
                return ''
            }
      };

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return ( 
        <>
            <div className='navContainer'>
                
                <div className='navLogo' id="navLogo">TOGETHER NOW</div>
                
                <div className="welcomeUser">Welcome, {user ? user.name : ""}!</div>

                <div className="navLinks"><Link to="/commitments" id="navCommitmentsLink" className={activeLinkClass('/commitments')}>my commitments</Link></div>
                
                <div className="navLinks"><Link to="/people"  id="navPeopleLink" className={activeLinkClass('/people')}>my people</Link></div>
                
                <div className="navLinks"><Link to="/calendar" id="navCalendarLink" className={activeLinkClass('/calendar')}>my calendar</Link></div>
                
                <div className="navLogout"><Link to="" onClick={handleLogOut} id="navLogoutLink">log out</Link></div>
        
            </div>
        </>
    )
}