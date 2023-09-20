import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ];

  const initialVotes = new Array(anecdotes.length).fill(0); // Initialize votes array with zeros

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  const mostVotes = Math.max(...votes)
  const mostAnecdote = votes.indexOf(mostVotes)

  return (
    <div>
      <p style={{fontWeight: 'bold', fontSize: 24}}>Anecdote of the day</p>
      <div>{anecdotes[selected]}</div>
      <p>Has {votes[selected]} votes</p>
      <div>
        <button onClick={handleNextAnecdote}>Next Anecdote</button>
        <button onClick={handleVotes}>Vote</button>
      </div>
      <p style={{fontWeight: 'bold', fontSize: 24}}>Anecdote with most votes</p>
      <div> {anecdotes[mostAnecdote]} </div>
      <p>Has {votes[mostAnecdote]} votes</p>
    </div>
  )
}

export default App;

