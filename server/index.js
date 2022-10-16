const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const port = 4500 || process.env.PORT; // setting port 8000 or after hosting it will choose automatically 
const app = express();

const users = [{}];

app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Hell it's is working</h1>")
})


const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
    console.log("new connection");
    //getting the data from client -- socket.emit('joined' ,{user : user})
    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`);
        //broadacast means execpt that user everyone can see the joining message
        socket.broadcast.emit("userJoined", { user: 'Admin', message: `${users[socket.id]} has joined` });
        socket.emit('welcome', { user: "Admin", message: `welcome to the chat ${users[socket.id]}` });
    })

    //for texting 
    socket.on('message', ({ message, id }) => {

        io.emit("sendMessage", { user: users[id], message, id })

    })

    //when someone will disconnect the chat
    socket.on('disConnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
        console.log('user left');
    })


})

server.listen(port, () => {
    console.log(`server is working on ${port}`);
})
