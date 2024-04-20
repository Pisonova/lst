import logo from './logo.svg';
import './App.css';
import Login from './Login'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => (
  <div>Hello, Kaja</div>
)

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
