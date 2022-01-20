
let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let pencilcolor=document.querySelectorAll('.pencil-color');
let pencilwidthelem=document.querySelector('.pencil-width-main');
let eraserwidthelem=document.querySelector('.eraser-width-main');
let download=document.querySelector('.download')
let redo=document.querySelector('.redo')
let undo=document.querySelector('.undo')


let pencolor="black";
let eraserColor="white";
let penWidth=pencilwidthelem.value;
let eraserWidth=eraserwidthelem.value;

let undoRedoTracker=[];//data
let track=0; //represent which data

let mousedown=false;


//api
let tool=canvas.getContext('2d');

//style the canvas
tool.strokeStyle=pencolor;
tool.lineWidth=penWidth;

//mousedown-> start new path, mousemove -> path fill
canvas.addEventListener("mousedown",(e) => {
    mousedown=true;
    let data={
        x:e.clientX,
        y:e.clientY
    }
    socket.emit("beginPath",data)
})
canvas.addEventListener("mousemove",(e) => {
    if(mousedown) {
        let data={
        x:e.clientX,
        y:e.clientY,
        color: eraserFlag ? eraserColor : pencolor,
        width: eraserFlag ? eraserWidth : penWidth
        }
        socket.emit("drawStroke",data)
    }
})
canvas.addEventListener("mouseup",(e) => {
    mousedown=false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1
})

undo.addEventListener("click",(e)=>{
    if(track>0) track--;
    let data={
        trackvalue:track,
        undoRedoTracker
    }
    socket.emit("redoUndo",data)
})
redo.addEventListener("click",(e)=>{
    if(track<undoRedoTracker.length-1)track++;
    let data={
        trackvalue:track,
        undoRedoTracker
    }
    socket.emit("redoUndo",data)
})

function undoredocanvas(trackobj){
    track=trackobj.trackvalue;
    undoRedoTracker=trackobj.undoRedoTracker

    let url=undoRedoTracker[track]
    let img=new Image();
    img.src=url;
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height)
    }
}



function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilcolor.forEach((colorElement) => {
    colorElement.addEventListener("click",(e) => {
        let color=colorElement.classList[0];
        pencolor =color;
        tool.strokeStyle=pencolor;
    })
})

pencilwidthelem.addEventListener("change",(e) => {
    penWidth=pencilwidthelem.value;
    tool.lineWidth=penWidth;
})
eraserwidthelem.addEventListener("change",(e) => {
    eraserWidth=eraserwidthelem.value;
    tool.lineWidth=eraserWidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})
download.addEventListener("click",(e)=>{
    let url=canvas.toDataURL();
    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpeg";
    a.click();
})


socket.on("beginPath",(data) => {
    beginPath(data);
})
socket.on("drawStroke",(data) => {
    drawStroke(data);
})
socket.on("redoUndo",(data) => {
    undoredocanvas(data);
})



