const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map(part =>
        <p key={part.name}>{part.name} {part.exercises}</p>
      )}
    </div>
  )
}

const Total = (props) => {
  let numExercises = 0
  props.parts.map(part =>
    numExercises += part.exercises
  );

  return (
    <p>Number of exercises {numExercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App