import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        {/* <Route path="/chat" element={<Chat/>} />  */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
