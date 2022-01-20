const express = require("express"); // Access
const socket = require("socket.io");

const app=express();

app.use(express.static("public"))


let port = process.env.PORT || 5000;
let server=app.listen(port,()=>{
    console.log("listening to port " + port);
});

let io=socket(server);

io.on("connection",(socket)=>{
    console.log("Made socket connection");
    //RECEIVED DATA
    socket.on("beginPath",(data)=>{
        //now transfer data to all servers
        io.sockets.emit("beginPath",(data));
    })
    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",(data));
    })
    socket.on("redoUndo",(data)=>{
        io.sockets.emit("redoUndo",(data));
    })
    
})