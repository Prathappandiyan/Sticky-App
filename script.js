const containerelement=document.getElementById("container");
const btnadd=document.getElementsByClassName("btn-add")[0]


function getappstorage(){
    return JSON.parse(localStorage.getItem('prathap') ||"[]");
}

getappstorage().forEach(element=> {
    const textelement=createtextelement(element.id,element.content);
    containerelement.insertBefore(textelement,btnadd);

});

function createtextelement(id,content){
    const textelement=document.createElement('textarea');
    textelement.classList.add('sticky');
    textelement.value=content;
    textelement.placeholder='Enter Your Notes'
    

    textelement.addEventListener("change",()=>{
        updatenote(id,textelement.value);

    })

    textelement.addEventListener("dblclick",()=>{
        const check=confirm("Are you sure to delete?");
        if(check){
            deletenotes(id,textelement);
        }

    })

    return textelement;

}
///add new sticky
function addsticky(){
    const notes=getappstorage();
    const notesObject={
        id:Math.floor(Math.random()*100000),
        content:""
    }
    const textelement= createtextelement(notesObject.id,notesObject.content)
    containerelement.insertBefore(textelement,btnadd);
    notes.push(notesObject)
    savenotes(notes)
}

btnadd.addEventListener('click',()=>addsticky())

function savenotes(notes){
    localStorage.setItem("prathap",JSON.stringify(notes))
}

function updatenote(id,content){
    const notes=getappstorage();
    const updateElement=notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    savenotes(notes);
    
}

function deletenotes(id,textelement){
    const notes=getappstorage().filter((note)=>note.id!=id);
    savenotes(notes);
    containerelement.removeChild(textelement)
    
}


