import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/NavBar/NavBar';
import CommitmentDetails from '../CommitmentDetails/CommitmentDetails';
import CommitmentsList from '../CommitmentsList/CommitmentsList';
import PeopleList from '../PeopleList/PeopleList';
import PersonDetails from '../PersonDetails/PersonDetails';
import Calendar from '../Calendar/Calendar';
import NotFound from '../NotFound/NotFound';

export default function App() {
  const [ user, setUser ] = useState(getUser())

  return (
    <main className="App">
        { 
          user ?
            <> 
              <NavBar user={user} setUser={setUser}/>
              <Routes>
                <Route path="/" element={<HomePage user={user}/>} />
                <Route path="/commitments" element={<CommitmentsList user={user}/>} />
                <Route path="/commitments/:id" element={<CommitmentDetails user={user}/>} />
                <Route path="/people" element={<PeopleList user={user} />} />
                <Route path="/people/:id" element={<PersonDetails user={user} />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          :
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthPage setUser={setUser}/>} />
            </Routes>
            
        }
    </main>
  );
}


