import React, { useState } from 'react'
import './join.css'
import logo2 from '../../img/logo2.png'
import { Link } from 'react-router-dom'

let user;
const sendUser = () => {
  //getting the user name from the input field of id join_input
  user = document.getElementById('join_input').value;
  //after passing to /chat site , making the input field empty -- (not mandetory)
  document.getElementById('join_input').value = "";

}

const Join = () => {

  const [name, setName] = useState("");
  // console.log(name);

  return (
    <div className="join_page">
      <div className="join_container">
        <img src={logo2} alt="logo" />
        <h1>iChat</h1>
        <input onChange={(event) => setName(event.target.value)} type="text" id='join_input' placeholder='enter your name' />
       <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat">      {/*   //for empty string or name */}
          <button className='join_btn' onClick={sendUser}>Login</button> 
        </Link>
      </div>
    </div>
  )
}

export default Join;
export { user }