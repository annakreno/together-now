import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Link } from "react-router-dom"

export default function AuthPage({ setUser }) {
    return (
        <div className='pageContainer' id="authPageContainer">
            <div id="loginLinkWrapper"><Link to="/" id="backToHomeLink">back to home</Link></div>
            <div id="loginComponentsWrapper">
                <SignUpForm setUser={setUser} />
                <LoginForm setUser={setUser} />
            </div>
        </div>
    )
}