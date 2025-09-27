import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js" //firebase connected
import { getDatabase,
        ref,
        push,
        onValue,
        remove} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js" //database connection

const firebaseConfig = {
   databaseURL: "https://leads-tracker-app-fc41a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


//this function is now dynamic and can be used on
function render(leads){
    let listItems = " "
    for(let i=0; i< leads.length; i++){
        listItems += `
                <li>
                    <a target = '_blank' href='${leads[i]}'> 
                        ${leads[i]} 
                    </a>
                </li>`
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB,function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues) //transform object to array
        render(leads)

    } else {
        ulEl.innerHTML = ""
    }
  
} )
  
// Add a double-click event listener
deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
   
})

inputBtn.addEventListener("click", function() {
     if (inputEl.value){
        push(referenceInDB, inputEl.value) //adding all the leads you enter in the input area
        inputEl.value = "" //for empty input
     }
}) 



