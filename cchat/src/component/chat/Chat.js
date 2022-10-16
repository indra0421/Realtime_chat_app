import React, { useEffect, useState } from 'react'
import { user } from '../join/Join'
import socketIo, { connect } from 'socket.io-client'
import './chat.css'
import sendLogo from '../../img/sendLogo.png'
// import SendIcon from '@mui/icons-material/Send';
import Message from '../message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../img/closeIcon.png'


const ENDPOINT = "http://localhost:4500/";

let socket;

const Chat = () => {

  const [id, setId] = useState("");
  const [messages, setmessages] = useState([]);


  const send = () => {
    const message = document.getElementById("chat_input").value;
    socket.emit('message', { message, id });
    document.getElementById("chat_input").value = "";
  }


  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      alert('Connected');
      setId(socket.id);
    })

    //joined -- custom event
    //.emit means sending data from client to server
    socket.emit('joined', { user });


    socket.on('welcome', (data) => {
      console.log(data.user, data.message);
      setmessages([...messages, data]);
    })

    socket.on('userJoined', (data) => {
      console.log(data.user, data.message);
      setmessages([...messages, data]);
    })

    socket.on('leave', (data) => {
      console.log(data.user, data.message);
      setmessages([...messages, data]);
    })

    return () => {
      socket.emit('disConnect');
      socket.off();
    }

  }, []);


  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log(data.user, data.message, data.id);
      setmessages([...messages, data]);
    })

    return () => {
      socket.off();
    }
  }, [messages]);

  return (
    <div className="chat_page">
      <div className="chat_container">
        <div className="chat_header">
          <h2>Welcome to iChat</h2>
          <a href="/"><img src={closeIcon} alt="close" /></a> 
        </div>
        <ReactScrollToBottom className="chat_box">
          {
            messages.map((item, ind) => <Message
              user={item.id === id ? '' : item.user}
              message={item.message}
              classs={item.id === id ? 'right' : 'left'} />)
          }

        </ReactScrollToBottom>
        <div className="input_box">
          <input onKeyPress={(e) => e.key == 'Enter' ? send() : null} type="text" id='chat_input' placeholder='type your text here ...' />
          <button className='send_btn' onClick={send}>
            <img src={sendLogo} alt="Send" />
          </button>

        </div>

      </div>
    </div>
  )
}

export default Chat