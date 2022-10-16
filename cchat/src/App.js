import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import socketIO, { connect } from "socket.io-client"
import { Route, Routes } from 'react-router-dom'

import Join from './component/join/Join';
import Chat from './component/chat/Chat';

function App() {

  return (

    <div className="App">

      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />


      </Routes>

    </div>

  );
}

export default App;
