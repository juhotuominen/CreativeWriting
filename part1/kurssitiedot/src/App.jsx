const Header = (props) => {
  return(props.course)
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]}/>
      <br/>
      <Part part={props.parts[1]}/>
      <br/>
      <Part part={props.parts[2]}/>
    </div>
  )
}
const Total = (props) => {
  return("Total excercices: " + (props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises))
}
const Part = (props) => {
  return(props.part.name + ": " + props.part.exercises)
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
      <Header course={ course.name } />
      <br/>
      <Content parts={ course.parts }/>
      <br/>
      <Total parts={ course.parts }/>
    </div>
  )
}

export default App
