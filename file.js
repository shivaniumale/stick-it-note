if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
  }
let count=Number(window.localStorage.getItem("count"))
if(!count){
    window.localStorage.setItem("count","0")
}

function createNote(noteTitle,noteBody){
    //count +=1
    document.getElementById("no-notes").classList.add("hidden")
    let li=document.createElement("li")
    let a=document.createElement("a")
    let h2=document.createElement("h2")
    let p=document.createElement("p")
    let xbutton=document.createElement("button")
    xbutton.classList.add("delete")

    let xT=document.createTextNode("X")
    let h2TN=document.createTextNode(noteTitle)
    let pTN=document.createTextNode(noteBody)
    h2.appendChild(h2TN)
    p.appendChild(pTN)
    xbutton.appendChild(xT)
    a.appendChild(h2)
    a.appendChild(xbutton)
    a.appendChild(p)
    a.setAttribute("href","#")
    li.appendChild(a)
    document.getElementById("notes").appendChild(li)
    

}
function removeItem(e){

     if(e.target.classList.contains("delete")){
         if(confirm("Are u sure?")){
             let li=e.target.parentElement.parentElement
             let ui=document.getElementById("notes")
             ui.removeChild(li)
         }
     }
     count -=1
     window.localStorage.setItem("count",count);
     window.localStorage.removeItem( e.target.parentElementSibling.innerText)
     if(count<1){
         document.getElementById("no-notes").className=""
     }
}
function createNoteFromInput(e){
    e.preventDefault();
    let noteTitle=document.getElementById("new-note-title-input").value
    let noteBody=document.getElementById("new-note-body-input").value

    document.getElementById("new-note-title-input").value=""
    document.getElementById("new-note-body-input").value=""
    count+=1
    window.localStorage.setItem("count",count)
    while(window.localStorage.getItem(noteTitle)){
        noteTitle+=" -1"
    }
    window.localStorage.setItem(noteTitle,noteBody)

    createNote(noteTitle,noteBody)
}
for ( i=0;i<count;i++){
    let title=window.localStorage.key(i)
    let bodyT=window.localStorage.getItem(title)
    if(title!== "count" && title){
    createNote(title,bodyT)
    }

} 
document.getElementById("inputForm").addEventListener("submit",createNoteFromInput,false)
document.getElementById("notes").addEventListener("click",removeItem)