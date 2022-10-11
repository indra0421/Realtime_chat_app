// node server whill handle socket io connections
const io = require('socket.io')(8000);

const users = {};
//io.on is a socket.io instance -- that listen so many socekt connections (different users req)
//socket.on -- handles particular one connection
io.on('connection', socket => {
    socket.on('new-user-joined', name => {        //accepting the user-joined event and performs 
        users[socket.id] = name;       //    -- set the names(input data) to user
        //if someone joined - execpt that person everyone can see the joining msg
        socket.broadcast.emit('user-joined', name);

    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    
})