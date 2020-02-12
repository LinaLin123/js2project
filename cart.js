// 1. connect to HTML-document
let dispCart = document.getElementById("dispCart")

// 2. get data from json and send it thowards getProdsToCart
getProducts()

// 3. update cart in header with current cart ticket-sum
updateCart() 

// 2. get data from .json file
function getProducts() {
  fetch('products.json')
    .then(products => products.json()) // convert
    .then(products => getProdsToCart(products)) 
}

// 3. display cart with product info and delete buttons, ticket-value change for user
function getProdsToCart(products) {
  // 3.1 clears dispCart innerHTML to enable putting in new info
  dispCart.innerHTML = ""

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
    if (localStorage.key(i)[0] != "i") {
      localStorage.removeItem(localStorage.key(i)) 
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
      "<tr id='" + id + "' class='table-row'>" +
      "<td><button id ='" + id + "deleteBtn' class='btn btn-warning btn-sm'><i class='fa fa-trash'></i></button></td>" + 
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
  if (localStorage.length > 0) { 
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
  if ( localStorage.length > 0 ) { 
    document.getElementById("emptyCart").innerHTML = ""
    dispCart.innerHTML +=
      "<thead class='thead thead-dark'><tr>" +
      "<th><button id='clearCartBtn' class='btn btn-warning btn-sm deletAllBtn'>Clear cart</button></th>" +
      "<th>Destination</th>" +
      "<th>Tickets</th>" +
      "<th>Price per ticket</th>" +
      "<th>Sum</th>"
    "</tr></thead>"
  } else { 
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
  let inputs = document.querySelectorAll("input")
  inputs.forEach(input => { // array liknande 
    input.addEventListener('change', function (e) { 
      if( this.value >= 0 && this.value <=20 ){ 
        localStorage.setItem(this.parentElement.parentElement.id, this.value) 
      } else { 
        alert("Enter a number between 1-20")
      }
      // rewrite cart
      getProducts() 
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
      let eId = this.id 
      // get parent id
      let eParentId = this.parentElement.parentElement.id
      
      // if current btn is "clear cart" clear local storage
      if (eId == "clearCartBtn") {
        if ( confirm("Are you sure you would like to delete all items in your cart?") == true ) { 
          localStorage.clear()
        }
        // rewrite cart
        getProducts() 
      }
      
      // if order btn
      else if ( eId == "orderBtn" ) {
        console.log("order submitted")
      } 
      
      // if delete btn, remove item from local storage
      else if ( eId == (eParentId + "deleteBtn" )) { 
        localStorage.removeItem(eParentId)
        // rewrite cart
        getProducts()
      } // if minus btn, remove one item from local storage (lower limit 0)
      else if ( eId == eParentId + "MinusBtn" ) {
        let previousInputValue = parseInt(this.nextElementSibling.value) 
        if ( previousInputValue > 0) { 
          localStorage.setItem( eParentId, (previousInputValue-1) ) 
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
