import './App.css';

const App = () => {

  const schedule = {
    title: "CS Courses for 2018-2019"
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>{schedule.title}</h1>
      </header>
    </div>
  );
};

export default App;
