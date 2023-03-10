import { useState, useEffect } from 'react'
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
import * as commitmentsAPI from "../../utilities/commitments-api";

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [commitments, setCommitments] = useState([]);
  const [people, setPeople] = useState([{name: "Mom", _id: 1},{name: "Dad", _id: 2}, {name: "add later" , _id: 0}])

  return (
    <main className="App">
      { 
        user ?
          <> 
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<HomePage user={user}/>} />
              <Route path="/commitments" element={<CommitmentsList commitments={commitments} setCommitments={setCommitments} user={user} people={people}/>} setPeople={setPeople}/>
              <Route path="/commitments/:id" element={<CommitmentDetails user={user}/>} />
              <Route path="/people" element={<PeopleList people={people} setPeople={setPeople} user={user} commitments={commitments}/>} />
              <Route path="/people/:id" element={<PersonDetails people={people} setPeople={setPeople} user={user} commitments={commitments}/>} />
              <Route path="/calendar" element={<Calendar commitments={commitments} people={people}/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}


