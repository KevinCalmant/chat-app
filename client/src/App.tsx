import { useState } from 'react'
import io from 'socket.io-client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Chat } from "./pages";

const socket = io('http://localhost:4000');

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home socket={socket}/>}></Route>
            <Route path="/chat" element={<Chat socket={socket}/>}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
