// 1. connect to HTML-document
let dispDiv = document.getElementById("dispProd") // get display div
//global variabel 

// 1.2 check if there is garbage in local storage and removes it
checkForGarbageInLocalStorage()

// 2. get product information from json-file
fetch( 'products.json' )
.then( prods => prods.json() ) 
.then( prods => showProducts( prods ) ) 

// 3. display products with dropdown to choose from
function showProducts( products ){

  // 4. checks if local storage is present, and update cart-total
  updateCart()

  // 5. use our product-json to display products with relevant information
  for(let i = 0; i < Object.keys(products).length; i++){
    let prodId = Object.keys(products)[i] 
    let imageAddress = products[prodId].image
    let name = products[prodId].name
    let description = products[prodId].description
    let price = products[prodId].price

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
  let allBtns = document.querySelectorAll("button")

  // 6.2 for all buttons
  allBtns.forEach( btn => {

    // 6.3 add an eventlister for clicks
    btn.addEventListener('click',function(){ 
      // get id from parent element to see which element has been clicked
      let eId = this.parentElement.parentElement.id
      // get value from select-dropdown
      let eSelectValue = this.parentElement.children[3].value

      // convert string to number
      eSelectValue = parseInt(eSelectValue) // gör värdet till nummer.

      // get current clicked span (to make displaying feedback of number of tickets possible)
      let eSpan = eId + "span" 

      // check if local storage is empty/or exist - and add a new sum of tickets
      if( localStorage.getItem(eId) == null || parseInt(localStorage.getItem(eId)) == 0 ){ // Om id är null=tomt  eller om det är satt till 0.
        if( eSelectValue !== 0 ){ 
          localStorage.setItem( eId, eSelectValue )
        }
      } 
      // if local storage exist add new number of tickets to previous sum
      else {
        // get previous amount of tickets from local storage
        let eTickets = localStorage.getItem(eId)
        // convert string to number
        eTickets = parseInt(eTickets)
        // calculte NEW sum of tickets 
        let eNewTicketSum = eSelectValue + eTickets
        // set new sum of tickets in local storage
        localStorage.setItem( eId, eNewTicketSum )
      }

      // show feedback to user via a span we get from the html-document, set added ticket value
      if(eSelectValue === 1){
        document.getElementById(eSpan).innerHTML = " Added 1 ticket to cart" 
      } else if(eSelectValue === 0){ 
        document.getElementById(eSpan).innerHTML = " No tickets were added to cart"
      } else {
        document.getElementById(eSpan).innerHTML = " Added " + eSelectValue + " tickets to cart"
      }
      // remove feedback by setting innerHTML to "", after 1.2 seconds
      setTimeout(function (){ 
        document.getElementById(eSpan).innerHTML = ""
      }, 1200) //1200 mms
      
      // reset select value
      this.parentElement.children[3].value  = 0 
      
      // 4. update cart-sum in header
      updateCart()
    })
  })
}

// 4. checks if local storage is present, and update cart-total
function updateCart(){
  // 4.1 initialize sum in cart
  let sum = 0 // skapa variabel som man kan skapa summa i. 
  // if there is already items in cart, loop over local storage and set new sum
  if( localStorage.length > 0) {
    for( let i = 0; i < localStorage.length; i++ ){ 
      let keyId = localStorage.key(i) 
      
      sum += parseInt( localStorage.getItem( keyId ) )
    }
  }
  // get element from html and show cart-sum
  document.getElementById("updateCart").innerHTML = " (" + sum + ")"
}

// 1.2 checks if there is garbage in local storage and removes it
function checkForGarbageInLocalStorage(){
  if( localStorage.length > 0 ) {
    console.log("local storage exist")
    for( let i = 0; i < localStorage.length; i++ ){ 
      if( localStorage.key(i)[0] + localStorage.key(i)[1]  != "id" ){
        console.log("removed: '" + localStorage.key(i) + "', '" + localStorage.getItem(localStorage.key(i)) + "'")
        localStorage.removeItem(localStorage.key(i))
      }
    }
  }
}