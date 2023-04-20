const Header = (props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Content = () => {
  return(
    <div>
      <Part content = 'Fundamentals of React' exercise = {10} ></Part>
      <Part content = 'Using props to pass data' exercise = {7} ></Part>
      <Part content = 'State of a component' exercise = {14} ></Part>
    </div>
  )
}

const Part = (props) => {
  return(
   <div>
       <p>{props.content} {props.exercise}</p>
     </div>
  )
 }

const Total = () => {
  return(
    <div>
      <p>Total exercises: {10 + 7 + 14}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Header course = "Half Stack application development"></Header>
      <Content ></Content>
      <Total></Total>
    </div>
  )
}

export default App
