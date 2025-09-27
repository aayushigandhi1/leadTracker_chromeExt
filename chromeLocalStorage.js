//this is code where tabs are stored in local storage

let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveTabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))  //check if leads are then and parse thru js to create array of myLeads


// 1. Check if leadsFromLocalStorage is truthy
// 2. If so, set myLeads to its value and call renderLeads()
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

saveTabBtn.addEventListener("click", function(){
    //Grab url of any current tab
    chrome.tabs.query({active: true, currentWindow : true }, function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url) 
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })  
})

//this function is now dynamic and can be used on any array instead of only myLeads
function render(leads){
    let listItems = " "
    for(i=0; i< leads.length; i++){
    // listItems +=  "<li><a target = '_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
    listItems += `
            <li>
                <a target = '_blank' href='${leads[i]}'> 
                    ${leads[i]} 
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function() {
    
    myLeads.push(inputEl.value) //adding all the leads you enter in the input area
    inputEl.value = "" //for empty input
    // Save the myLeads array to localStorage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads) //calls the function and shows all leads in list
    console.log( localStorage.getItem("myLeads") )
}) 


// Add a double-click event listener
deleteBtn.addEventListener("dblclick", function() {
  console.log('Delete button double-clicked!')
  localStorage.clear()  //c;ears local storage
  myLeads = []   //deletes leads
  render(myLeads)  //clears DOM
})

