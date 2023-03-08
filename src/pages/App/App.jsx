import './App.css';
import { useState} from 'react'
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
  const [ commitments, setCommitments ] = useState([
    "Play with Lali & Ian", 
    "Dinner with Mom & Dad", 
    "Jenna & David Visit", 
    "Drinks with Matt & Zoe", 
    "Call Ben", 
    "Trip to Philly to see Elliot",
    "Trey's wedding", 
    "Bake anniversary cake",
  ])
  const [people, setPeople] = useState(["Zach", "Jenna", "Andrew", "Mom", "Dad", "Elliot", "Elena", "Trey"])

  return (
    <main className="App">
      { 
        user ?
          <> 
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/commitments" element={<CommitmentsList commitments={commitments} setCommitments={setCommitments}/>} />
              <Route path="/commitments/:id" element={<CommitmentDetails commitments={commitments} setCommitments={setCommitments} />} />
              <Route path="/people" element={<PeopleList people={people} setPeople={setPeople}/>} />
              <Route path="/people/:id" element={<PersonDetails people={people} setPeople={setPeople}/>} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}


