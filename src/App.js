import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/container/Home'
import About from '../src/container/About'
import Navbar from './components/Navbar/navbar'

const App = () => {
  return(
      <div className="App">
        <Router>
          <header>
            <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
          </header>
          <Navbar />
          <Routes>
              <Route exact path="/"  element={<Home />}></Route>
              <Route path="/about"  element={<About />}></Route> 
          </Routes>
        </Router>
    </div>
  );   
}
export default App

