// 1. connect to HTML-document
let body = document.querySelector("body") // get body-element from html
let dispDiv = document.getElementById("dispProd") // get display div

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

// 3. display products with dropdown to choose from
function showProducts( products ){

  // 4. checks if local storage is present, and update cart-total
  updateCart()

  // 5. use our product-json to display products with relevant information
  for(let i = 0; i < 10; i++){
    // 5.1 initalize variables with info needed to display product
    let imageAddress = products["id"+i].image
    let name = products["id"+i].name
    let description = products["id"+i].description
    let price = products["id"+i].price
    let prodId = "id"+i

    // 5.2 create div for each product with product info, select and submitbtn
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
      "<span class='feedback' id='"+prodId+"span'></span></div>" +
    "</div>"
  }
  // 6. add lister to submit button
  addListnerToBtn()
}

// 6. add lister to submit buttons and update local storage
function addListnerToBtn(){
  // 6.1 gets button element from html-document
  let allBtns = document.querySelectorAll("button")

  // 6.2 for all buttons 
  allBtns.forEach( btn => {
    // 6.3 add an eventlister for clicks
    btn.addEventListener('click',function(){ 
      // get id from parent element to see which element has been clicked
      let eId = this.parentElement.parentElement.id
      // get value from select-dropdown
      let eSelectVal = this.parentElement.children[3].value
      // convert string to number
      eSelectVal = parseInt(eSelectVal)
      // get current clicked span (to make displaying feedback of number of tickets possible)
      let eSpan = eId + "span"

      //  check if local storage is empty/or exist - and add a new sum of tickets
      // checks local storage with help of current id
      if( localStorage.getItem(eId) == null || parseInt(localStorage.getItem(eId)) == 0 ){
        localStorage.setItem( eId, eSelectVal )
      } // if local storage exist add new number of tickets to previous sum
      else {
        // get previous amount of tickets from local storage
        let eTickets = localStorage.getItem(eId)
        // convert string to number
        eTickets = parseInt(eTickets)
        // calculte new sum of tickets
        let eNewTicketSum = eSelectVal + eTickets
        // set new sum of tickets in local storage
        localStorage.setItem( eId, eNewTicketSum )
      }
      // show feedback to user via a span we get from the html-document, set added ticket value
      if(eSelectVal === 1){
        document.getElementById(eSpan).innerHTML = " Added 1 ticket to cart"
      } else if(eSelectVal === 0){
        document.getElementById(eSpan).innerHTML = " No tickets were added to cart"
      } else {
        document.getElementById(eSpan).innerHTML = " Added " + eSelectVal + " tickets to cart"
      }
      // remove feedback by setting innerHTML to "", after 1.2 seconds
      setTimeout(function (){
        document.getElementById(eSpan).innerHTML = ""
      }, 1200)
      // reset select value
      this.parentElement.children[3].value  = 0
      // update cart-sum in header
      updateCart()
    })
  })
}

// 4. checks if local storage is present, and update cart-total
function updateCart(){
  // 4.1 initialize sum in cart
  let sum = 0
  // if there is already items in cart, loop over local storage and set new sum
  if( localStorage.length > 0) {
    for( let i = 0; i < localStorage.length; i++ ){
      sum += parseInt( localStorage.getItem( localStorage.key(i) ) )
    }
  }
  // get element from html and show cart-sum
  document.getElementById("updateCart").innerHTML = " (" + sum + ")"
}