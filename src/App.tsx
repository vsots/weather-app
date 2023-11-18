import './App.css'

function App() {

  return (
    <>
      <div className="input">
        <h1>Find Your Weather</h1>
        <input type="text" readOnly={false} placeholder="Location"></input>
        <button>Search</button>
      </div>
    </>
  )
}

export default App
