const Header = (props) => {
    return (
      <p style={{ fontWeight: 'bold', fontSize: 35 }}> {props.header} </p>)
  };

  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => (
          <div key={part.id}>
            <Part part={part} />
            <br />
          </div>
        ))}
      </div>
    );
  };

  const Part = (props) => {
    return props.part.name + ': ' + props.part.exercises;
  };

  const Total = (props) => {
    return (
      <p style={{ fontWeight: 'bold' }}>
        {'Total exercises: ' +
          props.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    );
  };

  const Course = (props) => {
    return (
      <div className="course">
        <Header header={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    );
  };

  export default Course