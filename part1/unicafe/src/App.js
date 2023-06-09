import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      {(good + neutral + bad) === 0 ?
        <p>No feedback given</p> :
        <>
          <h1>Statistics</h1>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={good + neutral + bad} />
              <StatisticLine text="average" value={(good + -1 * bad) / (good + neutral + bad)} />
              <StatisticLine text="positive" value={100 * good / (good + neutral + bad)} />
            </tbody>
          </table>
        </>}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => {
        const newGood = good + 1
        setGood(newGood)
      }} />
      <Button text="neutral" handleClick={() => {
        const newNeutral = neutral + 1
        setNeutral(newNeutral)
      }} />
      <Button text="bad" handleClick={() => {
        const newBad = bad + 1
        setBad(newBad)
      }} />
      <br />
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App