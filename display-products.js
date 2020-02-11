// 1. connect to HTML-document
let dispDiv = document.getElementById("dispProd") // get display div
//global variabel 

// shows in console if local storage is empty or if it already exits
if( localStorage.length == 0 ) {
  console.log("local storage empty")
} else {
  console.log("local storage exist");
}

// 2. get product information from json-file
fetch( 'products.json' )  // get file
.then( prods => prods.json() )  // convert
.then( prods => showProducts( prods ) ) // use with our showProducts-function
//kallar funktionen och kör den med produktinformationen som hämtar från json, som argument prods

// Köra den i våra huvudfunktion. Samlar displayen för att lättare köra den flera gånger.
// 3. display products with dropdown to choose from
function showProducts( products ){ // parameter= products

  // 4. checks if local storage is present, and update cart-total
  updateCart()

  // 5. use our product-json to display products with relevant information
  for(let i = 0; i < 10; i++){
    // 5.1 initalize variables with info needed to display product från JSON
    let imageAddress = products["id"+i].image // ett nummer i taget alla variabel. products=JSOn file ["id"+i]=ex [id1] key.image
    let name = products["id"+i].name
    let description = products["id"+i].description
    let price = products["id"+i].price
    let prodId = "id"+i // skapar id till diven = id1, id2, sätta id i diven samma som produktens id i JSON


    //Använder variablerna inne i div innerhtml, underlätta att läsa. Varje div får unika id eftersom vi parar ihop id med produktens id. 
    // 5.2 create div for each product with product info, select and submitbtn
    dispDiv.innerHTML += 
    "<div id='" + prodId + "' class='prod card'> "+
      "<img src='" + imageAddress + "' class='prodImg card-img-top'>" +
      "<div class='card-body'>" +
        "<h3 id='" + prodId + "name' class='card-title'>" + name + "</h3>" + 
        "<p class='card-text'>" + description + "</p>" +
        "<h5 class='card-subtitle mb-2 text-muted'>" + price + " sek</h5>"+
        "<select id='" + prodId + "select' class='custom-select'>" + //        "<select id='" + prodId + "select' class='custom-select'>" +  ID PÅ SELECT för att veta vilken man kollar på.
          "<option value='0'>Number of tickets</option>" +
          "<option value='1'>1</option>" +
          "<option value='2'>2</option>" +
          "<option value='3'>3</option>" +
          "<option value='4'>4</option>" +
          "<option value='5'>5</option>" +
        "</select><br><br>" +
        "<button type='submit' class='btn btn-primary' id='" + prodId + "btn'>Add to basket</button>" +
      "<span class='feedback' id='"+prodId+"span'></span></div>" +
    "</div>"
  }
  // 6. add lister to submit button, den funktionen körs efter när man har ritat upp produkterna.
  addListnerToBtn()
}

// 6. add lister to submit buttons and update local storage
function addListnerToBtn(){
  // 6.1 gets button element from html-document
  let allBtns = document.querySelectorAll("button") //hämtar alla knappar

  // 6.2 for all buttons, som en array liknade lista.
  allBtns.forEach( btn => {
    // 6.3 add an eventlister for clicks
    btn.addEventListener('click',function(){ 
      // get id from parent element to see which element has been clicked, lokal variabel istället för global
      let eId = this.parentElement.parentElement.id //this=knapp .parentElement=div.parentElement=div.id=divs id, divs id var samma som produktID i JSON
      // get value from select-dropdown
      let eSelectVal = this.parentElement.children[3].value //       let eSelectVal = this=knappen.parentElement=div.children[3]=selecten.value=värdet som kunden har satt 

      // convert string to number
      eSelectVal = parseInt(eSelectVal) // gör värdet till nummer.

      // get current clicked span (to make displaying feedback of number of tickets possible)
      let eSpan = eId + "span" //Väljer aktuellt span.

      //  check if local storage is empty/or exist - and add a new sum of tickets
      // checks local storage with help of current id
      if( localStorage.getItem(eId) == null || parseInt(localStorage.getItem(eId)) == 0 ){ // Om id är null=tomt  eller om det är satt till 0.
        localStorage.setItem( eId, eSelectVal ) // sätter i local storage, inget värdet sedan tidigare. 
      } 
      
      // if local storage exist add new number of tickets to previous sum
      else {
        // get previous amount of tickets from local storage
        let eTickets = localStorage.getItem(eId) //Hämtar all gamal värdet från LS
        // convert string to number
        eTickets = parseInt(eTickets)
        // calculte NEW sum of tickets 
        let eNewTicketSum = eSelectVal + eTickets //eSelectVal=värdet som lägs till ökningen + eTickets = gamla värdet som fanns i gamla storage.
        // set new sum of tickets in local storage
        localStorage.setItem( eId, eNewTicketSum ) // lägger till nya värdet till LS. setItem skriver över den gamla 
      }

      // show feedback to user via a span we get from the html-document, set added ticket value
      if(eSelectVal === 1){
        document.getElementById(eSpan).innerHTML = " Added 1 ticket to cart" // en biljett! inte ticketssss
      } else if(eSelectVal === 0){ // om man inte har tryckt på knappen ska det synas att man inte lagt till någon ticket.
        document.getElementById(eSpan).innerHTML = " No tickets were added to cart"
      } else {
        document.getElementById(eSpan).innerHTML = " Added " + eSelectVal + " tickets to cart"
      }
      // remove feedback by setting innerHTML to "", after 1.2 seconds
      setTimeout(function (){ //inbyggd funktion setTimeout
        document.getElementById(eSpan).innerHTML = "" // lämnar tomt span.
      }, 1200) //1200 mms
      
      // reset select value
      this.parentElement.children[3].value  = 0 // dropdown nollställs.
      
      // 4. update cart-sum in header
      updateCart() // sumerar LS och carten. 
    })
  })
}

// 4. checks if local storage is present, and update cart-total
function updateCart(){
  // 4.1 initialize sum in cart
  let sum = 0 // skapa variabel som man kan skapa summa i. 

  // if there is already items in cart, loop over local storage and set new sum
  if( localStorage.length > 0) { //localStorage.length > 0 = om det finns något i LS

//om det finnns ska loopa över värderna och addera dem till total summa i Cart med korg
    for( let i = 0; i < localStorage.length; i++ ){ // loopar genom varje och hämtar.
      let keyId = localStorage.key(i) // hämtar nyckel = vår id. 
      
      sum += parseInt( localStorage.getItem( keyId ) ) // ex id0 localStorage.key(i) = en specifik nyckel. 
    }
  }
  // get element from html and show cart-sum
  document.getElementById("updateCart").innerHTML = " (" + sum + ")" // finns i html egen span. Skriver över (0) när det uppdateras. Det är därför man vill sätta sum=0. 
}