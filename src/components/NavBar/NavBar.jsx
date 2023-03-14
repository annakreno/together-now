import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return ( 
        <div className='navContainer'>
            
            <div className='navLogo' id="navLogo">TOGETHER NOW</div>
            
            <div className="welcomeUser">Welcome, {user ? user.name : ""}!</div>

            <div className="navLinks"><Link to="/commitments" id="navCommitmentsLink">my commitments</Link></div>
            
            <div className="navLinks"><Link to="/people"  id="navPeopleLink">my people</Link></div>
            
            <div className="navLinks"><Link to="/calendar" id="navCalendarLink">my calendar</Link></div>
            
            <div className="navLogout"><Link to="" onClick={handleLogOut} id="navLogoutLink">Log Out</Link></div>
    
        </div>
    )
}