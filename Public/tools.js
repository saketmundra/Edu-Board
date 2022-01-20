let toolscont=document.querySelector(".tools-cont")
let optionscont=document.querySelector(".options-cont");
let pencilcont=document.querySelector(".pencil-tool");
let erasercont=document.querySelector(".eraser-tool-cont");
let pencil=document.querySelector(".pencil")
let eraser=document.querySelector(".eraser")
let sticky=document.querySelector(".sticky")
let upload=document.querySelector(".upload")

let optionsFlag=true;
let pencilFlag=false;
let eraserFlag=false;


optionscont.addEventListener("click",(e)=>{
    optionsFlag=!optionsFlag;
    if(optionsFlag) opentools();
    else closetools();
})
function opentools(){
    let iconelem=optionscont.children[0];
    iconelem.classList.remove("fa-bars");
    iconelem.classList.add("fa-times");
    toolscont.style.display="flex"

}
function closetools(){
    let iconelem=optionscont.children[0];
    iconelem.classList.remove("fa-times");
    iconelem.classList.add("fa-bars");
    toolscont.style.display="none"
    pencilcont.style.display="none"
    erasercont.style.display="none"
}

pencil.addEventListener("click",(e)=>{
    pencilFlag=!pencilFlag;
    if(pencilFlag){
        pencilcont.style.display="block"
    }
    else{
        pencilcont.style.display="none"
    }
})
eraser.addEventListener("click",(e)=>{
    eraserFlag=!eraserFlag;
    if(eraserFlag){
        erasercont.style.display="flex"
    }
    else{
        erasercont.style.display="none"
    }
})

upload.addEventListener("click", (e)=>{
    //open file exp
    let input =document.createElement("input");
    input.setAttribute("type","file")
    input.click();

    input.addEventListener("change",(e)=>{
        let file=input.files[0];
        let url =URL.createObjectURL(file);

        let StickyCont=document.createElement("div");
        StickyCont.setAttribute("class", "sticky-cont");
        StickyCont.innerHTML = `
        <div class="header-cont">
            <div class="remove"></div>
            <div class="minimize"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>

    `;
    document.body.appendChild(StickyCont)

    let minimize=StickyCont.querySelector(".minimize");
    let remove=StickyCont.querySelector(".remove");
    noteActions(minimize, remove,StickyCont);

    StickyCont.onmousedown = function (event) {
        dragAndDrop(StickyCont, event);
    };

    StickyCont.ondragstart = function () {
        return false;
    };
    })

    
    
})

sticky.addEventListener("click", (e)=>{
    let StickyCont=document.createElement("div");
    StickyCont.setAttribute("class", "sticky-cont");
    StickyCont.innerHTML = `
    <div class="header-cont">
            <div class="remove"></div>
            <div class="minimize"></div>
        </div>
        <div class="note-cont">
            <textarea spellcheck="false" ></textarea>
        </div>

    `;
    document.body.appendChild(StickyCont)

    let minimize=StickyCont.querySelector(".minimize");
    let remove=StickyCont.querySelector(".remove");
    noteActions(minimize, remove,StickyCont);

    StickyCont.onmousedown = function (event) {
        dragAndDrop(StickyCont, event);
    };

    StickyCont.ondragstart = function () {
        return false;
    };
    
})

function noteActions(minimize, remove,StickyCont){
    remove.addEventListener("click", (e)=>{
        StickyCont.remove();
    })
    minimize.addEventListener("click", (e)=>{
        let notecont=StickyCont.querySelector(".note-cont");
        let display=getComputedStyle(notecont).getPropertyValue("display");
        if(display==="none") notecont.style.display="block";
        else notecont.style.display="none";
        
    })

}


function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}