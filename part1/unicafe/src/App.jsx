import { useState } from 'react'

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props.statistics;

  if (all > 0){
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive " value={positive} />
        </tbody>
      </table>
    )
  }
  else{
    return (
      <p>No feedback given</p>
    )
  }
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
)

const Button = (props) => {
  return(
    <button style={{backgroundColor: props.color}} onClick={props.onClick}> {props.text} </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = (good + neutral + bad)
  const average = ((good - bad) / all)
  const positive = (good / all * 100)
  
  return (
    <div>
      <p style={ {fontWeight: "bold", fontSize: 24} }>Give feedback</p>
      <Button onClick = {() => setGood(good +1)} text="Good" color="green"/>
      <Button onClick = {() => setNeutral(neutral +1)} text="Neutral" color="yellow"/>
      <Button onClick = {() => setBad(bad +1)} text="Bad" color="red"/>
      <p style={ {fontWeight: "bold", fontSize: 24} }>Statistics</p>
      <Statistics statistics={{ good, neutral, bad, all, average: isNaN(average) ? 0 : average, positive: isNaN(positive) ? 0 : positive }}/>
    </div>
  )
}

export default App
