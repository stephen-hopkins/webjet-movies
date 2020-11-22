import React from "react";
import "./App.css";
import MoviesList from "./components/MoviesList/MoviesList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MoviesList />
      </header>
    </div>
  );
}

export default App;
