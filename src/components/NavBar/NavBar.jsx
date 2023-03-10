import "./NavBar.css"
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return ( 
        <div className='navContainer'>
            
            <div className='navLogo'><Link to="/">TOGETHER NOW</Link></div>
            
            <div className="welcomeUser">Welcome, {user ? user.name : ""}!</div>

            <div className="navLinks"><Link to="/commitments">my commitments</Link></div>

            <div className="navLinks" id="commitmentNav"><Link to="/commitments/:id"></Link></div>
            
            <div className="navLinks"><Link to="/people">my people</Link></div>

            <div className="navLinks" id="personNav"><Link to="/people/:id"></Link></div>
            
            <div className="navLinks"><Link to="/calendar">my calendar</Link></div>
            
            <div className="navLogout"><Link to="" onClick={handleLogOut}>Log Out</Link></div>
    
        </div>
    )
}