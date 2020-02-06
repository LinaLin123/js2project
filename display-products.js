// TODO:
// Ge feedback till user att något har lagts till i korgen

// TO DO:
// - backticks istället för konkatination

// connect to HTML-document
let body = document.querySelector("body")
let dispDiv = document.getElementById("dispProd")

if( localStorage.length == 0 ) {
  console.log("local storage empty")
} else {
  console.log("local storage exist");
}

// display products with dropdown to choose from
fetch( 'products.json' )
.then( prods => prods.json() )
.then( prods => showProducts( prods ) )

function showProducts( products ){
  updateCart()
  for(let i = 0; i < 10; i++){
    let imageAddress = products["id"+i].image
    let name = products["id"+i].name
    let description = products["id"+i].description
    let price = products["id"+i].price
    let prodId = "id"+i

    // create div for each product with product info, select and submitbtn
    dispDiv.innerHTML += 
    "<div id='" + prodId + "' class='prod card'> "+
      "<img src='" + imageAddress + "' class='prodImg card-img-top'>" +
      "<div class='card-body'>" +
        "<h3 id='" + prodId + "name' class='card-title'>" + name + "</h3>" + 
        "<p class='card-text'>" + description + "</p>" +
        "<h5 class='card-subtitle mb-2 text-muted'>" + price + " sek</h5>"+
        "<select id='" + prodId + "select' class='custom-select'>" + 
          "<option value='0'>Number of tickets</option>" +
          "<option value='1'>1</option>" +
          "<option value='2'>2</option>" +
          "<option value='3'>3</option>" +
          "<option value='4'>4</option>" +
          "<option value='5'>5</option>" +
        "</select><br><br>" +
        "<button type='submit' class='btn btn-primary' id='" + prodId + "btn'>Add to basket</button>" +
      "<span id='"+prodId+"span'></span></div>" +
    "</div>"
  }
  addListnerToBtn()
}

// gör en addEventListner som reagerar på knapp tryck
function addListnerToBtn(){
  let allBtns = document.querySelectorAll("button")

  allBtns.forEach( btn => {
    btn.addEventListener('click',function(){ 
      let eId = this.parentElement.children[0].innerHTML
      eId = this.parentElement.parentElement.id
      let eSelectVal = this.parentElement.children[3].value
      eSelectVal = parseInt(eSelectVal)
      let eSpan = eId + "span"

      // either set an amount for the first time or add together with previous amount
      if( localStorage.getItem(eId) == null || parseInt(localStorage.getItem(eId)) == 0 ){
        localStorage.setItem( eId, eSelectVal )
      } else {
        let eTickets = localStorage.getItem(eId)
        eTickets = parseInt(eTickets)
        let eNewTicketSum = eSelectVal + eTickets
        localStorage.setItem( eId, eNewTicketSum )
      }
      // feedback to user
      if(eSelectVal === 1){
        document.getElementById(eSpan).innerHTML = "Added 1 ticket to cart"
        console.log("Added 1 ticket to cart")
      } else if(eSelectVal === 0){
        console.log("No tickets were added to cart")
      } else {
        console.log("Added " + eSelectVal + " tickets to cart" )
      }
      // reset button value
      this.parentElement.children[3].value  = 0
        updateCart()
    })
  })
}

window.addEventListener('storage', function(e) {  
  console.log('Woohoo, someone changed my localstorage va another tab/window!');
});

function updateCart(){
  let sum = 0
  if(localStorage.length > 0) {
  for( let i = 0; i < localStorage.length; i++ ){
    sum += parseInt(localStorage.getItem(localStorage.key(i)))
  }
}
  document.getElementById("updateCart").innerHTML = " (" + sum + ")"
}