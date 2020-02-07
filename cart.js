
// TO DO: 
// - check that input is a (positive) number
// - aktiver på key-up istället för bara på enter slag
// - kolla om vi behöver skilja input of numer från input av text

// TO DO:
// ändra alertsen

// connect to HTML-document
let dispCart = document.getElementById("dispCart")

// get data from .json
function getProducts() {
  fetch('products.json')
    .then(products => products.json())
    .then(products => getProdsToCart(products))
}
getProducts()
updateCart()

// display cart
function getProdsToCart(products) {
  dispCart.innerHTML = ""
  ifEmptyCart() // either writes empty cart or table heading
  updateCart()
  let totalSum = 0

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)[0] != "i") { // remove data that isn't the correct key
      localStorage.removeItem(localStorage.key(i))
    }
    let id = localStorage.key(i)
    let name = products[id].name
    let tickets = parseInt(localStorage.getItem(localStorage.key(i)))
    let price = products[id].price
    let sum = tickets * price
    totalSum += sum

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
  // display table footer with total sum
  dispCart.innerHTML +=
    "<thead><tr class='table-row thead'>" +
    "<th></th>" +
    "<th></th>" +
    "<th></th>" +
    "<th>Total sum: </th>" +
    "<th>" + totalSum + "</th></tr></thead>"
  // display order button and contact info if items in cart
  if (localStorage.length > 0) {
    dispCart.innerHTML +=
      "<thead class='thead thead-dark'><tr><th>" +
      // "<input type='text' placeholder='Name...'>" +
      "</th><th>" +
      // "<input type='email' placeholder='Email...'>" +
      "</th><th></th><th></th>" +
      "<th><a href='confirmation.html'><button id='orderBtn' class='btn btn-success'>Place order</button></a></th></tr></thead>"
  }
  inputChange()
  getBtns()
}

function ifEmptyCart() {
  if (localStorage.length > 0) {
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

// should change local storage if there's a change of numer of items
function inputChange() {
  let inputs = document.querySelectorAll("input")
  inputs.forEach(input => {
    input.addEventListener('change', function (e) {
      // changes localstorage value to input value
      localStorage.setItem(this.parentElement.parentElement.id, this.value)
      getProducts()
    })
  })
}

function getBtns() {
  let allCartBtns = document.querySelectorAll("button")
  allCartBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      let eId = this.id
      let eParentId = this.parentElement.parentElement.id
      if (eId == "clearCartBtn") {
        if (confirm("Are you sure you would like to delete all items in your cart?") == true) {
          localStorage.clear()
        }
        getProducts()
      } // order 
      else if (eId == "orderBtn") {
        console.log("order submitted")
      } // delete item
      else if (eId == (eParentId + "deleteBtn")) {
        localStorage.removeItem(eParentId) // remove from local storage
        getProducts()
      } // remove one item
      else if (eId == eParentId + "MinusBtn") {
        if (parseInt(this.nextElementSibling.value) > 0) {
          localStorage.setItem(eParentId, (parseInt(this.nextElementSibling.value) - 1))
          getProducts()
        }
      } // add item
      else if (eId == eParentId + "PlusBtn") {
        if (parseInt(this.previousSibling.value) < 20) {
          localStorage.setItem(eParentId, (parseInt(this.previousSibling.value) + 1))
          getProducts()
        }
      } else {
        console.log("something went wrong...")
      }
    })
  })
}

function updateCart() {
  let sum = 0
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      sum += parseInt(localStorage.getItem(localStorage.key(i)))
    }
  }
  document.getElementById("updateCart").innerHTML = " (" + sum + ")"
}