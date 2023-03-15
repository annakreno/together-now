import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../utilities/users-service'

export default function SignUpForm() {
  const [user, setUser] = useState()
  const [signUpForm, setSignUpForm ] = useState(
    {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
  })
  const navigate = useNavigate()
  const disable = signUpForm.password !== signUpForm.confirm;

  function handleChange(evt) {
    setSignUpForm({...signUpForm,
      [evt.target.name]: evt.target.value,
      error: ''
    })
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = {
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password
      }
      const user = await signUp(formData)
      setUser(user)
      navigate("/commitments")
    } catch {
      setSignUpForm({...signUpForm, error: 'Sign Up Failed - Try Again' })
    }
  }

  return (
      <div>
        <div className="auth-form-container" id="sign-up-form-container">
          <div className='componentTitle'>Sign Up:</div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className='inputDiv'>
              <label>Name</label>
              <input type="text" name="name" value={signUpForm.name} onChange={handleChange} required />
            </div>
            <div className='inputDiv'>
              <label>Email</label>
              <input type="email" name="email" value={signUpForm.email} onChange={handleChange} required />
            </div>
            <div className='inputDiv'>
              <label>Password</label>
              <input type="password" name="password" value={signUpForm.password} onChange={handleChange} required />
            </div>
            <div className='inputDiv'>
              <label>Confirm</label>
              <input type="password" name="confirm" value={signUpForm.confirm} onChange={handleChange} required />
            </div>
            <div className="button"><button type="submit" disabled={disable}>SIGN UP</button></div>
          </form>
        </div>
        <p className="error-message">&nbsp;{signUpForm.error}</p>
      </div>
  )

}
