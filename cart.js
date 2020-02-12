// 1. connect to HTML-document
let dispCart = document.getElementById("dispCart")

// 2. get data from json and send it thowards getProdsToCart
getProducts()

// 3. update cart in header with current cart ticket-sum
updateCart() // header

// 2. get data from .json file
function getProducts() {
  fetch('products.json') // get file
    .then(products => products.json()) // convert
    .then(products => getProdsToCart(products)) // use with our getProdsToCart-function
}

// 3. display cart with product info and delete buttons, ticket-value change for user
function getProdsToCart(products) {
  // 3.1 clears dispCart innerHTML to enable putting in new info
  dispCart.innerHTML = "" // skriver över 

  // 3.2 either writes empty cart to user or  creates a table heading
  // "Your cart is empty"/ "Clear cart" "Destination" "Tickets" "Price per ticket" "Sum"
  ifEmptyCart()

  // 3.update cart in header with current cart ticket-sum
  updateCart()

  // 3.3 initalize totalSum
  let totalSum = 0

  // 3.4 loop over local storage to display added products
  for (let i = 0; i < localStorage.length; i++) {
    // 3.4.1 removes garbage from local storage
    if (localStorage.key(i)[0] != "i") { // om nyckel inte hör hemma tar man bort värdet och nycklar, man resar nyckelvärde paret.
      localStorage.removeItem(localStorage.key(i)) // första bokstaven i värdet som hämtas med hjälp av keys. 
    }
    // 3.4.2 initalizes values needed to display products
    let id = localStorage.key(i)
    let name = products[id].name
    let tickets = parseInt(localStorage.getItem(localStorage.key(i)))
    let price = products[id].price
    let sum = tickets * price
    totalSum += sum

    // 3.4.3 display items in table
    dispCart.innerHTML +=
      "<tr id='" + id + "' class='table-row'>" + // id0, samma som våra produkt id. Lättare att hålla koll. Det underlätta 
      "<td><button id ='" + id + "deleteBtn' class='btn btn-warning btn-sm'><i class='fa fa-trash'></i></button></td>" + // id0 id0minus id0plus, osv. Lättare att koppla ihop för att visa man pratar om samma rad. 
      "<td>" + name + "</td>" +
      "<td><button id='" + id + "MinusBtn' class='minus btn btn-info btn-sm'><i class='fa fa-minus'></i></button>" +
      "<input type='text' id='" + id + "Input' class='inputAmount' value='" + tickets + "'></input>" +
      "<button id='" + id + "PlusBtn'  class='plus btn btn-info btn-sm'><i class='fa fa-plus'></i></button></td>" +
      "<td>" + price + "</td>" +
      "<td>" + sum + "</td>" +
      "</tr>"
  }
  // 3.4.4 display table footer with total sum
  dispCart.innerHTML +=
    "<thead><tr class='table-row thead'>" +
    "<th></th>" +
    "<th></th>" +
    "<th></th>" +
    "<th>Total sum: </th>" +
    "<th>" + totalSum + "</th></tr></thead>"
  // 3.4.5 display order button
  if (localStorage.length > 0) { // om LS existerar visas order btn
    dispCart.innerHTML +=
      "<thead class='thead thead-dark'><tr><th>" +
      "</th><th>" +
      "</th><th></th><th></th>" +
      "<th><a href='confirmation.html'><button id='orderBtn' class='btn btn-success'>Place order</button></a></th></tr></thead>"
  }
  // 3.2 should change local storage if there's a change of numer of items via input
  inputChange()

  // 3.5 add listers to buttons
  getBtns()
}

// 3.2 either writes empty cart or table heading
// "Your cart is empty"/ "Clear cart" "Destination" "Tickets" "Price per ticket" "Sum"
function ifEmptyCart() {
  if ( localStorage.length > 0 ) { // finns i ngt i LS
    document.getElementById("emptyCart").innerHTML = ""
    dispCart.innerHTML +=
      "<thead class='thead thead-dark'><tr>" +
      "<th><button id='clearCartBtn' class='btn btn-warning btn-sm deletAllBtn'>Clear cart</button></th>" +
      "<th>Destination</th>" +
      "<th>Tickets</th>" +
      "<th>Price per ticket</th>" +
      "<th>Sum</th>"
    "</tr></thead>"
  } else { // finns inget LS, skriv då empty
    document.getElementById("emptyCart").innerHTML = "Your cart is empty!"
  }
}

// 3. update cart in header with current cart ticket-sum 
function updateCart() {
  let sum = 0
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      sum += parseInt(localStorage.getItem(localStorage.key(i)))
    }
  }
  document.getElementById("updateCart").innerHTML = " (" + sum + ")"
}

// 3.2 should change local storage if there's a change of numer of items via input
function inputChange() {
  let inputs = document.querySelectorAll("input") // input fälet
  inputs.forEach(input => { // array liknande 
    input.addEventListener('change', function (e) { // change, förändring i input.
      if( this.value >= 0 && this.value <=20 ){ // changes localstorage value to input value. this=inputfälet 0 eller högre. eller upp till 20.
        localStorage.setItem(this.parentElement.parentElement.id, this.value) // lägger till nya värdet i LS. this.parentElement.parentElement.id= id. this.value= nya värdet i input fältet. 
      } else { // annars alert till användare
        alert("Enter a number between 1-20")
      }
      // rewrite cart
      getProducts() // ritar om varukorgen, först med function getProducts(), den hämtar info jSon och sist som den kör med argument i function getProdsToCart(products)
    })
  })
}

// 3.5 put listers on buttons
function getBtns() {
  // 3.5.1 get all buttons
  let allCartBtns = document.querySelectorAll("button")
  // 3.5.2 for all buttons add eventlister that reacts to click
  allCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // get button id
      let eId = this.id // = knappens id
      // get parent id
      let eParentId = this.parentElement.parentElement.id // this=knappen. 
      
      // if current btn is "clear cart" clear local storage
      if (eId == "clearCartBtn") {
        if ( confirm("Are you sure you would like to delete all items in your cart?") == true ) { // confirm får man okey eller cancel. Okej== true. Då raderas allt.
          localStorage.clear()
        }
        // rewrite cart.
        getProducts() // När allt raderas måste rita om carten. 
      }
      
      // if order btn
      else if ( eId == "orderBtn" ) {
        console.log("order submitted") // knappen i sig är länk och behöver egentligen ingen event listner
      } 
      
      // if delete btn, remove item from local storage
      else if ( eId == (eParentId + "deleteBtn" )) { // eId=id0deleteBtn även (eParentId + "deleteBtn") =id0deleteBtn
        localStorage.removeItem(eParentId) // tar bort det item från LS
        // rewrite cart, ritas varukorgen igen.
        getProducts()
      } // if minus btn, remove one item from local storage (lower limit 0)
      else if ( eId == eParentId + "MinusBtn" ) { //eId=id0minusBtn jämförelse med eParentId=id0 + "MinusBtn"= MinusBtn id0minusBtn=id0minusBtn. om villkor stämmer körs if satsen.
        let previousInputValue = parseInt(this.nextElementSibling.value) // hämtar värdet från input fältet och det sparas som sträng och skapar om.
        if ( previousInputValue > 0) { // Plus och minus knapper ändrar värdet i input och det skickar vidare till LS.
          localStorage.setItem( eParentId, (previousInputValue-1) ) // eParentId=nyckel id0. (previousInputValue)= tidigare värdet - 1, få nya värdet som sätts.
          // rewrite cart
          getProducts()
        }
      } // if plus btn, add item to local storage (upper limit 20)
      else if ( eId == eParentId + "PlusBtn" ) {
        let previousInputValue = parseInt(this.previousSibling.value)
        if ( previousInputValue < 20) {
          localStorage.setItem(eParentId, (previousInputValue+1) )
          // rewrite cart
          getProducts()
        }
      } else {
        console.log("something went wrong...")
      }
    })
  })
}
