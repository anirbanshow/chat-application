const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data');
const cors = require('cors');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();
const app = express();
app.use(express.json()); // accet json data
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome world');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("connection to socket.io");

    // Create a socket
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    // Create a socket
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined Room: " + room);
    });

    // Create a socket
    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) {
            return console.log("chat users not defined");
        }

        chat.users.forEach(user => {
            if (user._id === newMessageReceived.sender._id) return;
            console.log(newMessageReceived);
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
});